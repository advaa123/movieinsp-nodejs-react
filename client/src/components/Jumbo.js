import React from "react";
import { Box } from "@mui/material";
import LogoDesc from "./LogoDesc";
import JumboSearch from "./JumboSearch";

const Jumbo = () => {
  return (
    <React.Fragment>
      <Box
        sx={{
          minHeight: 500,
          bgcolor: "primary.dark",
          color: "white",
          justifyContent: "center",
          display: "flex",
          flexFlow: "column",
          p: 5,
        }}
      >
        <Box
          sx={{
            justifyContent: "space-evenly",
            alignItems: "center",
            display: "flex",
            flexFlow: "row wrap",
          }}
        >
          <LogoDesc />
          <JumboSearch />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Jumbo;
