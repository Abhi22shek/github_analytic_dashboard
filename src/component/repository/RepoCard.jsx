import { Card, Badge } from "../common";
import { Code, ExternalLink, GitBranch, Star } from "lucide-react";
import { timeAgo } from "../../utils/dateHelpers";

export const RepoCard = ({ repo }) => {
  return (
    <Card hover className="h-full">
      <div className="flex flex-col h-full">
        {/* repo name */}
        <div className="flex items-start justify-between mb-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-primary hover:underline flex items-center gap-2"
          >
            {repo.name}
            <ExternalLink className="size-4" />
          </a>
          {repo.fork && <Badge variant="default">Fork</Badge>}
        </div>

        {/* repo description */}
        {repo.description && (
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">
            {repo.description}
          </div>
        )}

        {/* stats */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          {repo.language && (
            <div className="flex items-center gap-1">
              <Code className="size-4" />
              <span>{repo.language}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{repo.stargazers_count}</span>
          </div>

          <div className="flex items-center gap-1">
            <GitBranch className="w-4 h-4" />
            <span>{repo.forks_count}</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          Updated {timeAgo(repo.updated_at)}
        </p>
      </div>
    </Card>
  );
};
