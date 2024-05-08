import { useEffect, useState } from "react";

export const useCountDown = (time: number) => {
  const [secondsLeft, setSecondsLeft] = useState(time);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setIsFinished(true);
      return;
    }

    if (isStarted) {
      const timeout = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [secondsLeft, isStarted]);

  const start = () => {
    setIsFinished(false);
    setIsStarted(true);
  };

  const restart = () => {
    setIsFinished(false);
    setIsStarted(false);
    setSecondsLeft(time);
  };

  return { secondsLeft, isFinished, start, restart, isStarted };
};
