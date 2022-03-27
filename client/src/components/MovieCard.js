import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Grow, Box } from "@mui/material";
import { Link } from "react-router-dom";
import MovieFavorite from "./MovieFavorite";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import "./MovieCard.css";

const MovieCard = ({ movie, grow, trending }) => {
  const img = movie.img || movie.poster_path;
  const sx = !trending
    ? {
        maxWidth: 300,
        minWidth: 300,
        height: 440,
        m: 2,
        verticalAlign: "center",
        textAlign: "center",
      }
    : {};

  const getUrl = () => {
    if (img) return process.env.REACT_APP_TMDB_IMG_W342 + img;
    else if (movie.backdrop)
      return process.env.REACT_APP_TMDB_IMG_W300 + movie.backdrop;
    return null;
  };

  const handleOnDragStart = (e) => e.preventDefault();

  return (
    <Grow in={true}>
      <Card sx={sx} style={{ position: "relative" }}>
        <CardActionArea
          component={Link}
          to={`/movie/${movie.id}`}
          sx={{ height: "100%", justifyContent: "center", display: "flex" }}
        >
          <Box
            sx={{
              alignSelf: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              display: "flex",
            }}
          >
            {!getUrl() ? (
              <ImageNotSupportedIcon
                sx={{ fontSize: 150, alignSelf: "center", width: "100%" }}
              />
            ) : (
              <CardMedia
                component="img"
                alt={movie.title}
                image={getUrl()}
                style={{ objectFit: "cover", height: "100%" }}
                onDragStart={handleOnDragStart}
              />
            )}
          </Box>
        </CardActionArea>
        {!trending && <MovieFavorite movie={movie} />}
      </Card>
    </Grow>
  );
};

export default MovieCard;
