import axios from "axios";
import { useMutation, useQuery } from "react-query";

const api = process.env.REACT_APP_MOVIES_ENDPOINT;

const fetchMovieRatings = ({ queryKey }) => {
  return axios.get(`${api}/movie/${queryKey[1]}/rate`);
};

const addRating = ({ id, rating, token }) => {
  return axios.put(`${api}/movie/${id}/rate`, rating, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useMovieRating = (id) => {
  return useQuery(["movie-rating", id], fetchMovieRatings, {
    retry: false,
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
};

export const useRateMovie = () => {
    return useMutation(addRating);
}
