import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "./Chatmessage.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const Chatmessage = ({ username, message }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  }, []);

  

  return (
      <Box className="container user" sx={{bgcolor: 'primary.user'}}>
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
