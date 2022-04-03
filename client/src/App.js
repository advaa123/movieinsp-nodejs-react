import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StylesProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import "./App.css";
import { ColorModeContext } from "./context/ColorModeContext";
import { socket, SocketContext } from "./context/socket";
import AppRoutes from "./AppRoutes";
import { getDesignTokens } from "./utils/theme";
import useAuth from "./hooks/useAuth";
import useRefreshToken from "./hooks/useRefreshToken";
import Loader from "./components/Loader/Loader";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import useFetchUserDetails from "./hooks/useFetchUserDetails";
import useLoading from "./hooks/useLoading";
import useUserMode from "./hooks/useUserMode";

// setLogger({
//   log: () => {},
//   warn: () => {},
//   error: () => {},
// });

const queryClient = new QueryClient();

export default function App() {
  const { userContext, setUserContext } = useAuth();
  const { colorMode, mode } = useUserMode();
  const darkModeTheme = createTheme(getDesignTokens(mode));
  const verifyUser = useRefreshToken();
  const { isLoading, setIsLoading } = useLoading();
  const fetchUserDetails = useFetchUserDetails(
    setIsLoading,
    setUserContext,
    userContext
  );

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  useEffect(() => {
    if (userContext.token && !userContext.details) {
      fetchUserDetails();
    } else if (userContext.token && userContext.details) {
      setIsLoading(false);
    } else if (!localStorage.getItem("refreshToken")) {
      setIsLoading(false);
    }
  }, [userContext, setIsLoading, fetchUserDetails]);

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
