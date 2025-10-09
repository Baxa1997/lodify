import {useState, useEffect, useCallback} from "react";

const useCountdownTimer = (apiTime = 0, autoStart = true) => {
  const [timeLeft, setTimeLeft] = useState(apiTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [lastApiTime, setLastApiTime] = useState(apiTime);

  // Update timer when API time changes
  useEffect(() => {
    if (apiTime !== lastApiTime) {
      setTimeLeft(apiTime);
      setLastApiTime(apiTime);
      setIsRunning(autoStart);
    }
  }, [apiTime, lastApiTime, autoStart]);

  // Start timer
  const startTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  // Stop timer
  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Reset timer with new time
  const resetTimer = useCallback(
    (newTime) => {
      setTimeLeft(newTime);
      setLastApiTime(newTime);
      setIsRunning(autoStart);
    },
    [autoStart]
  );

  // Update time left (called by timer component)
  const updateTimeLeft = useCallback((newTime) => {
    setTimeLeft(newTime);
  }, []);

  return {
    timeLeft,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
    updateTimeLeft,
  };
};

export default useCountdownTimer;
