import { useParams } from 'react-router-dom';
import { FollowersList } from '../component/profile';
import { LoadingSpinner, BackButton } from '../component/common';
import { useGithubUser } from '../hooks/useGithubUser';

export const FollowersPage = () => {
  const { username } = useParams();
  const { data: user, isLoading } = useGithubUser(username);

  if (isLoading) {
    return <LoadingSpinner text="Loading profile..." />;
  }

  return (
    <div className="space-y-8">
      <BackButton to={`/profile/${username}`} label="← Back to Profile" />

      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Followers of @{username}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Total followers: {user.followers || 0}
        </p>
      </div>

      <FollowersList username={username} itemsPerPage={12} />
    </div>
  );
};
