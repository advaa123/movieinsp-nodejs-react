import React, { useState, useEffect } from "react";

import {
  Button,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";

import {
  LockOutlined,
  Visibility,
  VisibilityOff,
  AccountCircle,
} from "@mui/icons-material";

import { pink, grey } from "@mui/material/colors";
import { Navigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { formSubmitHandler, demoSubmitHandler } from "./utils";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingDemo, setIsSubmittingDemo] = useState(false);
  const [error, setError] = useState("");
  const { userContext } = useAuth();
  const [captureTry, setCaptureTry] = useState({ email: "", password: "" });
  const [values, setValues] = useState({
    amount: "",
    password: "",
    email: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (isSubmitting) {
      if (values.email !== captureTry.email) {
        setCaptureTry({ email: values.email, password: values.password });
      }
    }
  }, [isSubmitting]);

  return (
    <>
      {!userContext.token ? (
        <>
          <Box sx={{ mt: 3, mb: 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexFlow: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: pink[500] }}>
                <LockOutlined />
              </Avatar>
            </div>
          </Box>
          <Box
            sx={{
              borderRadius: 5,
              p: 3,
              bgcolor: "primary.chat",
              m: 2,
              display: "flex",
              flexFlow: "column",
              width: 350,
            }}
          >
            <FormControl variant="standard" sx={{ mb: 2 }}>
              <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
              <Input
                required
                id="input-with-icon-adornment"
                error={error.length > 0}
                value={values.email}
                type="email"
                onChange={handleChange("email")}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                required
                id="standard-adornment-password"
                error={error.length > 0}
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {error.length ? (
              <Button
                variant="outlined"
                color="error"
                sx={{ textTransform: "initial", mt: 2 }}
              >
                {error}
              </Button>
            ) : (
              ""
            )}

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={(e) =>
                formSubmitHandler(
                  e,
                  values,
                  setError,
                  setIsSubmitting,
                  captureTry
                )
              }
              disabled={isSubmitting || isSubmittingDemo}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              color="error"
              onClick={(e) =>
                demoSubmitHandler(e, values, setError, setIsSubmittingDemo)
              }
              disabled={isSubmittingDemo}
            >
              {isSubmittingDemo ? "Signing in..." : "Demo sign in"}
            </Button>
            <Button
              component={Link}
              to="/register"
              size="small"
              sx={{ textTransform: "initial", mt: 1, color: grey[500] }}
            >
              Don't have an account?
            </Button>
            <Button
              size="small"
              sx={{ textTransform: "initial", m: 0, color: grey[600] }}
            >
              Forgot password?
            </Button>
          </Box>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Login;
