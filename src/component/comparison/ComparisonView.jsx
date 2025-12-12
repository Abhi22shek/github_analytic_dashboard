import { useGithubUser } from '../../hooks/useGithubUser'
import { useGithubRepos } from '../../hooks/useGithubRepos'
import { LoadingSpinner, Card } from '../common'
import { calculateTotalStars, calculateTotalForks, getLanguageStats } from '../../utils/dataProcessing'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { FiUsers, FiUserPlus, FiBook, FiStar, FiGitBranch } from 'react-icons/fi'

export const ComparisonView = ({ usernames }) => {
  const users = usernames.map(username => ({
    username,
    user: useGithubUser(username),
    repos: useGithubRepos(username)
  }))

  const isLoading = users.some(u => u.user.isLoading || u.repos.isLoading)

  if (isLoading) {
    return <LoadingSpinner text="Loading profiles..." />
  }

  const comparisonData = users.map(u => ({
    username: u.username,
    user: u.user.data,
    repos: u.repos.data,
    totalStars: u.repos.data ? calculateTotalStars(u.repos.data) : 0,
    totalForks: u.repos.data ? calculateTotalForks(u.repos.data) : 0
  }))

  // Prepare data for bar chart
  const chartData = comparisonData.map(data => ({
    name: data.username,
    followers: data.user?.followers || 0,
    repos: data.user?.public_repos || 0,
    stars: data.totalStars,
    forks: data.totalForks
  }))

  // Prepare radar chart data (normalized 0-100)
  const maxFollowers = Math.max(...chartData.map(d => d.followers), 1)
  const maxRepos = Math.max(...chartData.map(d => d.repos), 1)
  const maxStars = Math.max(...chartData.map(d => d.stars), 1)
  const maxForks = Math.max(...chartData.map(d => d.forks), 1)

  const radarData = comparisonData.map(data => ({
    metric: data.username,
    followers: Math.round((data.user?.followers || 0) / maxFollowers * 100),
    repos: Math.round((data.user?.public_repos || 0) / maxRepos * 100),
    stars: Math.round(data.totalStars / maxStars * 100),
    forks: Math.round(data.totalForks / maxForks * 100)
  }))

  const metrics = [
    { label: 'Followers', key: 'followers', icon: FiUsers, color: 'text-blue-500' },
    { label: 'Following', key: 'following', icon: FiUserPlus, color: 'text-green-500' },
    { label: 'Public Repos', key: 'public_repos', icon: FiBook, color: 'text-purple-500' },
    { label: 'Total Stars', key: 'totalStars', icon: FiStar, color: 'text-yellow-500' },
    { label: 'Total Forks', key: 'totalForks', icon: FiGitBranch, color: 'text-orange-500' }
  ]

  return (
    <div className="space-y-8">
      {/* Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comparisonData.map(data => (
          <Card key={data.username} className="hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={data.user?.avatar_url}
                alt={data.username}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white">
                  {data.user?.name || data.username}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  @{data.username}
                </p>
              </div>
            </div>
            {data.user?.bio && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {data.user.bio}
              </p>
            )}
          </Card>
        ))}
      </div>

      {/* Metrics Table */}
      <Card>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Detailed Metrics
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                <th className="text-left p-4 font-bold text-gray-800 dark:text-white">
                  Metric
                </th>
                {comparisonData.map(data => (
                  <th key={data.username} className="text-center p-4 font-bold text-gray-800 dark:text-white">
                    @{data.username}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map(metric => {
                const Icon = metric.icon
                return (
                  <tr key={metric.key} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="p-4 font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${metric.color}`} />
                      {metric.label}
                    </td>
                    {comparisonData.map(data => (
                      <td key={data.username} className="text-center p-4 text-gray-800 dark:text-gray-200 font-semibold">
                        {data[metric.key] || data.user?.[metric.key] || 0}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bar Chart */}
      <Card>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Statistics Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="followers" fill="#0969da" name="Followers" />
            <Bar dataKey="repos" fill="#1f883d" name="Repositories" />
            <Bar dataKey="stars" fill="#fb8500" name="Total Stars" />
            <Bar dataKey="forks" fill="#8250df" name="Total Forks" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Radar Chart */}
      {radarData.length > 0 && (
        <Card>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Profile Strength (Normalized)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Score" dataKey="followers" stroke="#0969da" fill="#0969da" fillOpacity={0.5} />
              <Radar name="Repos" dataKey="repos" stroke="#1f883d" fill="#1f883d" fillOpacity={0.3} />
              <Radar name="Stars" dataKey="stars" stroke="#fb8500" fill="#fb8500" fillOpacity={0.3} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Winner Section */}
      <Card className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          🏆 Comparison Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map(metric => {
            const values = comparisonData.map(data => data[metric.key] || data.user?.[metric.key] || 0)
            const maxValue = Math.max(...values)
            const winner = comparisonData[values.indexOf(maxValue)]

            return (
              <div key={metric.key} className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Most {metric.label}
                </p>
                <p className="font-bold text-gray-800 dark:text-white">
                  @{winner.username}
                </p>
                <p className="text-lg font-bold text-primary">
                  {maxValue}
                </p>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
