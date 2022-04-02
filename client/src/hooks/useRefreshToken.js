import useAuth from "./useAuth";

import { useCallback } from "react";

const useRefreshToken = () => {
  const { setUserContext } = useAuth();

  const verifyUser = useCallback(() => {
    fetch(`${process.env.REACT_APP_AUTH_ENDPOINT}/users/refreshToken`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken: localStorage.getItem("refreshToken"),
      }),
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          localStorage.setItem("refreshToken", data.refreshToken);
          return { ...oldValues, token: data.token };
        });
      } else {
        setUserContext((oldValues) => {
          localStorage.removeItem("refreshToken");
          return { ...oldValues, token: null };
        });
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000);
    });
  }, [setUserContext]);

  return verifyUser;
};

export default useRefreshToken;
