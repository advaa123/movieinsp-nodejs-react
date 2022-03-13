import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import MoviePageCard from "../components/MoviePageCard";
import MovieComments from "../components/MovieComments";
import MovieAddComments from "../components/MovieAddComments";
import GoBack from "../components/GoBack";
import { useMovie } from "../hooks/useMovie";

const MoviePage = () => {
  const params = useParams();
  const {
    data: movie,
    isLoading,
    isFetching,
    isError: failedToLoad,
  } = useMovie(params.id);

  const loadedMovie = (
    <Box
      sx={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
      }}
    >
      <GoBack />
      <MoviePageCard movie={movie?.data?.data} />
      <Box
        sx={{
          display: "flex",
          flexFlow: "column wrap",
          m: 2,
        }}
      >
        <MovieAddComments movie={movie?.data?.data} />
        <MovieComments movie={movie?.data?.data} />
      </Box>
    </Box>
  );

  const failedMovie = <Navigate replace to="/404" />;

  return (
    <React.Fragment>
      {isLoading || isFetching ? (
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
