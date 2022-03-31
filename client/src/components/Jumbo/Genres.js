import React, { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGenres,
  loadGenres,
  getSelectedGenres,
  selectCheckedGenres,
} from "../../features/GenresSlice";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Genres = () => {
  const dispatch = useDispatch();
  const genres = useSelector(selectGenres);
  const checkedGenres = useSelector(selectCheckedGenres);

  useEffect(() => {
    dispatch(loadGenres());
  }, []);

  return (
    <Box sx={{}}>
      <Autocomplete
        size="small"
        multiple
        id="genres-checkbox"
        value={checkedGenres}
        options={genres}
        limitTags={2}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 2 }}
              checked={selected}
            />
            {option.name}
          </li>
        )}
        onChange={(e, option) => {
          dispatch(getSelectedGenres(option));
        }}
        renderInput={(params) => <TextField {...params} label="Genres" />}
      />
    </Box>
  );
};

export default Genres;
