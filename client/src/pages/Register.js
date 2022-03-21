import React, { useState, useContext } from "react";

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

import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";

import { pink, grey } from "@mui/material/colors";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { userContext, setUserContext } = useContext(UserContext);
  const [values, setValues] = useState({
    amount: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
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

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const genericErrorMessage = "Something went wrong! Please try again later.";

    if (
      !values.email ||
      !values.password ||
      !values.firstName ||
      !values.lastName
    ) {
      setError("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    fetch(`${process.env.REACT_APP_AUTH_ENDPOINT}/users/signup`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.email,
        password: values.password,
      }),
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!");
          } else if (response.status === 401) {
            setError("Invalid email and password combination.");
          } else if (response.status === 500) {
            const data = await response.json();
            if (data.message) setError(data.message || genericErrorMessage);
          } else {
            setError(genericErrorMessage);
          }
        } else {
          const data = await response.json();
          setUserContext((oldValues) => {
            return { ...oldValues, token: data.token };
          });
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(genericErrorMessage);
      });
  };

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
              //   boxShadow:
              //     "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
              //   color: "rgba(0, 0, 0, 0.87)",
            }}
          >
            <FormControl variant="standard" sx={{ mb: 2 }}>
              <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
              <Input
                required
                id="input-with-icon-adornment1"
                error={error.length > 0}
                value={values.email}
                type="email"
                onChange={handleChange("email")}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard" sx={{ mb: 2 }}>
              <InputLabel htmlFor="input-with-icon-adornment">
                First Name
              </InputLabel>
              <Input
                required
                id="input-with-icon-adornment2"
                error={error.length > 0}
                value={values.firstName}
                type="text"
                onChange={handleChange("firstName")}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard" sx={{ mb: 2 }}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Last Name
              </InputLabel>
              <Input
                required
                id="input-with-icon-adornment3"
                error={error.length > 0}
                value={values.lastName}
                type="text"
                onChange={handleChange("lastName")}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
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
              onClick={formSubmitHandler}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
            <Button
              component={Link}
              to="/login"
              size="small"
              sx={{ textTransform: "initial", mt: 1, color: grey[500] }}
            >
              Already have an account?
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
        <Navigate to="/profile" />
      )}
    </>
  );
};

export default Register;
