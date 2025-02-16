import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const CustomThumbs = ({containerWidth, visibleWidth, scrollPosition, onScroll}) => {
  const [thumbWidth, setThumbWidth] = useState(0);
  const trackRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const trackWidth = trackRef.current.offsetWidth;
    const ratio = visibleWidth / containerWidth;
    const width = Math.max(20, trackWidth * ratio);
    setThumbWidth(width);
  }, [containerWidth, visibleWidth]);

  const handleMouseDown = (e) => {
    const offsetX = e.clientX - thumbRef.current.getBoundingClientRect().left;
    const position = (offsetX / trackRef.current.offsetWidth) * containerWidth;
    onScroll(position);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const offsetX =
      e.clientX -
      thumbRef.current.offsetWidth / 2 -
      trackRef.current.getBoundingClientRect().left;
    const position = (offsetX / trackRef.current.offsetWidth) * containerWidth;
    onScroll(position);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div ref={trackRef} className="h-4 bg-gray-300 rounded-full relative md:hidden">
      <div
        ref={thumbRef}
        className="top-0 bottom-0 h-full bg-red-400 absolute rounded-full"
        style={{
          width: `${thumbWidth}px`,
          left: `${(scrollPosition / containerWidth) * 100}%`,
        }}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};

export default CustomThumbs;
