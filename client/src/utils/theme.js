import { grey } from "@mui/material/colors";

export const getDesignTokens = (mode) => ({
    palette: {
      mode,
      primary: {
        ...(mode === "dark" && {
          main: "#2D2D2D",
          light: grey[600],
          dark: grey[900],
          chat: "#1b1b1b",
          user: "#303030",
        }),
        ...(mode === "light" && {
          main: "#37474f",
          light: "#62727b",
          dark: "#102027",
          chat: "#eeeeee",
          user: "#37474f",
        }),
      },
      secondary: {
        ...(mode === "dark" && {
          main: "#ffa726",
          light: "#ffd95b",
          dark: "#c77800",
        }),
        ...(mode === "light" && {
          main: "#ffa726",
          light: "#ffd95b",
          dark: "#c77800",
        }),
      },
    },
  });