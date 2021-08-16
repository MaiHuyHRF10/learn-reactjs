import { useEffect, useState } from "react";

function formatTime(date) {
  const hour = `0${date.getHours()}`.slice(-2);

  const minute = `0${date.getMinutes()}`.slice(-2);
  const second = `0${date.getSeconds()}`.slice(-2);

  return `${hour}:${minute}:${second}`;
}

function useClock(props) {
  const [timeString, setTimeString] = useState("");
  useEffect(() => {
    const clockInterval = setInterval(() => {
      const now = new Date();
      const newTime = formatTime(now);
      setTimeString(newTime);
    }, 1000);

    return () => {
      clearInterval(clockInterval);
    };
  }, []);
  return { timeString };
}

export default useClock;
