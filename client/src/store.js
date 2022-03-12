import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./features/MoviesSlice";
import genresReducer from './features/GenresSlice';
import movieDetailsReducer from "./features/MovieDetailsSlice";
// import reducers

export default configureStore({
    reducer: {
      movies: moviesReducer,
      genres: genresReducer,
      movieDetails: movieDetailsReducer
    },
  });