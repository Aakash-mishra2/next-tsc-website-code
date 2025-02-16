"use client";
import React, { useState } from "react";
import Link from "next/link";
import { hexToRGB } from "@/api/events";
import { IoIosArrowForward } from "react-icons/io";

function NewIcon({ id, open, theme }) {
  return (
    <>
      {id === open ? (
        <svg
          style={{ color: `#${theme}` }}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 448 512"
          height="1em"
          width="1em"
          className={`${
            id === open ? "rotate-180" : ""
          } h-5 w-5 transition-transform ease-linear duration-300`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path>
        </svg>
      ) : (
        <svg
          style={{ color: `#${theme}` }}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 448 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            id === open ? "rotate-180" : ""
          } h-5 w-5 transition-transform ease-linear duration-300`}
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
        </svg>
      )}
    </>
  );
}

const FooterAccordion = ({
  faqs,
  theme,
  diseaseScreen,
  arrowColor,
  bgTheme,
}) => {
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <div className="my-5">
      {faqs.map((faq, idx) => {
        return (
          <div key={idx}>
            <div
              style={{
                background: bgTheme ? `#${bgTheme}` : "",
              }}
              className="flex justify-between items-center gap-5 border-b-2 border-b-black cursor-none lg:cursor-pointer p-4 bg-white"
              onClick={() => handleOpen(idx + 1)}
            >
              <p
                className={`${
                  diseaseScreen ? "text-lg" : "text-lg"
                } text-left font-semibold`}
              >
                {faq?.question}
              </p>
              <p className="min-w-[40px]">
                <NewIcon id={idx + 1} theme={theme} open={open} />
              </p>
            </div>
            <div
              style={{ background: `${hexToRGB(theme ?? bgTheme, 0.05)}` }}
              className={`bg-gray-100 ease-linear duration-200 ${
                open === idx + 1
                  ? "max-h-auto py-4"
                  : "max-h-0 overflow-y-hidden"
              }`}
            >
              <div className={`${bgTheme ? "" : "text-gray-700"} px-4`}>
                <ul className="">
                  {faq.description.map((item, idx) => (
                    <li key={idx} className="">
                      <Link
                        href={item.url}
                        aria-label={item.title}
                        className="flex justify-between"
                        target={item?.target ? "_blank" : "_self"}
                      >
                        <span> {item.title} </span>
                        <span>
                          <IoIosArrowForward />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FooterAccordion;
