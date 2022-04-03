import React from "react";
import Box from "@mui/material/Box";
import "./Chatmessage.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import useChatTime from "../../hooks/useChatTime";

const Chatmessage = ({ username, message }) => {
  const time = useChatTime();

  return (
    <Box className="container user" sx={{ bgcolor: "primary.user" }}>
      <Box className="cnt">
        <Box className="icon">
          <AccountCircleRoundedIcon style={{ fill: "#c4eff7" }} />
        </Box>
        <Box className="message">
          <Box className="username">{username}</Box>
          {message}
        </Box>
      </Box>
      <Box className="time-right">{time}</Box>
    </Box>
  );
};

export default Chatmessage;
