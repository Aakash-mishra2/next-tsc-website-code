"use client";

import Link from "next/link";
import Image from "next/image";
import PayU from "../checkout/PayU";
import config from "@/config/config";
import { toast } from "react-toastify";
import ProductModal from "./ProductModal";
import { Button, Loader } from "../common";
import { TbDiscount2 } from "react-icons/tb";
import { makeGetRequest } from "@/api/request";
import { postCODToPrepaid } from "@/api/orderAPI";
import ToastProvider from "../common/ToastProvider";
import { useEffect, useRef, useState } from "react";
import CircularLoader from "../common/CircularLoader";
import { handleCashFreePayments } from "@/api/cashfree";

const CodToPrepaidModal = ({ cart, orderId }) => {
  const toastId = useRef(null);
  const [product, showProduct] = useState(false);
  const [isDisable, setDisable] = useState(false);
  const [productDetail, setProductDetail] = useState();
  const isOnlineDiscountNumeric =
    parseFloat(cart?.online_discount_factor) > 1;

  const [initiatePayUScreen, setInitiatePayUScreen] = useState(false);
  const [initiatePayU, setInitiatePayU] = useState(false); // to activate PAYU for not existing URL

  const payURef = useRef();
  const payUpinRef = useRef();
  const payUhashRef = useRef();
  const payUemailRef = useRef();
  const payUphoneRef = useRef();
  const payUorderRef = useRef();
  const payUamountRef = useRef();
  const payUaddressRef = useRef();
  const payUorderIdRef = useRef();
  const payUproductRef = useRef();
  const payUlastnameRef = useRef();
  const payUfirstnameRef = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const domains = JSON.parse(config?.payu_domains);
      if (domains.includes(window.location.hostname)) setInitiatePayU(true);
    }
  }, []);

  const makePayment = async () => {
    try {
      setDisable(true);
      toastId.current = toast("Please wait...", {
        autoClose: false,
        isLoading: true,
      });

      const response = await postCODToPrepaid(
        initiatePayU
          ? { get_order_id: orderId, payment_gateway: "PAYU" }
          : { get_order_id: orderId },
      );
      setDisable(false);
      if (response?.order_token && response.order_id) {
        localStorage.setItem("AYUVYA_ORDER_ID", orderId);
        localStorage.setItem("COD_TO_PREPAID_LINK", true);
        localStorage.setItem("AYUVYA_UPDATED_ORDER_ID", response.order_id);
        const return_url = `${window.location.protocol}//${window.location.host}/verifying_payment`;
        initiatePayU
          ? await initiatePayUPayments({ ...response, get_order_id: orderId })
          : await handleCashFreePayments(
              response?.order_token,
              return_url,
              cart,
            );
      }
      if (toastId.current && !response?.order_token)
        return toast.dismiss(toastId.current);
    } catch (error) {
      setDisable(false);
      return toast.dismiss(toastId.current);
    }
  };

  const initiatePayUPayments = (response) => {
    payUphoneRef.current.value = response.phone;
    payUpinRef.current.value = response.zipcode;
    payUemailRef.current.value = response.email;
    payUorderRef.current.value = response.order_id;
    payUaddressRef.current.value = response.address1;
    payUhashRef.current.value = response.order_token;
    payUlastnameRef.current.value = response.lastname;
    payUfirstnameRef.current.value = response.firstname;
    payUproductRef.current.value = response.productinfo;
    payUorderIdRef.current.value = response.get_order_id;
    payUamountRef.current.value = response.amount.toFixed(1);
    if (payUhashRef.current.value && payUorderIdRef.current.value) {
      setInitiatePayUScreen(true);
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0 });
      return payURef.current.click();
    }
  };

  const handleOpenModal = async (prod) => {
    try {
      if (prod?.free_gift && !productDetail?.id) {
        toastId.current = toast("Please wait...", {
          autoClose: false,
          isLoading: true,
        });
        const url = `api/products/v1/${prod?.id}/?get_details=true`;
        const product = await makeGetRequest(url);
        setProductDetail(product);
        return showProduct(true);
      } else if (prod?.free_gift && productDetail?.id) return showProduct(true);
      else showProduct(false);
    } catch (error) {
    } finally {
      if (toastId.current) return toast.dismiss(toastId.current);
    }
  };

  useEffect(() => {
    if (product) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [product]);

  useEffect(() => {
    const resetDisableStata = () => {
      let time = 3000;
      try {
        const networkType = navigator.connection.effectiveType;
        switch (networkType) {
          case "slow-2g":
            time = 20000;
            break;
          case "2g":
            time = 15000;
            break;
          case "3g":
            time = 7000;
            break;
          case "4g":
            time = 3000;
            break;
          default:
            time = 5000;
            break;
        }
      } catch (error) {
        console.log("Failed to reset", error);
      }
      setTimeout(() => {
        setInitiatePayUScreen(false);
        document.body.style.overflow = "auto";
      }, time);
    };
    if (initiatePayUScreen) resetDisableStata();
  }, [initiatePayUScreen]);

  return (
    <ToastProvider>
      {cart && (
        <div className="mx-auto min-h-screen relative max-w-md shadow-md">
          <ProductModal
            product={product}
            data={productDetail}
            showProduct={showProduct}
          />
          {initiatePayUScreen && (
            <div className="absolute top-0 z-[9999] right-0 left-0 bottom-0 h-full bg-white">
              <div className="flex justify-center transition-all duration-200 ease-in-out items-center h-screen">
                <Loader />
              </div>
            </div>
          )}
          {initiatePayU && (
            <PayU
              payURef={payURef}
              payUpinRef={payUpinRef}
              payUhashRef={payUhashRef}
              initiatePayU={initiatePayU}
              payUemailRef={payUemailRef}
              payUphoneRef={payUphoneRef}
              payUorderRef={payUorderRef}
              payUamountRef={payUamountRef}
              payUaddressRef={payUaddressRef}
              payUorderIdRef={payUorderIdRef}
              payUproductRef={payUproductRef}
              payUlastnameRef={payUlastnameRef}
              payUfirstnameRef={payUfirstnameRef}
            />
          )}
          <div className="flex sticky top-0 z-50 shadow-sm bg-white justify-center items-center">
            <Link href="/" key="home" aria-label="Home Page">
              <Image
                priority
                width={100}
                height={100}
                alt="Ayuvya Logo"
                className="w-fit cursor-none lg:cursor-pointer"
                src={
                  "https://storage.googleapis.com/ayuvya_images/product_image/ayuvyablack_logo_17april2024_2.webp"
                }
              />
            </Link>
          </div>
          <div className="overflow-auto p-3">
            <div className="flex text-gray-700 justify-between items-center">
              <div className="flex justify-start gap-3 items-center">
                <p className="text-lg xss:text-xl">Order Id: {orderId}</p>
              </div>
              <div className="flex items-center">
                <p>
                  {cart.items.length}{" "}
                  {cart.number_of_items === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <div className="pt-3 text-md xss:text-lg">
              <p>
                Your Order is confirmed to claim
                {isOnlineDiscountNumeric ? (
                  <strong>{" "}flat ₹50 off*</strong>
                ) : (
                  <>
                    upto <strong>50% off*</strong>
                  </>
                )}{" "}
                switch to online payment mode.
              </p>
              <p className="text-xs xss:text-sm text-gray-500">
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
                    className={`flex mt-4 relative rounded-lg ${
                      product?.free_gift && "cursor-pointer"
                    } `}
                    style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
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
                      <h4 className="text-sm xss:text-md line-clamp-2">
                        {product?.product_name}
                      </h4>
                      <p className="text-sm text-gray-400 flex flex-wrap justify-between items-center font-bold">
                        <span>Qty : {product?.quantity}</span>
                        <span className="w-fit text-base">
                          ₹
                          <span className="line-through pr-2">
                            {" "}
                            {product?.cut_price}
                          </span>
                          <span className="text-gray-600 text-lg xss:text-xl">
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
          <div className="fixed w-full max-w-md bottom-0">
            <div className="text-center flex justify-center items-center text-gray-500 gap-2 bg-green-50  py-1">
              <TbDiscount2 size={20} />
              <span>
                {" "}
                <strong className="text-green-600">
                  {isOnlineDiscountNumeric
                    ? "Flat ₹50 off/-"
                    : "50% off upto ₹ 120/-"}
                </strong>
              </span>
            </div>
            <div className="flex">
              <div className="text-gray-600 mx-auto text-center flex justify-center items-center w-1/2">
                <span className="w-full mx-auto py-[6px] font-bold bg-white">
                  <span className="block text-sm xsm:text-md xss:text-lg font-normal">
                    Grand Total
                  </span>
                  <span className="line-through pr-2 text-gray-400">
                    ₹ {cart?.total_amount}
                  </span>
                  ₹{" "}
                  <span className="xsss:text-lg xss:text-2xl font-extrabold">
                    {cart?.final_amount} /-
                  </span>
                </span>
              </div>
              <Button
                hideLoader={true}
                className="w-1/2"
                disabled={isDisable}
                handler={makePayment}
              >
                <span className="w-full mx-auto flex justify-center gap-2 py-3 xss:py-5 xsss:text-lg xss:text-2xl font-semibold shadow-none text-white bg-[#e91e63]">
                  Pay Online {isDisable && <CircularLoader theme={"e91e63"} />}
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </ToastProvider>
  );
};

export default CodToPrepaidModal;
