import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { userContext } = useAuth();

  return (
    <Box sx={{m: 2, display: "flex", flexFlow: "row wrap", justifyContent: "space-between"}}>
      <Avatar sx={{height: 100, width: 100, mr: 3}}/>
      <Box sx={{display: "flex", flexFlow: "row wrap"}}>
        <Typography>First name: {userContext.details.firstName}</Typography>
      </Box>
      <Box>
        <Typography>Last name: {userContext.details.lastName}</Typography>
      </Box>
      
    </Box>
  );
};

export default Profile;
