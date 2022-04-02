import { useState, useEffect, useMemo } from "react";

const useUserMode = () => {
  const userMode = localStorage.getItem("mode") || "dark";
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

  return { colorMode, mode };
};

export default useUserMode;
