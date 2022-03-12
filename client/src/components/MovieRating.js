import { Rating, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const fetchMovieRatings = ({ queryKey }) => {
  return axios.get("/movie/rate/" + queryKey[1]);
};

const addRating = ({ id, rating, token }) => {
  return axios.put("/movie/rate/" + id, rating, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const MovieRating = () => {
  const params = useParams();
  const { userContext } = useAuth();
  const {
    data: rate,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery(["movie", params.id], fetchMovieRatings, {
    retry: false,
    keepPreviousData: true,
  });
  const { mutate, isSuccess } = useMutation(addRating);
  const [voted, setVoted] = useState(false);
  const queryClient = useQueryClient();

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
          queryClient.setQueryData(["movie", params.id], (oldQueryData) => {
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
          });
          if (isNew) refetch();
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const getRate = () => {
    if (isError) {
      return "This movie hasn't been rated yet.";
    }
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
      <Rating
        disabled={voted}
        name="size-small"
        defaultValue={1}
        value={parseFloat(rate?.data?.rating)}
        size="small"
        onChange={handleChange}
      />
      <Typography variant="caption" color="" gutterBottom>
        {getRate()}
      </Typography>
    </Box>
  );
};

export default MovieRating;
