import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { useComparison } from '../context/ComparisonContext'
import { useGithubUser } from '../hooks/useGithubUser'
import { useGithubRepos } from '../hooks/useGithubRepos'
import { Button, Card, LoadingSpinner, BackButton } from '../component/common'
import { ComparisonView, ComparisonCard } from '../component/comparison'
import { calculateTotalStars, calculateTotalForks } from '../utils/dataProcessing'
import { GitCompare } from 'lucide-react'


export const ComparePage = () => {
  const { comparisonList, clearComparison } = useComparison()

  if (comparisonList.length === 0) {
    return (
      <div className="space-y-8">
        <BackButton to="/" label="← Back to Search" />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <GitCompare className="w-20 h-20 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            No Profiles to Compare
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Add up to 3 profiles to comparison from their profile pages
          </p>
          <Link to="/">
            <Button className="flex items-center gap-2">
              <FiPlus className="w-4 h-4" />
              Search Profiles
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <BackButton to="/" label="← Back to Search" />

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Compare Profiles
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comparing {comparisonList.length} profile{comparisonList.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/">
            <Button variant="secondary" className="flex items-center gap-2">
              <FiPlus className="w-4 h-4" />
              Add More
            </Button>
          </Link>
          <Button variant="danger" onClick={clearComparison}>
            Clear All
          </Button>
        </div>
      </div>

      {/* Comparison Cards Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comparisonList.map(username => (
          <ComparisonCardWrapper key={username} username={username} />
        ))}
      </div>

      {/* Full Comparison View */}
      <ComparisonView usernames={comparisonList} />
    </div>
  )
}

// Helper component to fetch data for comparison card
const ComparisonCardWrapper = ({ username }) => {
  const { data: user, isLoading: userLoading } = useGithubUser(username)
  const { data: repos, isLoading: reposLoading } = useGithubRepos(username)

  if (userLoading || reposLoading) {
    return <LoadingSpinner size="sm" />
  }

  const totalStars = repos ? calculateTotalStars(repos) : 0
  const totalForks = repos ? calculateTotalForks(repos) : 0

  return (
    <ComparisonCard
      username={username}
      user={user}
      repos={repos}
      totalStars={totalStars}
      totalForks={totalForks}
    />
  )
}
