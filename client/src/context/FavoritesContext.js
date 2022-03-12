import React, { createContext, useState } from "react";

const FavoritesContext = createContext([]);

const FavoritesProvider = ({ children }) => {
  const [favoritesContext, setFavoritesContext] = useState([]);

  return (
    <FavoritesContext.Provider value={{ favoritesContext, setFavoritesContext }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext, FavoritesProvider };
