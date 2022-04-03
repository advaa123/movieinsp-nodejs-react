import React, { useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { MoviePageCard } from "../components/MovieCards";
import { MovieComments, MovieAddComments } from "../components/Comments";
import { GoBack } from "../components/GoBack";
import { useMovie } from "../hooks/useMovie";

const MoviePage = () => {
  const params = useParams();
  const {
    data: movie,
    isLoading,
    isFetching,
    isError: failedToLoad,
  } = useMovie(params.id);

  const loadedMovie = useMemo(
    () =>
      !isLoading && (
        <div style={{ textAlign: "center" }}>
          <MoviePageCard movie={movie?.data?.data} />
          <Box
            sx={{
              m: 2,
              width: 350,
              display: "inline-block",
            }}
          >
            <MovieAddComments movie={movie?.data?.data} />
            <MovieComments movie={movie?.data?.data} />
          </Box>
        </div>
      ),
    [isLoading]
  );

  const failedMovie = <Navigate replace to="/404" />;

  return (
    <React.Fragment>
      <GoBack />
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
