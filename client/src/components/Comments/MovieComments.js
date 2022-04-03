import React, { useState } from "react";
import List from "@mui/material/List";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useMovieComments } from "../../hooks/useMovieComments";
import { Button, CircularProgress } from "@mui/material";
import MovieComment from "./MovieComment";
import "./MovieComments.css";

const resultsLimit = 3;

export default function MovieComments() {
  const params = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = useMovieComments(params.id);
  const [results, setResults] = useState(resultsLimit);

  const handleClick = () => {
    setResults((prev) => prev + resultsLimit);
  };

  return (
    <List
      component="div"
      sx={{
        width: "100%",
        maxWidth: 450,
        mt: 2,
        bgcolor: "background.paper",
      }}
      className="comments"
    >
      <>
        {data?.data?.comments.map((comment, index) =>
          index < results ? (
            <MovieComment comment={comment} key={comment._id} />
          ) : (
            ""
          )
        )}
        {results < data?.data?.comments?.length && (
          <Button onClick={handleClick}>Load more</Button>
        )}
        {isLoading || (isFetching && <CircularProgress sx={{ m: 4 }} />)}
      </>
    </List>
  );
}
