import { useState, useEffect, useCallback } from "react";
import useAuth from "./useAuth";
import useFavoritesContext from "./useFavoritesContext";

const useMyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { userContext } = useAuth();
  const { favoritesContext, setFavoritesContext } = useFavoritesContext();

  const getFavorites = useCallback(() => {
    if (userContext.details) {
      setFavorites(userContext.details.favorites);
      setFavoritesContext(userContext.details.favorites);
    } else {
      const guestFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(guestFavorites);
      setFavoritesContext(guestFavorites);
    }
  }, [userContext.details]);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  useEffect(() => {
    setFavorites(favoritesContext);
  }, [favoritesContext]);

  return favorites;
};

export default useMyFavorites;
