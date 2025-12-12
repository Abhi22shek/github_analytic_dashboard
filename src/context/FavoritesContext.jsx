import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const addFavorite = (username) => {
    if (!favorites.includes(username)) {
      setFavorites([...favorites, username]);
    }
  };

  const removeFavorite = (username) => {
    setFavorites(favorites.filter(fav => fav !== username));
  };

  const isFavorite = (username) => {
    return favorites.includes(username);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
