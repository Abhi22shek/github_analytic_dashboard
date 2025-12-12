import { useState, useEffect } from "react";
import {
  FiGitCommit,
  FiGitPullRequest,
  FiStar,
  FiGitBranch,
} from "react-icons/fi";
import { Card, Pagination } from "../common";
import { usePagination } from "../../hooks/usePagination";
import { timeAgo } from "../../utils/dateHelpers";

export const ActivityTimeline = ({ events, itemsPerPage = 5 }) => {
  const {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    totalItems
  } = usePagination(events || [], itemsPerPage);

  const getEventIcon = (type) => {
    switch (type) {
      case "PushEvent":
        return <FiGitCommit className="w-5 h-5 text-green-500" />;
      case "PullRequestEvent":
        return <FiGitPullRequest className="w-5 h-5 text-purple-500" />;
      case "WatchEvent":
        return <FiStar className="w-5 h-5 text-yellow-500" />;
      case "ForkEvent":
        return <FiGitBranch className="w-5 h-5 text-blue-500" />;
      default:
        return <FiGitCommit className="w-5 h-5 text-gray-500" />;
    }
  };

  const getEventDescription = (event) => {
    switch (event.type) {
      case "PushEvent":
        return `Pushed ${event.payload.commits?.length || 0} commit(s) to ${
          event.repo.name
        }`;
      case "PullRequestEvent":
        return `${event.payload.action} a pull request in ${event.repo.name}`;
      case "WatchEvent":
        return `Starred ${event.repo.name}`;
      case "ForkEvent":
        return `Forked ${event.repo.name}`;
      case "CreateEvent":
        return `Created ${event.payload.ref_type} in ${event.repo.name}`;
      default:
        return `${event.type} in ${event.repo.name}`;
    }
  };

  if (!events || events.length === 0) {
    return (
      <Card>
        <p className="text-center text-gray-600 dark:text-gray-400">
          No recent activity
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Recent Activity ({totalItems})
      </h3>

      <div className="space-y-4">
        {currentItems.map((event) => (
          <div key={event.id} className="flex gap-3">
            <div className="shrink-0 mt-1">{getEventIcon(event.type)}</div>

            <div className="flex-1">
              <p className="text-gray-800 dark:text-gray-200">
                {getEventDescription(event)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {timeAgo(event.created_at)}
              </p>
            </div>
          </div>
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
