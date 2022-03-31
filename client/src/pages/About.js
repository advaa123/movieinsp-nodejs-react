import { Box, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Box sx={{ mt: 10, mb: 10, textAlign: "center" }}>
      <Typography variant="h5">About</Typography>
      <Typography sx={{ mt: 2 }}>
        I don't have anything smart to say about myself.
      </Typography>
    </Box>
  );
};

export default About;
