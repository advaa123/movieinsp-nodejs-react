import axios from "axios";
import { useQuery } from "react-query";

const fetchMovieDetails = ({ queryKey }) => {
  return axios.get(`http://localhost:3001/movie/${queryKey[1]}`);
};

export const useMovie = (id) => {
  const queryKey = ["movie-details", id];
  return useQuery(queryKey, fetchMovieDetails, {
    retry: false,
    refetchOnWindowFocus: false,
  });
};
