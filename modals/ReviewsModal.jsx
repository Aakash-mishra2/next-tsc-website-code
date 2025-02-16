"use client";

import { useEffect } from "react";
import { VscChromeClose } from "react-icons/vsc";
import Reviewcard from "../common/card/Reviewcard";
import CommonModal from "../common/custom/CommonModal";

const ReviewsModal = ({ handleClose, openModal, reviews }) => {
  useEffect(() => {
    if (openModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [openModal]);
  return (
    <CommonModal openModal={openModal} handleClose={handleClose}>
      <div className="max-w-screen md:max-w-[350px] h-[80vh] rounded-[12px] overflow-auto example">
        <div className="flex justify-between items-center mb-3">
          <p className="text-base xsss:text-xl font-bold">
            All Reviews ({reviews.length})
          </p>
          <VscChromeClose
            size={25}
            onClick={handleClose}
            className="text-gray-500 cursor-none lg:cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          {reviews?.map((review) => {
            return (
              <div key={review?.id} className="p-1">
                <Reviewcard product={review} isReviewPage={true} />
              </div>
            );
          })}
        </div>
      </div>
    </CommonModal>
  );
};

export default ReviewsModal;
