"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider({ children }) {
  return (
    <>
      <ToastContainer
        draggable
        pauseOnHover
        position="top-center"
        autoClose={2000}
        // hideProgressBar={false}
        newestOnTop={true}
        rtl={false}
        theme="dark"
      />
      {children}
    </>
  );
}
