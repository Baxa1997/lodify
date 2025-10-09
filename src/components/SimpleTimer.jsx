import React, {useState, useEffect} from "react";
import {Box, Text} from "@chakra-ui/react";

const SimpleTimer = ({
  timeFromAPI = 0,
  onTimeUp = () => {},
  className = "",
  style = {},
}) => {
  const [timeLeft, setTimeLeft] = useState(timeFromAPI);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    setTimeLeft(timeFromAPI);
    setIsRunning(true);
  }, [timeFromAPI]);

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;

          if (newTime <= 0) {
            setIsRunning(false);
            onTimeUp();
            return 0;
          }

          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getTextColor = (time) => {
    if (time > 3600) return "black";
    if (time > 1800) return "black";
    if (time > 900) return "#EA580C";
    return "#DC2626";
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="40px"
      minWidth="80px"
      px={0}
      py={2}
      borderRadius="md"
      transition="all 0.3s ease"
      className={className}
      style={style}>
      <Text
        fontSize="14px"
        fontWeight="600"
        color={getTextColor(timeLeft)}
        fontFamily="mono">
        {formatTime(timeLeft)}
      </Text>
    </Box>
  );
};

export default SimpleTimer;
