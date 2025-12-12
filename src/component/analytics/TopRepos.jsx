import React from "react";
import { Card } from "../common";
import { GitBranch, Star } from "lucide-react";

export const TopRepos = ({repos}) => {


  return (
    <Card>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Top Repositories
      </h3>
      <div className="space-y-3">
        {repos.map((repo, index) => (
          <div
            key={repo.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-400">
                *{index + 1}
              </span>
              <div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  {repo.name}
                </a>
                {repo.description && (
                  <p className="text-sm flex-1 text-gray-600 dark:text-gray-400 max-w-md">
                    {repo.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="text-yellow-500" />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitBranch className="text-blue-500" />
                <span>{repo.forks_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
