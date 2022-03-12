import React, { createContext, useState } from "react";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [userContext, setUserContext] = useState({});

  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
