import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";
import CancelIcon from "@mui/icons-material/Cancel";
import Fade from "@mui/material/Fade";
import Chatbox from "./Chatbox";
import { Box } from "@mui/material";

const Chat = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked((prev) => !prev);
  };

  return (
    <div className="chatbox-footer">
      <Fade in={clicked}>
        <Box sx={{display: clicked ? 'flex' : 'none', zIndex: 1100}}>
          <Chatbox clicked={clicked} />
        </Box>
      </Fade>
      <Fab color="secondary" aria-label="add" onClick={handleClick}>
        {!clicked ? <ChatIcon /> : <CancelIcon />}
      </Fab>
    </div>
  );
};

export default Chat;
