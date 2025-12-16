import { useParams } from "react-router-dom";
import { useGithubUser } from "../hooks/useGithubUser";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { useGitHubEvents } from "../hooks/useGitHubEvents";
import { Button, ErrorMessage, LoadingSpinner, BackButton } from "../component/common";
import { ProfileCard, ProfileStats } from "../component/profile/index";
import { LanguageChart } from "../component/charts";
import { TopRepos } from "../component/analytics";
import { RepoList } from "../component/repository";
import {
  calculateTotalStars,
  calculateTotalForks,
  getTopRepos,
  getLanguageStats,
} from "../utils/dataProcessing";
import { ActivityTimeline } from "../component/activity";
import { exportServiceEnhanced } from '../services/exportServiceEnhanced.jsx';
import toast from 'react-hot-toast';
import { FiDownload } from "react-icons/fi";

export const ProfilePage = () => {
  const { username } = useParams();

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGithubUser(username);
  const { data: repos, isLoading: reposLoading } = useGithubRepos(username);
  const { data: events, isLoading: eventsLoading } = useGitHubEvents(username);

  if (userLoading) {
    return <LoadingSpinner text="Loading profiles..." />;
  }

  if (userError) {
    return <ErrorMessage message={userError.message} />;
  }

  const totalStars = repos ? calculateTotalStars(repos) : 0;
  const totalForks = repos ? calculateTotalForks(repos) : 0;
  const languageStats = repos ? getLanguageStats(repos) : [];
  const topRepos = repos ? getTopRepos(repos) : [];

  const handleExportPDF = async () => {
    try {
      await exportServiceEnhanced.exportAsPDFReact(user, repos || [], events || [], `${user.login}-profile.pdf`);
      toast.success("Profile exported as PDF!");
    } catch (error) {
      toast.error("Failed to export PDF");
    }
  };

  const handleExportJSON = () => {
    try {
      exportServiceEnhanced.exportAsJSON(user, repos || [], events || [], `${user.login}-profile.json`);
      toast.success("Profile exported as JSON!");
    } catch (error) {
      toast.error("Failed to export JSON");
    }
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <BackButton to="/" label="← Back to Search" />

      {/* Export Buttons */}
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleExportPDF}
          className="flex items-center gap-2"
        >
          <FiDownload className="w-4 h-4" />
          Export PDF
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleExportJSON}
          className="flex items-center gap-2"
        >
          <FiDownload className="w-4 h-4" />
          Export JSON
        </Button>
      </div>

      <ProfileCard user={user} />

      {!reposLoading && repos && (
        <ProfileStats
          user={user}
          totalStars={totalStars}
          totalForks={totalForks}
        />
      )}
      {/* Charts and Top Repos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {!reposLoading && languageStats.length > 0 && (
          <LanguageChart data={languageStats} />
        )}

        {!reposLoading && topRepos.length > 0 && <TopRepos repos={topRepos} />}
      </div>

      {!eventsLoading && events && <ActivityTimeline events={events} />}

      {reposLoading ? (
        <LoadingSpinner text="Loading Repositories..." />
      ) : repos && repos.length > 0 ? (
        <RepoList repos={repos} />
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No Public Repositories
        </p>
      )}
    </div>
  );
};
