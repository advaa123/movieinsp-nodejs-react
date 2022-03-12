import React from "react";
import { Box, Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";

const LogoDesc = () => {
  const { userContext } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexFlow: "column wrap",
      }}
    >
      <Typography variant="h2">
        <span style={{ color: "secondary" }}>W</span>elcome
      </Typography>
      <Typography variant="h5">
        Hello{userContext.details ? " " + userContext.details.firstName : ""}!
      </Typography>
    </Box>
  );
};

export default LogoDesc;
