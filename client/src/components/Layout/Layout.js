import React, { createContext, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Footer from "../Footer/Footer";
import Jumbo from "../Jumbo/Jumbo";
import ActiveTab from "../ActiveTab/ActiveTab";
import NavBar from "../NavBar/NavBar";
import Chat from "../Chat/Chat";
import { Outlet, useLocation } from "react-router-dom";
import TrendingMovies from "../Movies/TrendingMovies";
import GoBack from "../GoBack/GoBack";
import Scroll from "../Scroll/Scroll";

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
        {location.pathname !== "/profile" && location.pathname !== "/about" ? (
          <>
            <TrendingMovies />
            <ActiveTab />
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
