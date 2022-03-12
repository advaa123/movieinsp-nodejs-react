import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadMoviePage = createAsyncThunk(
  "movies/loadMoviePage",
  async ({ reqType, page }) => {
    const response = await fetch(
      `/movies/${reqType}/${page}`
    );
    const json = await response.json();
    return json.data;
  }
);

export const loadSearchMoviePage = createAsyncThunk(
  "movies/loadSearchMoviePage",
  async ({ movie, page }) => {
    const response = await fetch(
      `/search/${movie}/${page}`
    );
    const json = await response.json();
    return json.data;
  }
);

// Create postCommentForArticleId here.
// export const postCommentForArticleId = createAsyncThunk(
//   'comments/postCommentForArticleId',
//   async ({articleId, comment}) => {
//     const requestBody = JSON.stringify({comment: comment});
//     const response = await fetch(`api/articles/${articleId}/comments`, {method: "POST", body: requestBody});
//     const json = await response.json();
//     return json;
//   }
// )

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    pages: 1,
    movieSuggestions: [],
    displayMovieSuggestions: [],
    isLoadingMovies: false,
    failedToLoadMovies: false,
    isLoadingSearch: false,
    failedToLoadSearch: false,
  },
  reducers: {
    loadSearchedMovies: (state, action) => {
      if (!action.payload.length) {
        state.displayMovieSuggestions = state.movieSuggestions;
      } else {
        state.displayMovieSuggestions = state.movieSuggestions.filter((movie) =>
          action.payload.some((filter) => movie.genre_ids.includes(filter.id))
        );
      }
    },
    clearMovieSuggestions: (state, action) => {
      state.movieSuggestions = [];
    },
  },
  extraReducers: {
    [loadMoviePage.pending]: (state, action) => {
      state.isLoadingMovies = true;
      state.failedToLoadMovies = false;
    },
    [loadMoviePage.fulfilled]: (state, action) => {
      state.movies = action.payload.movies;
      state.pages = action.payload.total_pages;
      state.isLoadingMovies = false;
      state.failedToLoadMovies = false;
    },
    [loadMoviePage.rejected]: (state, action) => {
      state.isLoadingMovies = false;
      state.failedToLoadMovies = true;
    },
    [loadSearchMoviePage.pending]: (state, action) => {
      state.isLoadingSearch = true;
      state.failedToLoadSearch = false;
    },
    [loadSearchMoviePage.fulfilled]: (state, action) => {
      state.movieSuggestions =
        "movies" in action.payload ? action.payload.movies : [];
      state.pages =
        "total_pages" in action.payload ? action.payload.total_pages : 1;
      state.isLoadingSearch = false;
      state.failedToLoadSearch = false;
    },
    [loadSearchMoviePage.rejected]: (state, action) => {
      state.isLoadingSearch = false;
      state.failedToLoadMovies = true;
    },
  },
});

export const selectMovies = (state) => state.movies.movies;
export const isLoadingMovies = (state) => state.movies.isLoadingMovies;
export const failedToLoadMovies = (state) => state.movies.failedToLoadMovies;

export const selectSuggestions = (state) => state.movies.movieSuggestions;
export const displayMovieSuggestions = (state) => state.movies.displayMovieSuggestions;
export const isLoadingSearch = (state) => state.movies.isLoadingSearch;
export const failedToLoadSearch = (state) => state.movies.failedToLoadSearch;

export const selectRequestType = (state) => state.movies.requestType;
export const selectPages = (state) => state.movies.pages;

export const {
  loadSearchedMovies,
  clearMovieSuggestions,
  setRequestType,
  clearMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
