import React from "react";
import { Box } from "@mui/material";
import Genres from "./Genres";
import SearchBox from "./SearchBox";

const JumboSearch = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        p: 3,
        bgcolor: "primary.chat",
        m: 2,
      }}
    >
      <Genres />
      <SearchBox />
    </Box>
  );
};

export default JumboSearch;
