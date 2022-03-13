import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import "./MovieComments.css";
import { useMovieComments } from "../hooks/useMovieComments";

const getDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const getTime = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getDateToday = () => {
  return new Date().toLocaleDateString();
};

export default function MovieComments() {
  const params = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch, isFetching } = useMovieComments(
    params.id
  );

  return (
    <List
      component="div"
      sx={{
        width: "100%",
        maxWidth: 450,
        maxHeight: 400,
        mt: 2,
        bgcolor: "background.paper",
      }}
      className="comments"
    >
      {data?.data?.comments.map((comment, index) => {
        return (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start" component="div">
              <ListItemAvatar>
                <Avatar>{comment.postedBy.username[0].toUpperCase()}</Avatar>
              </ListItemAvatar>
              <ListItemText
                component="div"
                key={index}
                primary=""
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {comment.postedBy.username}
                    </Typography>
                    <span
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                      key={index}
                    />{" "}
                    <span style={{ float: "right" }}>
                      {getDate(comment.date) !== getDateToday() &&
                        getDate(comment.date) + " "}
                      {getTime(comment.date)}
                    </span>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
}
