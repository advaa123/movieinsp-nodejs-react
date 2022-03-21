import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoadingMovies,
  selectMovies,
  failedToLoadMovies,
  loadMoviePage,
  selectPages,
  loadSearchMoviePage,
  loadSearchedMovies,
  isLoadingSearch,
} from "../features/MoviesSlice";
import MovieCard from "./MovieCard";
import { Box, CircularProgress, Stack, Pagination } from "@mui/material";
import { useLocation } from "react-router-dom";
import { selectCheckedGenres } from "../features/GenresSlice";
import MoviesSearch from "./MoviesSearch";

const Movies = forwardRef(({ handleRef }, ref) => {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const moviesAreLoading = useSelector(isLoadingMovies);
  const moviesRejected = useSelector(failedToLoadMovies);
  const location = useLocation();
  const path = location.pathname.slice(1) || "movies-playing";
  const [page, setPage] = useState(1);
  const totalPages = useSelector(selectPages);
  const [search, setSearch] = useState(false);
  const checkedGenres = useSelector(selectCheckedGenres);
  const loadingSearch = useSelector(isLoadingSearch);

  const handleChangePage = (event, value) => {
    handleRef();
    setPage(value);
    if (path.startsWith("search/")) {
      const params = path.split("/");
      dispatch(loadSearchMoviePage({ movie: params[1], page: value }));
    } else {
      dispatch(loadMoviePage({ reqType: path, page: value }));
    }
  };

  useEffect(() => {
    setPage(1);
    if (path.startsWith("search/")) {
      setSearch(true);
      const params = path.split("/");
      dispatch(loadSearchMoviePage({ movie: params[1], page: 1 }));
    } else {
      setSearch(false);
      dispatch(loadMoviePage({ reqType: path, page: 1 }));
    }
  }, [path]);

  useEffect(() => {
    if (!loadingSearch && search) dispatch(loadSearchedMovies(checkedGenres));
  }, [checkedGenres, loadingSearch]);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
        }}
        ref={ref}
      >
        {!search ? (
          moviesAreLoading ? (
            <CircularProgress sx={{ m: 10 }} />
          ) : moviesRejected ? (
            <div style={{ margin: 5 }}>Something went wrong.</div>
          ) : movies?.length > 0 ? (
            movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} grow={index * 500} />
            ))
          ) : (
            <Box sx={{ m: 2 }}>No movies match the criteria.</Box>
          )
        ) : (
          <MoviesSearch />
        )}
      </Box>
      <Stack spacing={2} sx={{ m: 5 }}>
        {search && checkedGenres.length ? (
          ""
        ) : (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
          />
        )}
      </Stack>
    </React.Fragment>
  );
});

export default Movies;
