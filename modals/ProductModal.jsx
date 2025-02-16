"use client";

import Modal from "react-modal";
import { VscChromeClose } from "react-icons/vsc";
import { ProductSwiper, Ratings } from "../staticproduct";
import ReviewCount from "../product/productDetails/ReviewCount";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    overflow: "none",
    border: "#f5f0f7",
    borderRadius: "12px",
    backgroundColor: "white",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    zIndex: 1000,
    overflow: "none",
    backdropFilter: "blur(3px)",
    background: "rgba(255, 255, 255, 0.2)",
  },
};
Modal.setAppElement("#root");

const ProductModal = ({ data, product, showProduct }) => {
  const productData = {
    herbs: data?.herbs,
    theme: data?.theme,
    price: data?.price,
    rating: data?.rating,
    reviews: data?.reviews,
    cut_price: data?.cut_price,
    review_count: data?.review_count,
    product_title: data?.product_title,
    product_images: data?.product_images,
    product_sub_title: data?.product_sub_title,
  };
  return (
    <Modal
      isOpen={product}
      style={customStyles}
      id="free-product-modal"
      onRequestClose={() => showProduct(false)}
      className={`z-10 outline-none border-none max-w-screen md:max-w-[350px] relative`}
    >
      <div className="max-w-screen p-2 xsss:p-4 xss:p-5 text-center h-full md:max-w-[350px] rounded-[12px] flex flex-col justify-center items-center">
        <div className="flex relative justify-center items-start">
          <div className="w-[260px] xsss:w-[300px] xss:w-[320px] pt-5">
            <ProductSwiper images={productData?.product_images} />
          </div>
          <VscChromeClose
            size={25}
            onClick={() => showProduct(false)}
            className="text-black absolute -right-1 -top-2 cursor-none lg:cursor-pointer"
          />
        </div>
        <div className="text-left">
          <p className="text-lg xss:text-xl font-bold">
            Ayuvya {productData?.product_title} {productData?.product_sub_title}
          </p>
          <p className="text-xss xsss:text-xs xss:text-sm pb-2 pt-1">
            {productData?.herbs}
          </p>
          <div className="flex items-center">
            <span className="pr-2 text-xl md:text-3xl font-semibold">
              {productData?.rating}{" "}
            </span>
            <Ratings
              iconSize={25}
              halfStar={true}
              noOfStar={productData?.rating}
              starColor={productData?.theme}
            />
          </div>
          <ReviewCount
            modal={true}
            theme={productData?.theme}
            reviews={productData?.reviews}
            review_count={productData?.review_count}
          />
          <div className="flex gap-4 text-2xl font-semibold">
            <span className="">₹ {productData?.price?.toFixed(1)}</span>
            <span className="line-through text-gray-400">
              ₹ {productData?.cut_price?.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
