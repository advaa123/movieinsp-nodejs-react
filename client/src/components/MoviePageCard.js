import React from "react";
import Card from "@mui/material/Card";
import { Chip, Grow, Box, Typography, CardMedia, CardContent } from "@mui/material";
import MovieFavorite from "./MovieFavorite";
import MovieRating from "./MovieRating";

const MoviePageCard = ({ movie, grow }) => {
  const img = movie.img || movie.poster_path;

  const calculateRuntime = (min) => {
    const hours = min / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);

    const hoursStr = rhours === 1 ? " hour" : " hours";
    let minStr =
      rminutes === 1
        ? " and " + rminutes + " minute."
        : rminutes === 0
        ? "."
        : " and " + rminutes + " minutes.";
    return rhours + hoursStr + minStr;
  };

  return (
    <Grow in={true}>
      <Card sx={{ maxWidth: 342, m: 2, borderRadius: 5, boxShadow: 0 }} style={{ position: "relative" }}>
        <Box>
          <CardMedia
            component="img"
            alt={movie.title}
            image={process.env.REACT_APP_TMDB_IMG_W342 + img}
          />
          <CardContent sx={{ mb: 5, mr: 2 }}>
            <Typography gutterBottom variant="h5" component="div">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.overview}
            </Typography>
            <Typography color="text.secondary" variant="caption" gutterBottom>
              Runtime: {calculateRuntime(movie.runtime)}
            </Typography>
            <Typography
              color="text.secondary"
              component="div"
              gutterBottom
              sx={{
                width: "80%",
                mt: 2,
              }}
            >
              {movie.genres &&
                movie.genres.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    sx={{ mr: 0.2, mb: 0.2 }}
                    size="small"
                    disabled
                  />
                ))}
            </Typography>
          </CardContent>
        </Box>
        <MovieRating />
        <MovieFavorite movie={movie} />
      </Card>
    </Grow>
  );
};

export default MoviePageCard;
