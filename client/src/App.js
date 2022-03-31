import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StylesProvider } from '@material-ui/core/styles';
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import "./App.css";
import { ColorModeContext } from "./components/Layout/Layout";
import { socket, SocketContext } from "./context/socket";
import AppRoutes from "./AppRoutes";
import { getDesignTokens } from "./utils/theme";
import useAuth from "./hooks/useAuth";
import useRefreshToken from "./hooks/useRefreshToken";
import Loader from "./components/Loader/Loader";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";

setLogger({
  log: () => {},
  warn: () => {},
  error: () => {},
});

const queryClient = new QueryClient();

export default function App() {
  const { userContext, setUserContext } = useAuth();
  const userMode = localStorage.getItem("mode") || "dark";
  const verifyUser = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  const fetchUserDetails = useCallback(() => {
    fetch(`${process.env.REACT_APP_AUTH_ENDPOINT}/users/me`, {
      method: "GET",
      credentials: "include",
      // Pass authentication token as bearer token in header
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, details: data };
        });
      } else {
        if (response.status === 401) {
          // Edge case: when the token has expired.
          // This could happen if the refreshToken calls have failed due to network error or
          // User has had the tab open from previous day and tries to click on the Fetch button
        } else {
          setUserContext((oldValues) => {
            return { ...oldValues, details: null };
          });
        }
      }
    });
  }, [userContext.token]);

  useEffect(() => {
    // fetch only when user details are not present
    if (userContext.token && !userContext.details) {
      fetchUserDetails();
    }
  }, [userContext.details, fetchUserDetails]);

  // useEffect(() => {
  //   setIsLoading(false);
  // }, [userContext.details]);

  // const syncLogout = useCallback((event) => {
  //   if (event.key === "logout") {
  //     window.location.reload();
  //   }
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("storage", syncLogout);
  //   return () => {
  //     window.removeEventListener("storage", syncLogout);
  //   };
  // }, [syncLogout]);

  const [mode, setMode] = useState(userMode);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const darkModeTheme = createTheme(getDesignTokens(mode));

  return (
    <SocketContext.Provider value={socket}>
      <QueryClientProvider client={queryClient}>
      <StylesProvider injectFirst>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={darkModeTheme}>
            <CssBaseline />
            {isLoading ? <Loader /> : <AppRoutes />}
          </ThemeProvider>
        </ColorModeContext.Provider>
        </StylesProvider>
      </QueryClientProvider>
    </SocketContext.Provider>
  );
}
