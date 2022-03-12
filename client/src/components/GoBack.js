import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const GoBack = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <IconButton color="primary" aria-label="go back" onClick={goBack}>
      <ArrowBack />
    </IconButton>
  );
};

export default GoBack;
