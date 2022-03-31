import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedGenres,
  selectCheckedGenres,
} from "../../features/GenresSlice";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import debounce from "lodash/debounce";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import {
  clearMovieSuggestions,
  isLoadingSearch,
  loadSearchMoviePage,
  selectSuggestions,
} from "../../features/MoviesSlice";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBox = () => {
  const [isClear, setIsClear] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const options = useSelector(selectSuggestions);
  const checkedGenres = useSelector(selectCheckedGenres);
  const selectIsLoadingSearch = useSelector(isLoadingSearch);
  const dispatch = useDispatch();
  const location = useLocation();

  const getOptionsDelayed = useMemo(
    () =>
      debounce((text) => {
        dispatch(loadSearchMoviePage({ movie: text, page: 1 }));
      }, 400),
    [dispatch]
  );

  const handleClearSearch = (e) => {
    if (checkedGenres.length) dispatch(clearSelectedGenres());
    if (options.length) dispatch(clearMovieSuggestions());
    setInputValue("");
    location.pathname.startsWith("/search") && navigate("/");
  };

  const handleSearch = () => {
    if (inputValue) navigate("/search/" + inputValue);
  };

  useEffect(() => {
    if (inputValue.length) {
      getOptionsDelayed(inputValue, () => {});
    }
  }, [inputValue, getOptionsDelayed]);

  useEffect(() => {
    if (inputValue.length || checkedGenres.length) {
      setIsClear(false);
    } else if (!inputValue.length && !checkedGenres.length) {
      setIsClear(true);
    }
  }, [inputValue, checkedGenres]);

  return (
    <React.Fragment>
      <Autocomplete
        size="small"
        freeSolo
        autoSelect
        options={options}
        getOptionLabel={(option) => option.title || option}
        filterOptions={(x) => x}
        autoComplete
        value={inputValue}
        loading={selectIsLoadingSearch}
        onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for movie..."
            margin="normal"

            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") handleSearch(event);
            }}
          />
        )}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option.title, inputValue);
          const parts = parse(option.title, matches);
          return (
            <li {...props} key={option.id}>
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          );
        }}
      />
      <Button
        disabled={inputValue.length === 0}
        variant="contained"
        color="secondary"
        sx={{ m: 2 }}
        onClick={handleSearch}
      >
        Search!
      </Button>
      <Button
        disabled={isClear}
        variant="contained"
        color="warning"
        sx={{ m: 2 }}
        onClick={handleClearSearch}
      >
        Clear Search
      </Button>
    </React.Fragment>
  );
};

export default SearchBox;
