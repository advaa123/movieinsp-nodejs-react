import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

const useFavoritesContext = () => {
  return useContext(FavoritesContext);
};

export default useFavoritesContext;
