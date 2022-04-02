import React, { createContext, useState } from "react";

const LoadingContext = createContext([]);

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
