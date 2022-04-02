import React, { useState, useEffect } from "react";
import "./Chatmessage.css";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import useChatTime from "../../hooks/useChatTime";

const BotMessage = ({ message }) => {
  const time = useChatTime();

  return (
    <Box className="container bot" sx={{ bgcolor: "primary.dark" }}>
      <Box className="cnt">
        <Box className="icon-right">
          <Avatar sx={{ width: 30, height: 30 }}>B</Avatar>
        </Box>
        <Box className="message">{message}</Box>
      </Box>
      <Box className="time-left">{time}</Box>
    </Box>
  );
};

export default BotMessage;
