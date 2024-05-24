import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalIdRef.current);
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function stop() {
    setIsRunning(false);
  }

  function format() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let secs = Math.floor((elapsedTime / 1000) % 60);
    let mil = Math.floor((elapsedTime % 1000) / 10);
    hours = String(hours).padStart(2, "0");
    mins = String(mins).padStart(2, "0");
    secs = String(secs).padStart(2, "0");
    mil = String(mil).padStart(2, "0");
    return `${hours}:${mins}:${secs}:${mil}`;
  }

  return (
    <>
      <div className="stopwatch">
        <div className="display">{format()}</div>
        <div className="controls">
          <button onClick={start} className="start-button">
            Start
          </button>
          <button onClick={stop} className="stop-button">
            Stop
          </button>
          <button onClick={reset} className="reset-button">
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default Stopwatch;
