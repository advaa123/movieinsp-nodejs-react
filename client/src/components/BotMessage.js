import React, {useState, useEffect} from "react";
import "./Chatmessage.css";
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";

const BotMessage = ({ message }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }));
  }, [])
  return (
      <Box className="container bot" sx={{bgcolor: 'primary.dark'}}>
        <Box className="cnt">
          <Box className="icon-right">
            <Avatar sx={{width: 30, height: 30}}>B</Avatar>
          </Box>
          <Box className="message">
            {message}
          </Box>
        </Box>
        <Box className="time-left">{time}</Box>
      </Box>
  );
};

export default BotMessage;
