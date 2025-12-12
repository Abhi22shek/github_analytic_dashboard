import { Link } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import { Card, Button } from '../common'
import { useComparison } from '../../context/ComparisonContext'

export const ComparisonCard = ({ username, user, repos, totalStars, totalForks }) => {
  const { removeFromComparison } = useComparison()

  if (!user) return null

  return (
    <Card className="relative hover:shadow-lg transition-shadow">
      <button
        onClick={() => removeFromComparison(username)}
        className="absolute top-2 right-2 p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-full transition-colors"
      >
        <FiX className="w-5 h-5 text-red-500" />
      </button>

      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <img
          src={user.avatar_url}
          alt={username}
          className="w-20 h-20 rounded-full mb-3 border-4 border-primary"
        />

        {/* Name */}
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
          {user.name || username}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          @{username}
        </p>

        {/* Bio */}
        {user.bio && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {user.bio}
          </p>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 w-full mb-4">
          <div className="bg-blue-50 dark:bg-blue-900 p-2 rounded">
            <p className="text-xs text-gray-600 dark:text-gray-300">Followers</p>
            <p className="font-bold text-blue-600 dark:text-blue-300">
              {user.followers}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900 p-2 rounded">
            <p className="text-xs text-gray-600 dark:text-gray-300">Repos</p>
            <p className="font-bold text-green-600 dark:text-green-300">
              {user.public_repos}
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900 p-2 rounded">
            <p className="text-xs text-gray-600 dark:text-gray-300">Stars</p>
            <p className="font-bold text-yellow-600 dark:text-yellow-300">
              {totalStars}
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900 p-2 rounded">
            <p className="text-xs text-gray-600 dark:text-gray-300">Forks</p>
            <p className="font-bold text-purple-600 dark:text-purple-300">
              {totalForks}
            </p>
          </div>
        </div>

        {/* View Profile Button */}
        <Link to={`/profile/${username}`} className="w-full">
          <Button variant="primary" size="sm" className="w-full">
            View Profile
          </Button>
        </Link>
      </div>
    </Card>
  )
}
