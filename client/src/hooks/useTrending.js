import axios from "axios";
import { useQuery } from "react-query";

const fetchTrendingMovies = () => {
  return axios.get(
    `${process.env.REACT_APP_MOVIES_ENDPOINT}/trending`
  );
};

export const useTrending = () => {
  const queryKey = "trending-movies";
  return useQuery(queryKey, fetchTrendingMovies, {
    retry: false,
    refetchOnWindowFocus: false,
  });
};
