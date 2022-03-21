import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Badge } from "@mui/material";
import useMyFavorites from "../hooks/useMyFavorites";
import { Link } from "@mui/material";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";

const pages = ["About"];
const guestSettings = { Login: "/login", Favorites: "/favorites" };
const userSettings = {
  Profile: "/profile",
  Favorites: "/favorites",
  Logout: "/",
};

const NavBar = ({ displayMode }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { userContext, setUserContext } = useAuth();
  const [settings, setSettings] = useState(guestSettings);

  const favorites = useMyFavorites();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getFirstUsernameLetter = () => {
    if (!userContext.details) return;

    const username = userContext.details.username;
    return username[0].toUpperCase();
  };

  useEffect(() => {
    userContext.details
      ? setSettings(userSettings)
      : setSettings(guestSettings);
  }, [userContext.details]);

  const logoutHandler = () => {
    fetch(`${process.env.REACT_APP_AUTH_ENDPOINT}/users/logout`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      window.localStorage.setItem("logout", Date.now());
      window.location.reload();
    });
  };

  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "primary.dark", flexFlow: "row", alignItems: "center" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {" "}
          <LiveTvOutlinedIcon
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Movies Inspiration
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component={RouterLink}
                    to="about"
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Movies Inspiration
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Badge color="warning" badgeContent={favorites.length}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ width: 30, height: 30 }}>
                    {userContext.details ? getFirstUsernameLetter() : "G"}
                  </Avatar>
                </IconButton>
              </Badge>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {Object.keys(settings).map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    {setting !== "Logout" ? (
                      <Link
                        component={RouterLink}
                        to={settings[setting]}
                        underline="none"
                        color="inherit"
                      >
                        {setting}
                      </Link>
                    ) : (
                      <Link
                        onClick={logoutHandler}
                        underline="none"
                        color="inherit"
                      >
                        {setting}
                      </Link>
                    )}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {displayMode}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
