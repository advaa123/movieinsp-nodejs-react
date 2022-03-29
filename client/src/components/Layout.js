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
import { Outlet, useLocation } from "react-router-dom";
import TrendingMovies from "./TrendingMovies";
import GoBack from "./GoBack";
import Scroll from "./Scroll";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

function Layout() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const location = useLocation();

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
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          flexFlow: "column",
          overflow: "hidden",
        }}
      >
        {location.pathname !== "/profile" ? (
          <>
            <TrendingMovies />
            <Main />
          </>
        ) : (
          <GoBack />
        )}

        <Outlet />
        <Chat />
        <Scroll showBelow={400} />
      </Box>

      <Footer />
    </React.Fragment>
  );
}

export default Layout;
