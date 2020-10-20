import React, { useEffect, useState } from "react";

import "../styles/components/slider-timer.css";

interface ProgressionTimerProps {
  start: boolean;
  duration: number;
  onTimeIsOver: Function;
  onStart?: Function;
}

export default function ProgressionTimer(props: ProgressionTimerProps) {
  const fullTime = props.duration;
  const percentageToRemovePeriodic = fullTime * 0.2;
  const [currentTime, setCurrentTime] = useState(fullTime);
  const [intervalTimeout, setIntervalTimeout] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (props.start) {
      document.querySelector(".current-time")?.classList.remove("time-is-over");

      setIntervalTimeout(
        setInterval(() => {
          setCurrentTime((currentTime) => currentTime - percentageToRemovePeriodic);
        }, percentageToRemovePeriodic * 1000)
      );

      setCurrentTime(fullTime);
    }
  }, [props]);

  useEffect(() => {
    // On countdown is finish, remove the setInterval and dispatch
    // onTimeIsOver from father
    if (currentTime <= 0 - percentageToRemovePeriodic) {
      clearInterval(timeOutToID(intervalTimeout));

      props.onTimeIsOver();
      document.querySelector(".current-time")?.classList.add("time-is-over");
    }
  }, [currentTime]!);

  // On components re render, remove the current setInterval
  useEffect(() => {
    return () => clearInterval(timeOutToID(intervalTimeout));
  }, [intervalTimeout]);

  function timeOutToID(timeOut: NodeJS.Timeout | undefined): number {
    return parseInt(`${timeOut}`);
  }

  return (
    <div className="slider-timer">
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
