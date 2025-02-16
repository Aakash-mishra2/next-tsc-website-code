"use client";
import { hexToRGB } from "@/api/events";
import Image from "next/image";
import React, { useState } from "react";

function Icon({ id, open, theme, diseaseScreen, arrowColor, bgTheme }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      style={{
        backgroundColor: theme ? `#${theme}` : bgTheme && `#${bgTheme}`,
        color: `#${arrowColor}`,
      }}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} ${
        diseaseScreen
          ? "w-5 h-5"
          : "w-7 h-7 p-1 bg-green-500 text-white rounded-full"
      } h-5 w-5 duration-[400ms] transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

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

const Accordion = ({
  faqs,
  theme,
  newIcon,
  classes,
  bgTheme,
  answerType,
  arrowColor,
  diseaseScreen,
}) => {
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="my-5">
      {faqs &&
        faqs.length > 0 &&
        faqs.map((faq, idx) => {
          return (
            <div key={idx}>
              <div
                style={{
                  background: bgTheme ? `#${bgTheme}` : "",
                  borderBottom: `1px solid ${hexToRGB(
                    bgTheme ? bgTheme : theme,
                    bgTheme ? 1 : 0.25
                  )}`,
                }}
                className={`flex justify-between items-center gap-5 border-b-2 border-b-gray-200 cursor-none lg:cursor-pointer bg-white ${
                  classes ? classes : "p-2 xsss:p-3 xss:p-4"
                }`}
                onClick={() => handleOpen(idx + 1)}
              >
                <p
                  className={`${
                    diseaseScreen
                      ? "text-lg"
                      : "text-sm xsss:text-base xss:text-lg"
                  } text-left font-semibold`}
                >
                  {faq?.question}
                </p>
                <p className="min-w-[28px] xss:min-w-[40px]">
                  {newIcon ? (
                    <NewIcon id={idx + 1} theme={theme} open={open} />
                  ) : (
                    <Icon
                      id={idx + 1}
                      open={open}
                      theme={theme}
                      bgTheme={bgTheme}
                      arrowColor={arrowColor}
                      diseaseScreen={diseaseScreen}
                    />
                  )}
                </p>
              </div>
              <div
                style={{ background: `${hexToRGB(theme ?? bgTheme, 0.05)}` }}
                className={`bg-gray-100 ease-linear duration-200 ${
                  answerType === "image"
                    ? ""
                    : open === idx + 1 && "py-2 xsss:py-3 xss:py-4"
                } ${
                  open === idx + 1
                    ? "max-h-auto text-sm xss:text-base"
                    : "max-h-0 overflow-y-hidden"
                }`}
              >
                {answerType === "image" ? (
                  <picture>
                    <source media="(max-width: 524px)" srcSet={faq?.mob_img} />
                    <source media="(min-width: 525px)" srcSet={faq?.web_img} />
                    <Image
                      unoptimized
                      src={faq?.mob_img}
                      loading="lazy"
                      width={100}
                      height={100}
                      alt="banner Image"
                      className="w-full object-contain"
                    />
                  </picture>
                ) : (
                  <div
                    className={`${
                      bgTheme ? "" : "text-gray-700"
                    } px-2 xsss:px-3 xss:px-4 text-xs xss:text-sm`}
                    dangerouslySetInnerHTML={{
                      __html: `${faq.description}`,
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
 
    </div>  
  );
};
export default Accordion;
