import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import {
  loadMovieDetails,
  isLoadingMovieDetails,
  failedToLoadMovieDetails,
  selectMovieDetails,
} from "../features/MovieDetailsSlice";
import { Box, CircularProgress } from "@mui/material";
import MoviePageCard from "../components/MoviePageCard";
import MovieComments from "../components/MovieComments";
import MovieAddComments from "../components/MovieAddComments";
import GoBack from "../components/GoBack";

const MoviePage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const movie = useSelector(selectMovieDetails);
  const isLoading = useSelector(isLoadingMovieDetails);
  const failedToLoad = useSelector(failedToLoadMovieDetails);

  const loadedMovie = (
    <Box
      sx={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
      }}
    >
      <GoBack />
      <MoviePageCard movie={movie} />
      <Box
        sx={{
          display: "flex",
          flexFlow: "column wrap",
          m: 2
        }}
      >
        <MovieAddComments movie={movie} />
        <MovieComments movie={movie} />
      </Box>
    </Box>
  );

  const failedMovie = <Navigate replace to="/404" />;

  useEffect(() => {
    dispatch(loadMovieDetails(params.id));
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <CircularProgress sx={{ m: 10 }} />
      ) : !failedToLoad ? (
        loadedMovie
      ) : (
        failedMovie
      )}
    </React.Fragment>
  );
};

export default MoviePage;
