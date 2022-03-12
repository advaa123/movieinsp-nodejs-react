import React, { createContext, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Footer from "./Footer";
import Jumbo from "./Jumbo";
import Main from "./Main";
import NavBar from "./NavBar";
import Chat from "./Chat";
import { Outlet } from "react-router-dom";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

function Layout() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const displayMode = (
    <div>
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </div>
  );

  return (
    <React.Fragment>
      <NavBar displayMode={displayMode} />
      <Jumbo />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          flexFlow: "column",
          p: 3,
        }}
      >
        <Main />
        <Outlet />
        <Chat />
      </Box>
      <Footer />
    </React.Fragment>
  );
}

export default Layout;
