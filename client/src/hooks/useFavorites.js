import { useState, useEffect, useCallback } from "react";
import useAuth from "./useAuth";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { userContext } = useAuth();

  const getFavorites = useCallback(() => {
    if (userContext.details) {
      fetch(`${process.env.REACT_APP_AUTH_ENDPOINT}/users/favorites`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext.token}`,
        },
      }).then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
        } else {
          console.log("Something went wrong.");
        }
      });
    } else {
      const guestFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(guestFavorites);
    }
  }, [userContext.details]);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  return favorites;
};

export default useFavorites;
