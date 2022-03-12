import useAuth from "./useAuth";

import { useCallback } from "react";

const useRefreshToken = () => {
  const { setUserContext } = useAuth();

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          console.log(oldValues, data.token);
          return { ...oldValues, token: data.token };
        });
      } else {
        setUserContext((oldValues) => {
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
