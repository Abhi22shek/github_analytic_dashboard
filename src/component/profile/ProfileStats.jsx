import { useNavigate } from 'react-router-dom'
import { FiBook, FiUserPlus, FiUsers, FiStar, FiGitBranch } from 'react-icons/fi'
import { Card } from '../common/Card'

export const ProfileStats = ({ user, totalStars, totalForks }) => {
  const navigate = useNavigate()

  const stats = [
    {
      icon: FiBook,
      label: 'Repositories',
      value: user.public_repos,
      color: 'text-blue-500',
      clickable: false
    },
    {
      icon: FiUsers,
      label: 'Followers',
      value: user.followers,
      color: 'text-green-500',
      clickable: true,
      onClick: () => navigate(`/profile/${user.login}/followers`)
    },
    {
      icon: FiUserPlus,
      label: 'Following',
      value: user.following,
      color: 'text-purple-500',
      clickable: false
    },
    {
      icon: FiStar,
      label: 'Total Stars',
      value: totalStars,
      color: 'text-yellow-500',
      clickable: false
    },
    {
      icon: FiGitBranch,
      label: 'Total Forks',
      value: totalForks,
      color: 'text-orange-500',
      clickable: false
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`text-center ${
            stat.clickable ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''
          }`}
          onClick={stat.onClick}
        >
          <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {stat.value.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {stat.label}
          </p>
          {stat.clickable && (
            <p  className="text-xs text-primary mt-2 font-semibold">
              View →
            </p>
          )}
        </Card>
      ))}
    </div>
  )
}
