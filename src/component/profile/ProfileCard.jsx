import { useFavorites } from '../../context/FavoritesContext';
import { useComparison } from '../../context/ComparisonContext';
import { ProfileHeader } from './ProfileHeader';
import { ExternalLink, GitCompare, Star } from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { useState, useEffect } from 'react';

export const ProfileCard = ({user}) => {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const { isInComparison, addToComparison, removeFromComparison } = useComparison();
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        setIsFav(favorites.includes(user.login));
    }, [favorites, user.login]);

    const handleFavoriteToggle = () => {
        if (isFav) {
            removeFavorite(user.login);
        } else {
            addFavorite(user.login);
        }
    };

    const handleComparisonToggle = () => {
        if (isInComparison(user.login)) {
            removeFromComparison(user.login);
        } else {
            addToComparison(user.login);
        }
    };

    return (
        <Card className='dark:bg-zinc-800 backdrop-blur-2xl '>
            {/* Header uses fake user data */}
            <ProfileHeader user={user} />

            {/* Action buttons */}
            <div className="flex-wrap flex gap-3 mt-6">
                <Button
                    variant={isFav && "outline"}
                    onClick={handleFavoriteToggle}
                    className="flex items-center gap-1 hover:bg-gray-300 hover:dark:bg-gray-700"
                >
                    <Star className={isFav ? "fill-current" : ""} />
                    {isFav ? "Favorited" : "Add to Favorites"}
                </Button>

                <Button
                    variant={isInComparison(user.login) && "outline"}
                    onClick={handleComparisonToggle}
                    className="flex items-center gap-2 hover:bg-gray-300 hover:dark:bg-gray-700"
                >
                    <GitCompare />
                    {isInComparison(user.login) ? "In Comparison" : "Add to Compare"}
                </Button>

                <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button variant="ghost" className="flex items-center gap-2">
                        <ExternalLink />
                        View on GitHub
                    </Button>
                </a>
            </div>
        </Card>
    );
};
