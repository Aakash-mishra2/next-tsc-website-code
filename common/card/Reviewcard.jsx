"use client";

import { useState } from "react";
import ProgressBarWithStars from "../custom/ProgressBarWithStars";
import SingleReviewModal from "@/components/modals/SingleReviewModal";

function generateRandomColorCode() {
  while (true) {
    // Generate random values for RGB components
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Check if the generated color code is not white (#FFFFFF)
    if (!(red === 255 && green === 255 && blue === 255)) {
      // Create the color code in the format #RRGGBB
      const colorCode =
        "#" + red.toString(16) + green.toString(16) + blue.toString(16);
      return colorCode;
    }
  }
}

const Reviewcard = ({ product, isReviewPage }) => {
  const colorCode = generateRandomColorCode();

  const date = new Date(product?.date);
  const [reviewModal, showReviewModal] = useState(false);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleString("en-US", options);

  // const showModal = () => showReviewModal(!reviewModal);
  const handleClose = () => showReviewModal(!reviewModal);
  const updated_owner = product?.review_owner.trim();
  const review_owner = updated_owner[0].toUpperCase() + updated_owner.slice(1);
  return (
    <div
      // onClick={isReviewPage && showModal}
      style={{
        boxShadow: isReviewPage && "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
      className={`${
        isReviewPage ? "rounded-lg" : "my-5 border border-blue-100 rounded"
      } p-2 xsss:p-3 xss:p-4 cursor-none lg:cursor-pointer`}
    >
      <SingleReviewModal
        data={product}
        reviewModal={reviewModal}
        handleClose={handleClose}
        showReviewModal={showReviewModal}
      />
      <div className="flex gap-3 items-center">
        <div
          style={{
            backgroundColor:
              colorCode.length < 7 ? `${colorCode}F` : `${colorCode}`,
          }}
          className="w-12 xsss:w-16 xss:w-20 rounded-full aspect-square text-white flex justify-center items-center text-xl xsss:text-2xl xss:text-4xl"
        >
          {review_owner[0] && review_owner[0].toUpperCase()}
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="flex justify-start gap-3 items-center">
            <h2 className="text-md font-semibold">{review_owner}</h2>
            {product?.verified && (
              <p className="bg-slate-500 text-white rounded-full px-2 py-1 w-fit text-center font-bold text-xs">
                VERIFIED
              </p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <ProgressBarWithStars
              iconSize={typeof window !== "undefined" && (window?.innerWidth < 320 ? 15 : 25)}
              noOfStar={product?.rating ?? 5}
            />
            <p className="text-[8px] xss:text-sm text-gray-500">
              {product?.date && formattedDate}
            </p>
          </div>
        </div>
      </div>
      <div className={`${isReviewPage ? "h-auto" : "min-h-[13rem]"}`}>
        {product?.review_title && (
          <h2 className="text-lg xsss:text-xl xss:text-2xl font-semibold py-2">
            {product?.review_title}
          </h2>
        )}
        <p
          className={`text-xss xsss:text-xs xss:text-sm ${
            !product?.review_title && "mt-2"
          }`}
        >
          {product?.review_description.trim()}
        </p>
      </div>
    </div>
  );
};

export default Reviewcard;
