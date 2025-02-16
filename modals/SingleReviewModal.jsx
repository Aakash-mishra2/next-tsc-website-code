import Image from "next/image";
import { VscChromeClose } from "react-icons/vsc";
import CommonModal from "../common/custom/CommonModal";
import { ProgressBarWithStars } from "../common/custom";

const SingleReviewModal = ({
  data,
  reviewModal,
  handleClose,
  showReviewModal,
}) => {
  const date = new Date(data?.date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleString("en-US", options);

  return (
    <CommonModal
      openModal={reviewModal}
      handleClose={handleClose}
      notAllowClickAnywhere={() => showReviewModal(true)}
    >
      <div className="max-w-screen md:max-w-xl lg:max-w-2xl rounded-[12px]">
        <div className="flex justify-end">
          <VscChromeClose
            onClick={handleClose}
            size={25}
            className="text-gray-500 cursor-none lg:cursor-pointer"
          />
        </div>
        <div className="flex md:flex-row flex-col gap-5 justify-center items-start">
          <figure className="w-full md:w-1/2">
            <Image
              width={400}
              height={400}
              className=""
              src={
                "https://storage.googleapis.com/ayuvya_images/product_image/bbf_combo_bbf_new_ui_13april2024_static_.webp"
              }
              alt={data?.review_owner}
            />
          </figure>
          <figcaption className="w-full md:w-1/2">
            <div className="w-full flex flex-col gap-1">
              <div className="flex justify-start gap-3 items-center">
                <h2 className="text-md font-semibold">{data?.review_owner}</h2>
                {data?.verified && (
                  <p className="bg-slate-500 text-white rounded-full px-2 py-1 w-fit text-center font-bold text-xs">
                    VERIFIED
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center">
                <ProgressBarWithStars iconSize={25} noOfStar={5} />
                <p className="text-sm text-gray-500">
                  {data?.date && formattedDate}
                </p>
              </div>
              {data?.review_title && (
                <h2 className="text-2xl font-semibold py-2">
                  {data?.review_title}
                </h2>
              )}
              <p className={`text-sm ${!data?.review_title && "mt-2"}`}>
                {data?.review_description}
              </p>
            </div>
          </figcaption>
        </div>
      </div>
    </CommonModal>
  );
};

export default SingleReviewModal;
