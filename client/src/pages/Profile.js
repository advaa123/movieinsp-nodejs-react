import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { userContext } = useAuth();

  return (
    <Box
      sx={{
        m: 2,
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-between",
      }}
    >
      <Avatar sx={{ height: 100, width: 100, mr: 3 }} />
      <Box sx={{ display: "flex", flexFlow: "column wrap" }}>
      <Typography component="div" variant="h6">
          {userContext.details.username}
        </Typography>
        <Typography component="div">
          <strong>First name:</strong> {userContext.details.firstName}
        </Typography>
        <Typography component="div">
          <strong>Last name:</strong> {userContext.details.lastName}
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;
