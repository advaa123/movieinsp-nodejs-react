import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadMovieDetails = createAsyncThunk(
  "movieDetails/loadMovieDetails",
  async (id) => {
    const response = await fetch(`http://localhost:3001/movie/${id}`);
    const json = await response.json();
    return json.data;
  }
);

export const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: {
    movie: {},
    isLoadingMovie: false,
    failedToLoadMovie: false,
  },
  reducers: {
    clearMovieDetails: (state, action) => {
      state.movie = {};
    },
  },
  extraReducers: {
    [loadMovieDetails.pending]: (state, action) => {
      state.isLoadingMovie = true;
      state.failedToLoadMovie = false;
    },
    [loadMovieDetails.fulfilled]: (state, action) => {
      state.movie = action.payload;
      state.isLoadingMovie = false;
      state.movie === {}
        ? (state.failedToLoadMovie = true)
        : (state.failedToLoadMovie = false);
    },
    [loadMovieDetails.rejected]: (state, action) => {
      state.isLoadingMovie = false;
      state.failedToLoadMovie = true;
    },
  },
});

export const selectMovieDetails = (state) => state.movieDetails.movie;
export const isLoadingMovieDetails = (state) =>
  state.movieDetails.isLoadingMovie;
export const failedToLoadMovieDetails = (state) =>
  state.movieDetails.failedToLoadMovie;

export const { clearMovieDetails } = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
