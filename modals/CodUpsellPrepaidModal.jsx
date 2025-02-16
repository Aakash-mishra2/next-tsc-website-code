"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../common";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import ProductModal from "./ProductModal";
import { TbDiscount2 } from "react-icons/tb";
import ToastProvider from "../common/ToastProvider";
import { postCODUpellPrepaid } from "@/api/orderAPI";
import { handleCashFreePayments } from "@/api/cashfree";

const CodUpsellPrepaidModal = ({ cart, orderId }) => {
  const toastId = useRef(null);
  const [product, showProduct] = useState(false);
  const [isDisable, setDisable] = useState(false);
  const [productDetail, setProductDetail] = useState();

  let total_cut_price = 0;
  cart?.items.forEach((el) => (total_cut_price += el?.cut_price));

  const makePayment = async () => {
    setDisable(true);
    toastId.current = toast("Please wait...", {
      autoClose: false,
      isLoading: true,
    });
    const response = await postCODUpellPrepaid(orderId);
    setDisable(false);
    toast.dismiss(toastId.current);
    if (response?.order_token && response.order_id) {
      localStorage.setItem("AYUVYA_UPDATED_ORDER_ID", response.order_id);
      const return_url = `${window.location.protocol}//${window.location.host}/verifying_payment`;
      handleCashFreePayments(response?.order_token, return_url, cart);
    }
  };

  const handleOpenModal = async (product) => {
    // if (product?.free_gift) {
    //   setProductDetail(product);
    //   showProduct(true);
    // } else showProduct(false);
  };

  return (
    <ToastProvider>
      {cart && (
        <div className="mx-auto min-h-screen relative lg:max-w-md shadow-3xl">
          <ProductModal
            product={product}
            data={productDetail}
            showProduct={showProduct}
          />
          <div className="flex justify-center items-center p-3">
            <div className="flex gap-3 items-center">
              <Link href="/" key="home">
                <Image
                  priority
                  width={120}
                  height={130}
                  alt="Ayuvya Logo"
                  className="cursor-none lg:cursor-pointer"
                  src={
                    "https://storage.googleapis.com/ayuvya_images/product_image/ayuvyablack_logo_17april2024_2.webp"
                  }
                />
              </Link>
            </div>
          </div>
          <div className="border-t overflow-auto p-3">
            <div className="flex text-gray-700 justify-between items-center">
              <div className="flex justify-start gap-3 items-center">
                <p className="text-xl">Order Id: {orderId}</p>
              </div>
              <div className="flex items-center">
                <p>
                  {cart.items.length}{" "}
                  {cart.number_of_items === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <div className="pt-3 text-lg">
              <p>
                Your order is confirmed but you can get absolutely{" "}
                <strong>FREE</strong> Ayuvya skincare gift 🎁.
              </p>
              <p className="text-sm text-gray-500">
                {" "}
                Simply make an online payment for your order.
              </p>
            </div>
            <div className="mb-32 pb-5">
              {cart?.items.map((product, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => handleOpenModal(product)}
                    style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    className={`flex mt-4 relative rounded-lg`}
                  >
                    <div className="relative w-5">
                      {product?.free_gift && (
                        <span className="absolute w-5 -rotate-90 transform top-[80%] lg:top-[83%] left-0 right-0 text-center text-sm text-green-500 font-bold">
                          <span className="px-[2.15rem] py-[.2rem] lg:px-[2.65rem] bg-green-200 rounded-t-[5px]">
                            Free
                          </span>
                        </span>
                      )}
                    </div>
                    <Image
                      width={96}
                      height={96}
                      className="w-20 lg:w-24 m-2 aspect-square relative rounded-md"
                      src={product?.primary_image}
                      alt={product?.product_name}
                    />
                    <div className="m-2 text-gray-600 w-3/4 relative">
                      <h4 className="text-md line-clamp-2">
                        {product?.product_name}
                      </h4>
                      <p className="text-sm text-gray-400 flex flex-wrap justify-between items-center font-bold">
                        <span>Quantity : {product?.quantity}</span>
                        <span className="w-fit text-base">
                          ₹
                          <span className="line-through pr-2">
                            {" "}
                            {product?.cut_price}
                          </span>
                          <span className="text-gray-600 text-xl">
                            ₹ {product?.free_gift ? 1 : product?.price} /-
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="fixed w-full lg:max-w-md bottom-0">
            <div className="text-center flex justify-center items-center text-gray-500 gap-2 bg-green-50  py-1">
              <TbDiscount2 size={20} />
              <span>
                Get <strong className="text-green-600">Free Product</strong>{" "}
                worth <strong className="text-green-600">₹720</strong> on Online
                Payment.
              </span>
            </div>
            <div className="flex">
              <div className="text-gray-600 mx-auto text-center flex justify-center items-center w-1/2">
                <span className="w-full mx-auto font-bold bg-white">
                  <span className="block text-lg font-normal">Grand Total</span>
                  <span className="line-through pr-2 text-gray-400">
                    ₹ {total_cut_price}
                  </span>
                  ₹{" "}
                  <span className="text-2xl font-extrabold">
                    {cart?.final_amount} /-
                  </span>
                </span>
              </div>
              <Button
                disabled={isDisable}
                handler={makePayment}
                className="w-1/2"
              >
                <span className="w-full mx-auto py-5 text-2xl font-semibold shadow-none text-white bg-[#e91e63]">
                  Pay Online
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </ToastProvider>
  );
};

export default CodUpsellPrepaidModal;
