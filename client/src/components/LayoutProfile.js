import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Chat from "./Chat";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMovieDetails } from "../features/MovieDetailsSlice";
import { Typography, Stack } from "@mui/material";

const LayoutProfile = () => {
  const movie = useSelector(selectMovieDetails);

  return (
    <React.Fragment>
      <NavBar />
      <Box
        sx={{ height: "auto", mt: 3 }}
        style={{
          backgroundImage:
            "url(" +
            process.env.REACT_APP_TMDB_IMG_ORIGINAL +
            movie.backdrop_path +
            ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          opacity: 1,
        }}
      >
        <Box
          style={{
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            flexFlow: "column wrap",
            justifyContent: "center",
            textAlign: "center",
          }}
          sx={{ p: 3 }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <img
              src={process.env.REACT_APP_TMDB_IMG_W342 + movie.poster_path}
              alt={movie.title}
              width="342"
              height="340"
              style={{ borderRadius: 9 }}
            />
            <Typography
              style={{ color: "white" }}
              sx={{ m: 2 }}
              variant="h3"
              component="div"
            >
              {movie.title}
            </Typography>
            <Typography style={{ color: "white" }} component="div">
              {movie.overview}
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Outlet />
      <Chat />
      <Footer />
    </React.Fragment>
  );
};

export default LayoutProfile;
