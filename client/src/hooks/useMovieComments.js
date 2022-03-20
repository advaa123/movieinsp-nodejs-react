import { useMutation, useQuery } from "react-query";
import axios from "axios";

const fetchComments = ({ queryKey }) => {
  return axios.get("/movie/" + queryKey[1] + "/comments");
};

const addComment = ({ comment, token }) => {
  return axios.post("/movie/comment", comment, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
};

export const useMovieComments = (id) => {
  const queryKey = ["movie-comments", id];
  return useQuery(queryKey, fetchComments, {
    retry: false,
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
};

export const useMovieAddComment = () => {
  return useMutation(addComment);
};
