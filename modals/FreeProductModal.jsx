"use client";

import Image from "next/image";
import Modal from "react-modal";
import { useEffect } from "react";

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

const FreeProductModal = ({ productAdded, showProductAdded }) => {
  const free_gift_price = localStorage.getItem("AYUVYA_FREE_GIFT_PRICE");
  useEffect(() => {
    if (productAdded) setTimeout(() => showProductAdded(false), 4000);
  }, [productAdded, showProductAdded]);
  return (
    <Modal
      id="free-product-modal"
      style={customStyles}
      isOpen={productAdded}
      onRequestClose={() => showProductAdded(false)}
      contentLabel="Free Product Modal"
      className={`z-10 outline-none border-none max-w-screen md:max-w-[350px] relative`}
    >
      <div className="max-w-screen pt-5 px-5 text-center pb-5 h-full md:max-w-[350px] rounded-[12px] flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mb-5">
          <Image
            priority
            unoptimized
            width={100}
            height={100}
            alt="Gift-Box"
            src={
              "https://storage.googleapis.com/ayuvya_images/product_image/giphy_asset_17april2024_giftbox.gif"
            }
            className="object-contain"
          />
        </div>
        <h2 className="text-2xl font-semibold">Congratulations! </h2>
        <p className="text-3xl py-3">You got a 2 free products</p>
        <p className="text-xl">
          worth Rs {free_gift_price} /- with online payment!
        </p>
        <p
          onClick={() => showProductAdded(false)}
          className="text-green-500 text-lg pt-8"
        >
          Thank You!
        </p>
      </div>
    </Modal>
  );
};

export default FreeProductModal;
