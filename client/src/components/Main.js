import React from "react";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { Divider } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const possibleRequests = {
  "/movies-playing": "Currently Playing",
  "/top-rated": "Top Rated",
  "/upcoming": "Upcoming Movies",
};

const Main = () => {
  const location = useLocation();
  const path =
    location.pathname === "/" ? "/movies-playing" : location.pathname;

  return (
    <React.Fragment>
      <Box>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ p: 1, display: "flex", justifyContent: "center" }}
        >
          {Object.keys(possibleRequests).map((keyName) => (
            <Button
              component={Link}
              to={keyName}
              variant="contained"
              key={keyName}
              value={keyName}
              color={
                path === keyName
                  ? "secondary"
                  : "primary"
              }
              sx={{ m: 1 }}
            >
              {possibleRequests[keyName]}
            </Button>
          ))}
        </Typography>
        <Divider />
      </Box>
    </React.Fragment>
  );
};

export default Main;
