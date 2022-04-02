import React from "react";
import { useSelector } from "react-redux";
import {
  isLoadingSearch,
  failedToLoadSearch,
  displayMovieSuggestions,
} from "../../features/MoviesSlice";
import { Box, CircularProgress } from "@mui/material";
import { MovieCard } from "../MovieCards";

const MoviesSearch = () => {
  const loadingSearch = useSelector(isLoadingSearch);
  const failedToSearch = useSelector(failedToLoadSearch);
  const movieSuggestions = useSelector(displayMovieSuggestions);
  return (
    <>
      {loadingSearch ? (
        <CircularProgress sx={{ m: 10 }} />
      ) : failedToSearch ? (
        <div style={{ margin: 5 }}>Something went wrong.</div>
      ) : movieSuggestions.length > 0 ? (
        movieSuggestions.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))
      ) : (
        <Box sx={{ m: 2 }}>No movies match the criteria.</Box>
      )}
    </>
  );
};

export default MoviesSearch;
