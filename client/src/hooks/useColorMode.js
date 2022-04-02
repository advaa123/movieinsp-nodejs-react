import { useContext } from "react";
import { ColorModeContext } from "../context/ColorModeContext";

const useColorMode = () => {
  return useContext(ColorModeContext);
};

export default useColorMode;
