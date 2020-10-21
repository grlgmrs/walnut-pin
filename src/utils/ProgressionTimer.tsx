import React, { useEffect, useState } from "react";

import "../styles/utils/progression-timer.css";

interface ProgressionTimerProps {
  timeIsOver: boolean;
  duration: number;
  onTimeIsOver: Function;
  className?: string;
}

export default function ProgressionTimer(props: ProgressionTimerProps) {
  const fullTime = props.duration;
  const percentageToRemovePeriodic = fullTime * 0.2;
  const [currentTime, setCurrentTime] = useState(fullTime);
  const [intervalTimeout, setIntervalTimeout] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (!props.timeIsOver) {
      document.querySelector(".current-time")?.classList.remove("game-over");

      setIntervalTimeout(
        setInterval(() => {
          setCurrentTime((currentTime) => currentTime - percentageToRemovePeriodic);
        }, percentageToRemovePeriodic * 1000)
      );

      setCurrentTime(fullTime);
    } else {
      document.querySelector(".current-time")?.classList.add("game-over");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useEffect(() => {
    // On countdown is finish, remove the setInterval and dispatch
    // onTimeIsOver from father
    if (currentTime <= 0 - percentageToRemovePeriodic) {
      clearInterval(timeOutToID(intervalTimeout));

      props.onTimeIsOver();
      document.querySelector(".current-time")?.classList.add("game-over");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  // On components re render, remove the current setInterval
  useEffect(() => {
    return () => clearInterval(timeOutToID(intervalTimeout));
  }, [intervalTimeout]);

  function timeOutToID(timeOut: NodeJS.Timeout | undefined): number {
    return parseInt(`${timeOut}`);
  }

  return (
    <div className={`progression-timer ${props.className}`}>
      <div
        className="current-time"
        style={{
          width: `${(currentTime / fullTime) * 100}%`,
          transitionDuration: `${percentageToRemovePeriodic}s`,
        }}
      />
    </div>
  );
}
