import React, { useState, useEffect, useCallback } from "react";
import useAuth from "../hooks/useAuth";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton, Box } from "@mui/material";
import useFavoritesContext from "../hooks/useFavoritesContext";

const MovieFavorite = ({ movie }) => {
  const { userContext, setUserContext } = useAuth();
  const { setFavoritesContext } = useFavoritesContext();

  const getFavoriteState = useCallback(() => {
    let favoriteState;
    if (userContext.details)
      favoriteState = userContext.details.favorites.findIndex((m) => {
        return m.id == movie.id;
      });
    else {
      const guestFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      favoriteState = guestFavorites.findIndex((m) => m.id == movie.id);
    }
    return favoriteState !== -1;
  }, [movie]);

  const favorites = (method) => {
    if (userContext.details) {
      setUserContext((oldValues) => {
        return {
          ...oldValues,
          details: {
            ...oldValues.details,
            favorites:
              method === "POST"
                ? [...oldValues.details.favorites, movie]
                : oldValues.details.favorites.filter(
                    (favMov) => favMov.id != movie.id
                  ),
          },
        };
      });

      fetch(
        `${process.env.REACT_APP_AUTH_ENDPOINT}/users/favorite/${movie.id}`,
        {
          method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userContext.token}`,
          },
          body: JSON.stringify({
            movie,
          }),
        }
      ).then(async (response) => {
        const data = await response.json();
      });
    } else {
      const guestFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      const movieIndex = guestFavorites.findIndex(
        (favorite) => favorite.id === movie.id
      );
      if (movieIndex === -1) {
        guestFavorites.push(movie);
      } else {
        guestFavorites.splice(movieIndex, 1);
      }
      localStorage.setItem("favorites", JSON.stringify(guestFavorites));
      setFavoritesContext((prev) => guestFavorites);
    }
  };

  const [favorite, setFavorite] = useState(false);

  const handleClick = (e) => {
    setFavorite((prev) => {
      !prev ? favorites("POST") : favorites("DELETE");
      return !prev;
    });
  };

  useEffect(() => {
    setFavorite((prev) => getFavoriteState());
  }, [getFavoriteState]);

  return (
    <Box sx={{ m: 2 }} style={{ position: "absolute", bottom: 0, right: 0 }}>
      <IconButton
        aria-label="favorite"
        onClick={handleClick}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          color: "white",
          opacity: 0.6,
        }}
      >
        {!favorite ? <FavoriteBorder /> : <Favorite />}
      </IconButton>
    </Box>
  );
};

export default MovieFavorite;
