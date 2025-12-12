import { formatDate } from '../../utils/dateHelpers'
import { Calendar, Link, Mail, MapPin } from "lucide-react";

export const ProfileHeader = ({ user }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      {/* avatar */}
      <img
        src={user.avatar_url}
        alt={user.name || user.login}
        className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
      />

      {/* user info */}
      <div className="flex-1 ">
        <h1 className="text-3xl font-bold mb-2 ">{user.name || user.login}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
          {user.login}
        </p>

        {user.bio && (
          <p className="text-gray-700 dark:text-gray-300 mb-4">{user.bio}</p>
        )}

        {/* meta info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          {user.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>{user.location}</span>
            </div>
          )}

          {user.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              <span>{user.email}</span>
            </div>
          )}

          {user.blog && (
            <a
              href={
                user.blog.startsWith("http")
                  ? user.blog
                  : `https://${user.blog}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Link className="w-4 h-4" />
              <span>{user.blog}</span>
            </a>
          )}

          {user.twitter_username && (
            <a
              href={`https://twitter.com/${user.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <span>@{user.twitter_username}</span>
            </a>
          )}

          <div className="flex items-center gap-1">
            <Calendar className="size-4" />
            <span>Joined {formatDate(user.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
