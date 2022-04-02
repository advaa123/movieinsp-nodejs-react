import React from "react";
import Box from "@mui/material/Box";
import { Footer } from "../Footer";
import { Jumbo } from "../Jumbo";
import { ActiveTab } from "../ActiveTab";
import { NavBar } from "../NavBar";
import { Chat } from "../Chat";
import { Outlet, useLocation } from "react-router-dom";
import { TrendingMovies } from "../Movies";
import { GoBack } from "../GoBack";
import { Scroll } from "../Scroll";

function Layout() {
  const location = useLocation();

  return (
    <React.Fragment>
      <NavBar />
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
