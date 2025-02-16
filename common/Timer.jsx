"use client";
import { useState, useEffect } from "react";

const CountdownTimer = ({ igain, page }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [end, SetEnd] = useState(false);

  useEffect(() => {
    const savedTime = localStorage.getItem("timeLeftCount");
    const now = Date.now();
    const savedTimestamp = localStorage.getItem("timestampcount");

    if (savedTime && savedTimestamp) {
      const timeElapsed = Math.floor(
        (now - parseInt(savedTimestamp, 10)) / 1000
      );
      const updatedTime = parseInt(savedTime, 10) - timeElapsed;
      if (updatedTime > 0) setTimeLeft(updatedTime);
      else {
        setTimeLeft(0);
        SetEnd(true);
      }
    } else {
      const initialTime = Math.floor(Math.random() * (7200 - 2700 + 1)) + 2700;
      setTimeLeft(initialTime);
      localStorage.setItem("timeLeftCount", initialTime);
      localStorage.setItem("timestampcount", now);
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          localStorage.removeItem("timeLeftCount");
          localStorage.removeItem("timestampcount");
          return 0;
        }
        localStorage.setItem("timeLeftCount", prevTime - 1);
        localStorage.setItem("timestampcount", Date.now());
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}:` : ""}${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {igain && !end && (
        <div
          className={` ${
            page
              ? "hidden lg:block text-xl mb-3"
              : "text-xs xsss:text-sm xss:text-base shadow-3xl bg-yellow-200 text-black h-8"
          } flex justify-center font-bold items-center gap-1 w-full`}
        >
          For Fastest Delivery, Order Within{" "}
          {timeLeft !== 0 && !end ? formatTime(timeLeft) : "HH:MM:SS"}
        </div>
      )}
    </>
  );
};

export default CountdownTimer;
