import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import moment from "moment";

const MovieComment = ({ comment }) => {
  const theme = useTheme();
  const commentStyle =
    theme.palette.mode !== "dark"
      ? {
          borderRadius: 2,
          bgcolor: "grey.50",
          p: 1,
        }
      : { borderRadius: 2, bgcolor: "primary.dark", p: 1 };

  return (
    <React.Fragment>
      <ListItem alignItems="flex-start" component="div">
        <ListItemAvatar>
          <Avatar>{comment.postedBy.username[0].toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText
          component="div"
          key={comment._id}
          sx={commentStyle}
          primary=""
          secondary={
            <>
              <Typography
                sx={{ display: "inline", fontWeight: 500 }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comment.postedBy.username}
              </Typography>
              <span
                dangerouslySetInnerHTML={{ __html: comment.content }}
                key={comment._id}
              />{" "}
              <span style={{ float: "right" }}>
                {moment(comment.date).fromNow()}
              </span>
            </>
          }
        />
      </ListItem>
    </React.Fragment>
  );
};

export default MovieComment;
