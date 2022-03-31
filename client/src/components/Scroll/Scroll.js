import React, { useEffect, useState } from "react";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Fab, IconButton } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Scroll = ({ showBelow }) => {
  const [visible, setVisible] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.scrollY > showBelow) {
      if (!visible) setVisible(true);
    } else {
      if (visible) setVisible(false);
    }
  };

  const handleClick = (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  });

  return (
    <div>
      <Fab
        onClick={handleClick}
        aria-label="add"
        style={{
          position: "fixed",
          bottom: "4%",
          right: "10.5%",
          zIndex: 2,
          transition: "all 0.3s",
          opacity: visible ? 0.5 : 0,
          cursor: !visible && "default",
        }}
        size="small"
      >
        <ExpandLessIcon />
      </Fab>
    </div>
  );
};

export default Scroll;
