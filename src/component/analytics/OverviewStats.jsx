import React from "react";

export const OverviewStats = ({ repos, user }) => {
  const stats = [
    {
      label: "Average Stars per Repo",
      value:
        repos.length > 0
          ? (
              repos.reduce((sum, r) => sum + r.stargazers_count, 0) /
              repos.length
            ).toFixed(1)
          : 0,
    },
    {
      label: "Average Forks per Repo",
      value:
        repos.length > 0
          ? (
              repos.reduce((sum, r) => sum + r.forks_count, 0) / repos.length
            ).toFixed(1)
          : 0,
    },
    {
      label: "Source Repos",
      value: repos.filter((r) => !r.fork).length,
    },
    {
      label: "Forked Repos",
      value: repos.filter((r) => r.fork).length,
    },
  ];

  return 
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {stats.map((stat,index) => (
        <Card key={index}  className="text-center">
            <p className="text-2xl font-bold text-preimay">{stat.value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
        </Card>
    ))}
  </div>;
};
