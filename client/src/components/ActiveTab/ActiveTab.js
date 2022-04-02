import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const possibleRequests = {
  "/movies-playing": "Currently Playing",
  "/top-rated": "Top Rated",
  "/upcoming": "Upcoming Movies",
};

const ActiveTab = () => {
  const location = useLocation();
  const [value, setValue] = React.useState(0);
  const path =
    location.pathname === "/" ? "/movies-playing" : location.pathname;

  useEffect(() => {
    switch (path) {
      case "/movies-playing":
        setValue(0);
        break;
      case "/top-rated":
        setValue(1);
        break;
      case "/upcoming":
        setValue(2);
        break;
      default:
        setValue(false);
        break;
    }
  }, [path]);

  return (
    <React.Fragment>
      <Box>
        <Tabs
          value={value}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          {Object.keys(possibleRequests).map((keyName) => (
            <Tab
              component={Link}
              to={keyName}
              label={possibleRequests[keyName]}
              key={keyName}
            />
          ))}
        </Tabs>
      </Box>
    </React.Fragment>
  );
};

export default ActiveTab;
