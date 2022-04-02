import { useState, useEffect } from "react";

const useChatTime = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  }, []);

  return time;
};

export default useChatTime;
