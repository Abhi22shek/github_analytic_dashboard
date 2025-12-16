import { pdf } from '@react-pdf/renderer'
import React from 'react'
import { ProfilePDFDocument } from '../component/profile/PDFReport'
import { calculateTotalStars, calculateTotalForks, getLanguageStats } from '../utils/dataProcessing'

export const exportServiceEnhanced = {
  // Export as beautifully designed PDF using React components
  exportAsPDFReact: async (user, repos, events, filename = 'profile-report.pdf') => {
    try {
      console.log('Starting PDF export...')
      const doc = React.createElement(ProfilePDFDocument, { user, repos, events })
      console.log('Document created:', doc)
      const asPdf = pdf(doc)
      console.log('PDF instance created:', asPdf)
      
      // Use toBlob instead of download for better compatibility
      const blob = await asPdf.toBlob()
      console.log('Blob created:', blob)
      
      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.style.display = 'none'
      
      // Append to body, click, and remove
      document.body.appendChild(link)
      link.click()
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }, 100)
      
      console.log('PDF downloaded successfully')
      return true
    } catch (error) {
      console.error('PDF export error:', error)
      throw error
    }
  },

  // Export complete profile data as JSON
  exportAsJSON: (user, repos, events, filename = 'profile-data.json') => {
    const totalStars = calculateTotalStars(repos || [])
    const totalForks = calculateTotalForks(repos || [])
    const languageStats = getLanguageStats(repos || [])

    const completeData = {
      profile: {
        username: user.login,
        name: user.name,
        bio: user.bio,
        location: user.location,
        email: user.email,
        blog: user.blog,
        twitter: user.twitter_username,
        company: user.company,
        avatarUrl: user.avatar_url,
        profileUrl: user.html_url,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      },
      statistics: {
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        totalStars,
        totalForks,
        averageStarsPerRepo: repos.length > 0 ? (totalStars / repos.length).toFixed(2) : 0,
        averageForksPerRepo: repos.length > 0 ? (totalForks / repos.length).toFixed(2) : 0
      },
      languages: languageStats,
      repositories: repos.map(repo => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        updatedAt: repo.updated_at,
        isFork: repo.fork,
        isArchived: repo.archived
      })),
      recentActivity: events.slice(0, 20).map(event => ({
        type: event.type,
        repository: event.repo.name,
        createdAt: event.created_at,
        details: event.payload
      })),
      exportedAt: new Date().toISOString()
    }

    const dataStr = JSON.stringify(completeData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  },

  // Export as CSV (repositories)
  exportAsCSV: (repos, filename = 'repositories.csv') => {
    if (!repos || repos.length === 0) return

    const headers = ['Name', 'Description', 'Stars', 'Forks', 'Language', 'Updated', 'URL']
    const csvContent = [
      headers.join(','),
      ...repos.map(repo =>
        [
          `"${repo.name}"`,
          `"${repo.description || ''}"`,
          repo.stargazers_count,
          repo.forks_count,
          repo.language || 'N/A',
          new Date(repo.updated_at).toLocaleDateString(),
          `"${repo.html_url}"`
        ].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }
}
