"use client";
import { hexToRGB } from "@/api/events";
import { useResize } from "@/api/hooks";
import { useState, useEffect, useRef } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

/**
 * @param {boolean} loop - {Boolean}
 * @param {string} theme - {Hexcode without `#`}
 * @param {Array} children - {Array}
 * @param {boolean} autoplay - {Boolean}
 * @param {boolean} pagination - {Boolean}
 * @param {boolean} navigation - {Boolean}
 * @param {Array} breakPoints - {Array} For ex :- [{size: screen_width , slides: number_of_slides_per_view}]
 * @param {string} device_width - {Width of child as per device_width} For ex :- "w-full", "w-1/2" etc...
 * @param {number} device_slides - {Number of slides as per device_width} For ex :- 1 , 3 etc...
 * @param {string} paginationTheme - {Hexcode without `#` for pagination dots}
 * */
const Swiper = ({
  loop,
  theme,
  children,
  autoplay,
  pagination,
  breakPoints,
  device_width,
  device_slides,
  paginationTheme,
  navigation = true,
}) => {
  const width = useResize();
  const sliderRef = useRef(null);

  const [touchEndX, setTouchEndX] = useState(null);
  const [child, setMoreChild] = useState(children);
  const [intervalId, setIntervalId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const [divwidth, setDivWidth] = useState(device_width ?? "w-full");
  const [slidesPerView, setSlidesPerView] = useState(device_slides ?? 1);

  const getWidth = (slidesPerView) => {
    switch (slidesPerView) {
      case 1:
        return "w-full";
      case 1.5:
        return "w-3/4";
      case 2:
        return "w-1/2";
      case 3:
        return "w-1/3";
      case 4:
        return "w-1/4";
    }
  };

  const getMoreChild = (slidesPerView) => {
    const len = children.length;
    const numberOfViews = Math.ceil(len / slidesPerView);
    const addedSlides = numberOfViews * slidesPerView - len;
    if (addedSlides > 0)
      setMoreChild([...children, ...children.slice(0, addedSlides)]);
    else setMoreChild(children);
  };

  useEffect(() => {
    const handleWindowSizeChange = () => {
      let slidesPerView = 1;
      breakPoints.forEach((breakPoint) => {
        if (width >= breakPoint.size) slidesPerView = breakPoint.slides;
        setSlidesPerView(slidesPerView);
        getMoreChild(slidesPerView);
        setDivWidth(getWidth(slidesPerView));
      });
    };
    if (breakPoints) handleWindowSizeChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, breakPoints]);

  useEffect(() => {
    if (autoplay) {
      const id = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (loop) {
            if (prevIndex + slidesPerView >= children.length) return 0;
            else return prevIndex + slidesPerView;
          } else {
            return Math.min(prevIndex + slidesPerView, children.length - 1);
          }
        });
      }, 5000); // Change autoplay interval as needed
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [autoplay, children.length, slidesPerView, loop]);

  const handlePrev = () => {
    clearInterval(intervalId); // Clear autoplay interval
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? loop
          ? children.length - 1
          : 0
        : prevIndex - slidesPerView
    );
  };

  const handleNext = () => {
    clearInterval(intervalId); // Clear autoplay interval
    setCurrentIndex((prevIndex) => {
      if (loop) {
        if (prevIndex + slidesPerView >= children.length) return 0;
        else return prevIndex + slidesPerView;
      } else {
        return Math.min(prevIndex + slidesPerView, children.length - 1);
      }
    });
  };

  const handleTouchStart = (e) => {
    clearInterval(intervalId); // Clear autoplay interval
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    clearInterval(intervalId); // Clear autoplay interval
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    clearInterval(intervalId); // Clear autoplay interval
    if (touchStartX - touchEndX > 50) {
      handleNext();
    } else if (touchEndX - touchStartX > 50) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleMouseDown = (e) => {
    clearInterval(intervalId); // Clear autoplay interval
    setTouchStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    clearInterval(intervalId); // Clear autoplay interval
    setTouchEndX(e.clientX);
  };

  const handleMouseUp = () => {
    clearInterval(intervalId); // Clear autoplay interval
    if (touchStartX - touchEndX > 50) {
      handleNext();
    } else if (touchEndX - touchStartX > 50) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handlePaginationClick = (index) => {
    setCurrentIndex(index);
  };

  const renderPaginationDots = () => {
    return (
      <div className="flex justify-center relative bottom-5" ref={sliderRef}>
        {Array.from({ length: Math.ceil(children.length / slidesPerView) }).map(
          (_, index) => (
            <span
              key={index}
              style={{
                backgroundColor:
                  currentIndex === index * slidesPerView
                    ? `${hexToRGB(paginationTheme ?? "000000", 0.75)}`
                    : `${hexToRGB("D1D5DB", 0.75)}`,
              }}
              onClick={() => handlePaginationClick(index * slidesPerView)}
              className="mx-1 w-2 h-2 rounded-full cursor-pointer"
            ></span>
          )
        )}
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden cursor-none lg:cursor-pointer">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${
            currentIndex * parseInt(100 / slidesPerView)
          }%)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {child.map((slide, index) => (
          <div
            key={index}
            className={`${divwidth} ${
              slidesPerView === 3 && (index + 1) % 3 === 0
                ? "md:pr-3 lg:pr-5"
                : (index === 0 || index === child.length - 1) &&
                  slidesPerView === 3 &&
                  "md:pl-3 lg:pl-5"
            } h-full flex-shrink-0`}
          >
            {slide}
          </div>
        ))}
      </div>
      {pagination && renderPaginationDots()}
      {navigation && (
        <>
          <button
            aria-label="prev-button"
            className="absolute top-1/2 transform -translate-y-1/2 left-2 bg-black p-2 rounded-lg bg-opacity-20 backdrop-blur-xl cursor-none lg:cursor-pointer"
            onClick={handlePrev}
          >
            <MdOutlineArrowBackIos
              size={25}
              color={`${hexToRGB(theme ?? "000000", 0.75)}`}
            />
          </button>
          <button
            aria-label="next-button"
            className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-black p-2 rounded-lg bg-opacity-20 backdrop-blur-xl cursor-none lg:cursor-pointer"
            onClick={handleNext}
          >
            <MdOutlineArrowForwardIos
              size={25}
              color={`${hexToRGB(theme ?? "000000", 0.75)}`}
            />
          </button>
        </>
      )}
    </div>
  );
};

export default Swiper;
