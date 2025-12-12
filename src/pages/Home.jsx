import { Github, Search, TrendingUp } from "lucide-react";
import React from "react";
import { SearchBar } from "../component/common";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    const handleSearch = (username) => {
        navigate(`/profile/${username}`);
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center mb-12">
        <Github className="size-20 mx-auto mb-6 text-primary" />
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white  mb-4">
          Github Profile Analytics
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover detailed insights about any GitHub profile. View stats,
          repositories, activity, and compare multiple profiles.
        </p>
      </div>

      <div className="w-full max-w-2xl mb-12">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-9 max-w-4xl">
        <div className="text-center p-6">
          <Search className="size-12 mx-auto mb-4 text-blue-400" />
          <h3 className="text-lg font-semibold text-gry-800 darK:text-white mb-2">
            Search Profils
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {" "}
            Find any GitHub user and explore their profile
          </p>
        </div>

        <div className="text-center p-6">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            View Analytics
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            See detailed stats, charts, and insights
          </p>
        </div>

        <div className="text-center p-6">
          <Github className="w-12 h-12 mx-auto mb-4 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Compare Users
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Compare multiple profiles side by side
          </p>
        </div>
      </div>
    </div>
  );
};
