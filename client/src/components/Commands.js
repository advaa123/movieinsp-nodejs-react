import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Box, Chip } from "@mui/material";
import React from "react";
import { v4 } from "uuid";

const useStyles = makeStyles(() => ({
  root: (props) => ({
    backgroundColor: props.palette.action.selected,
    transition: "background-color 0.3s",
    color: props.palette.text.primary,
    border: "none",
    borderRadius: 16,
    height: 24,
    padding: 8,
    margin: 2,
    cursor: "pointer",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      transition: "background-color 0.2s",
      backgroundColor: props.palette.action.focus,
    },
  }),
}));

const Commands = ({ cmd, handleCommandClick }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleClick = (e, command) => {
    handleCommandClick(e, command);
    console.log(theme);
  };

  return (
    <Box className="container bot">
      <Box className="cnt">
        <Box className="message">
          {cmd.map((command, index) => (
            <React.Fragment key={index}>
              {/* Bug when using MUI's Chip component 
              - onClick would randomly stop working - used custom styled buttons instead */}
              {/*
              <Chip
                key={v4()}
                label={command}
                component="button"
                size="small"
                sx={{ m: 0.2 }}
                onClick={(e) => handleClick(e, command)}
              /> */}
              <button
                className={classes.root}
                key={v4()}
                onClick={(e) => handleClick(e, command)}
              >
                {command}
              </button>
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Commands;
