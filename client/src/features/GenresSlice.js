import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadGenres = createAsyncThunk("genres/loadGenres", async () => {
  const response = await fetch(`http://localhost:3001/movies/genres`);
  const json = await response.json();
  return json.genres;
});

export const genresSlice = createSlice({
  name: "genres",
  initialState: {
    genres: [],
    selectedGenres: [],
    isLoadingGenres: false,
    failedToLoadGenres: false,
  },
  reducers: {
    getSelectedGenres: (state, action) => {
      state.selectedGenres = action.payload;
    },
    clearSelectedGenres: (state, action) => {
      state.selectedGenres = [];
    },
  },
  extraReducers: {
    [loadGenres.pending]: (state, action) => {
      state.isLoadingGenres = true;
      state.failedToLoadGenres = false;
    },
    [loadGenres.fulfilled]: (state, action) => {
      state.genres = action.payload;
      state.isLoadingGenres = false;
      state.failedToLoadGenres = false;
    },
    [loadGenres.rejected]: (state, action) => {
      state.isLoadingGenres = false;
      state.failedToLoadGenres = true;
    },
  },
});

export const { getSelectedGenres, clearSelectedGenres } = genresSlice.actions;

export const selectGenres = (state) => state.genres.genres;
export const isLoadingGenres = (state) => state.genres.isLoadingGenres;
export const selectCheckedGenres = (state) => state.genres.selectedGenres;

export default genresSlice.reducer;
