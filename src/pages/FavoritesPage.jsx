import { useFavorites } from "../context/FavoritesContext";
import { FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button, Card, BackButton } from "../component/common";

export const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="space-y-8">
        <BackButton to="/" label="← Back to Search" />
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <FiStar className="w-20 h-20 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-400 mb-2 dark:text-white">
            No favorites yet
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start adding profiles to your favorites!
          </p>
          <Link to="/">
            <Button>Search Profiles</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <BackButton to="/" label="← Back to Search" />
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Favorites Profiles ({favorites.length})</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((username) => (
          <Card key={username} className="flex items-center justify-between">
            <Link to={`/profile/${username}`} className="font-semibold text-primary hover:underline">
              @{username}
            </Link>

            <Button variant="ghost" size="sm" onClick={() => removeFavorite(username)}>
              Remove
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
