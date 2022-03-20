import React from "react";
import Backdrop from "@mui/material/Backdrop";
import { Box, Container } from "@mui/material";
import { Typography } from "@mui/material";

// currently not in use

const MovieDesc = ({ movie, onClick, open }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={onClick}
    >
      <Box
        sx={{
          width: '400',
          height: "auto",
          bgcolor: "black",
          opacity: 0.8,
          p: 2,
          borderRadius: 5,
        }}
      >
        <Container
          sx={{ color: "white", display: "flex", flexFlow: "row wrap", justifyContent: "center", alignItems: "center" }}
        >
          <Box>
            <img src={"https://image.tmdb.org/t/p/w342/" + movie.img} style={{paddingTop: 10}} alt={movie.title}/>
          </Box>
          <Typography gutterBottom variant="h5" component="div" sx={{ p: 1 }}>
            {movie.title}
            <Typography variant="body2">
              {movie.overview}
            </Typography>
          </Typography>
        </Container>
      </Box>
    </Backdrop>
  );
};

export default MovieDesc;
