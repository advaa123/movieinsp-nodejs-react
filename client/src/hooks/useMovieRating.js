import axios from "axios";
import { useMutation, useQuery } from "react-query";

const fetchMovieRatings = ({ queryKey }) => {
  return axios.get(`/movie/${queryKey[1]}/rate`);
};

const addRating = ({ id, rating, token }) => {
  return axios.put(`/movie/${id}/rate`, rating, {
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
