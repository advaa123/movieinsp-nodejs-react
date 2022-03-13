import { Button, Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useQueryClient } from "react-query";
import useAuth from "../hooks/useAuth";
import { useParams, Link as RouterLink } from "react-router-dom";
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

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

const MovieAddComments = ({ movie }) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const { userContext } = useAuth();
  const [convertedText, setConvertedText] = useState("");
  const [comments, setComments] = useState([]);
  const ref = useRef(null);
  const { mutate } = useMovieAddComment();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClick = (e) => {
    if (userContext.details) {
      const comment = {
        movieId: movie.id,
        postedBy: userContext?.details?._id,
        content: convertedText,
      };
      if (ref.current.editor.getText().length > 1) {
        setComments((prev) => [...prev, convertedText]);
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
          value={convertedText}
          placeholder="Comment on this movie..."
          onChange={setConvertedText}
          ref={ref}
          modules={modules}
        />
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{ mt: 1 }}
          disabled={
            ref.current?.editor.getText().trim().length < 2 ||
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
      </div>
    </>
  );
};

export default MovieAddComments;
