import React from "react";
import { MovieCard } from "../components/MovieCards";
import { Box, IconButton } from "@mui/material";
import useMyFavorites from "../hooks/useMyFavorites";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const MyFavoriteMovies = () => {
  const favorites = useMyFavorites();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <IconButton
        color="primary"
        aria-label="go back"
        onClick={goBack}
        sx={{ m: 2 }}
      >
        <ArrowBack />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
        }}
      >
        {favorites.length ? (
          favorites?.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))
        ) : (
          <Box sx={{ m: 4 }}>You don't have any favorites yet.</Box>
        )}
      </Box>
    </>
  );
};

export default MyFavoriteMovies;
