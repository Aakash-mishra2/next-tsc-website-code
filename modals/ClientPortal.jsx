"use client";

import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";

const Portal = ({ children, targetSelector }) => {
  const portalRoot = useRef(document.createElement("div"));

  useEffect(() => {
    const target = document.querySelector(targetSelector);
    target.appendChild(portalRoot.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      target.removeChild(portalRoot.current);
    };
  }, [targetSelector]);

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      {children}
    </div>,
    portalRoot.current
  );
};

export default Portal;
