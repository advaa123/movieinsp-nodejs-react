import { useCallback } from "react";

const useFetchUserDetails = (setIsLoading, setUserContext, userContext) => {
  const fetchUserDetails = useCallback(async () => {
    setIsLoading(true);
    return fetch(`${process.env.REACT_APP_AUTH_ENDPOINT}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          setUserContext((oldValues) => {
            return { ...oldValues, details: data };
          });
          setIsLoading(false);
        } else {
          if (response.status === 401) {
            setIsLoading(false);
            // Edge case: when the token has expired.
            // This could happen if the refreshToken calls have failed due to network error or
            // User has had the tab open from previous day and tries to click on the Fetch button
          } else {
            setUserContext((oldValues) => {
              return { ...oldValues, details: null };
            });
            setIsLoading(false);
          }
        }
      })
      .then(() => setIsLoading(false));
  }, [setUserContext, userContext, setIsLoading]);
  
  return fetchUserDetails;
};

export default useFetchUserDetails;
