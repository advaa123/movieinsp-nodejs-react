import { Rating, Typography, Box, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useMovieRating, useRateMovie } from "../hooks/useMovieRating";

const MovieRating = () => {
  const params = useParams();
  const { userContext } = useAuth();
  const {
    data: rate,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useMovieRating(params.id);
  const { mutate, isSuccess } = useRateMovie();
  const [voted, setVoted] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userContext.token) setVoted(true);
  }, [userContext.token]);

  const handleChange = (e) => {
    setVoted((prev) => !prev);
    mutate(
      {
        id: params.id,
        rating: { rate: parseInt(e.target.value) },
        token: userContext.token,
      },
      {
        onSuccess: (data) => {
          let isNew = false;
          queryClient.setQueryData(
            ["movie-rating", params.id],
            (oldQueryData) => {
              if (oldQueryData)
                return {
                  ...oldQueryData,
                  data: {
                    ...oldQueryData.data,
                    ...data.data,
                  },
                };
              isNew = true;
              return oldQueryData;
            }
          );
          if (isNew) refetch();
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const getRate = () => {
    if (isError || rate?.data.rating === 0) {
      return "This movie hasn't been rated yet.";
    }
    if (isFetching) return "Loading...";

    return rate?.data.rating;
  };

  return (
    <Box
      sx={{ m: 2 }}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        display: "flex",
        flexFlow: "column wrap",
      }}
    >
      <Tooltip
        disableHoverListener={
          userContext.token !== null && userContext.token !== undefined
        }
        title="Only logged in users can rate movies."
      >
        <span>
          <Rating
            disabled={voted}
            name="size-small"
            defaultValue={1}
            value={parseFloat(rate?.data?.rating)}
            size="small"
            onChange={handleChange}
          />
        </span>
      </Tooltip>
      <Typography variant="caption" color="" gutterBottom>
        {getRate()}
      </Typography>
    </Box>
  );
};

export default MovieRating;
