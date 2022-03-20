import { Button, Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useQueryClient } from "react-query";
import useAuth from "../hooks/useAuth";
import { Link as RouterLink } from "react-router-dom";
import "./MovieAddComments.css";
import Link from "@mui/material/Link";
import { useMovieAddComment } from "../hooks/useMovieComments";

const Block = Quill.import("blots/block");
Block.tagName = "div";
Quill.register(Block, null, true);

const modules = {
  toolbar: [
    [{ header: [3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const MovieAddComments = ({ movie }) => {
  const queryClient = useQueryClient();
  const { userContext } = useAuth();
  const [convertedText, setConvertedText] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [limitError, setLimitError] = useState(false);
  const ref = useRef(null);
  const { mutate } = useMovieAddComment();
  const characterLimit = 200;

  const handleChange = (value) => {
    let text = ref.current.editor.getText().trim();

    if (text.length < characterLimit) {
     limitError && setLimitError(false);
      setConvertedText(value);
    } else setLimitError(true);
  };

  const handleClick = (e) => {
    if (userContext.details) {
      const comment = {
        movieId: movie.id,
        postedBy: userContext?.details?._id,
        content: convertedText,
      };
      if (ref.current.editor.getText().length > 1) {
        mutate(
          { comment, token: userContext.token },
          {
            onSuccess: () => {
              queryClient.invalidateQueries("movie-comments");
              setSuccess(true);
              setConvertedText("");
            },
          }
        );
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div id="editor">
        <ReactQuill
          theme="snow"
          className="myQuill"
          defaultValue={convertedText}
          placeholder="Comment on this movie..."
          onChange={handleChange}
          ref={ref}
          modules={modules}
        />
      </div>
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{ mt: 1 }}
        disabled={
          ref.current?.editor.getText().trim().length < 2 ||
          limitError ||
          convertedText.trim().length === 0
        }
      >
        Post!
      </Button>
      <Collapse in={success}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSuccess(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mt: 2, mb: 2 }}
        >
          Posted comment!
        </Alert>
      </Collapse>
      <Collapse in={error}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mt: 2, mb: 2 }}
        >
          You need to{" "}
          {
            <Link component={RouterLink} to="/login" color="inherit">
              login
            </Link>
          }{" "}
          in order to perform this action.
        </Alert>
      </Collapse>
      <Collapse in={limitError}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setLimitError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mt: 2, mb: 2 }}
        >
          The maximum length of this input field has been exceeded.
        </Alert>
      </Collapse>
    </>
  );
};

export default MovieAddComments;
