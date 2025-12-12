import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUserFollowers } from '../../services/githubAPI';
import { Card, Pagination, LoadingSpinner } from '../common';
import { usePagination } from '../../hooks/usePagination';
import { Link } from 'react-router-dom';

export const FollowersList = ({ username, itemsPerPage = 12 }) => {
  const { data: followers, isLoading } = useQuery({
    queryKey: ['followers', username],
    queryFn: () => fetchUserFollowers(username),
    enabled: !!username,
    staleTime: 5 * 60 * 1000
  });

  const {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    totalItems
  } = usePagination(followers || [], itemsPerPage);

  if (isLoading) {
    return <LoadingSpinner text="Loading followers..." />;
  }

  if (!followers || followers.length === 0) {
    return (
      <Card>
        <p className="text-center text-gray-600 dark:text-gray-400">
          No followers
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Followers ({totalItems})
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentItems.map((follower) => (
          <Link
            key={follower.id}
            to={`/profile/${follower.login}`}
            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <img
              src={follower.avatar_url}
              alt={follower.login}
              className="w-16 h-16 rounded-full mb-2"
            />
            <p className="text-sm font-semibold text-gray-800 dark:text-white text-center truncate">
              @{follower.login}
            </p>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      )}
    </Card>
  );
};
