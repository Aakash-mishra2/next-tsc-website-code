import Image from "next/image";
import { useEffect } from "react";
import { Button } from "../common";
import { VscChromeClose } from "react-icons/vsc";
import PaymentCards from "../checkout/PaymentCards";
import CommonModal from "../common/custom/CommonModal";
import { getOrderProductType } from "@/api/generalFunc";
import giftBox from "../../../public/assets/images/other/gift-box.png";
import { createResponse, fetchCartByPaymentMethod } from "@/api/cartAPI";
import { discount_titles } from "@/config/constants";

const ConfirmPaymentType = ({
  user,
  save,
  cart,
  setUser,
  setCart,
  handleClose,
  onlinePercent,
  setOnlineDiscountType,
  onlineDiscountType,
  setOnlinePercent,
  setPaymentMode,
  shippingAmount,
  handleCodOrder,
  duplicateOrder,
  handlePrePaidOrder,
  confirmPaymentMethod,
  setDuplicateOrderModal,
  setconfirmPaymentMethod,
}) => {
  const flatDiscount = onlineDiscountType === "numeric" ? onlinePercent : (save * onlinePercent) / 100;
  const free_gift_check = JSON.parse(localStorage.getItem("free_gift"));
  const free_gift_price = localStorage.getItem("AYUVYA_FREE_GIFT_PRICE");

  const prepaid_gift_check = JSON.parse(localStorage.getItem("prepaid_gift"));
  const prepaid_gift_price = JSON.parse(
    localStorage.getItem("AYUVYA_FREE_PREPAID_GIFT_PRICE")
  );

  const COD_desc =
    shippingAmount > 0
      ? free_gift_check
        ? ""
        : ` + Extra ₹ ${shippingAmount}`
      : "";

  const handleOrder = async (paymentTypeSelected) => {
    handleClose();
    if (duplicateOrder && paymentTypeSelected === "COD")
      return setDuplicateOrderModal(true);
    if (!duplicateOrder && paymentTypeSelected === "COD") handleCodOrder();
    else {
      const response = await fetchCartByPaymentMethod(
        getOrderProductType(paymentTypeSelected)
      );
      const updatedResponse = createResponse(response);
      setCart(updatedResponse);
      let discountType = response?.online_discount_type?.toLowerCase();
      setOnlineDiscountType(discountType);
      setOnlinePercent(discountType === "numeric" ? response?.online_discount_factor : response?.online_discount_factor * 100 || 10);
      setPaymentMode(paymentTypeSelected);
      const data = { ...user, payment_method: paymentTypeSelected };
      setUser(data);
      localStorage.setItem("AYUVYA_USERDATA", JSON.stringify(data));
      localStorage.setItem(
        "AYUVYA_FINAL_AMOUNT",
        updatedResponse?.final_amount
      );
      if (response?.message === "success") handlePrePaidOrder("Prepaid");
    }
  };

  useEffect(() => {
    if (confirmPaymentMethod) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [confirmPaymentMethod]);

  return (
    <CommonModal
      handleClose={handleClose}
      openModal={confirmPaymentMethod}
      notAllowClickAnywhere={() => setconfirmPaymentMethod(true)}
    >
      <div className="rounded-[12px] md:max-w-xs">
        <div className="flex justify-center items-center mb-3">
          <Image
            priority
            width={100}
            height={100}
            src={giftBox}
            alt="Gift-box"
            className="w-1/4"
          />
        </div>
        <div className="flex justify-between text-center">
          {shippingAmount > 0 && !free_gift_check ? (
            <p className="text-xl">Pay Less on Online Payment!</p>
          ) : free_gift_check ? (
            <p className="text-2xl">Don&apos;t miss Free Product!</p>
          ) : (
            <p className="text-sm xsss:text-base xss:text-xl text-center leading-4 xsss:leading-6 mb-2 font-semibold">
              {prepaid_gift_price
                ? discount_titles.CHECKOUT_MODAL_TITLE
                : `Don't miss ${onlinePercent}% OFF!`}
            </p>
          )}
          <VscChromeClose
            onClick={handleClose}
            size={25}
            className="cursor-none absolute top-5 right-5 lg:cursor-pointer"
          />
        </div>
        {shippingAmount > 0 && !free_gift_check ? (
          <p className="text-gray-500 text-xss xsss:text-xs xss:text-sm border-b border-gray-300 mx-auto text-center mb-4 font-semibold pb-3">
            Pay Online & get Free Shipping on this order!
          </p>
        ) : free_gift_check ? (
          <p className="text-gray-500 text-xss xsss:text-xs xss:text-sm border-b border-gray-300 mx-auto text-center mb-4 font-semibold pb-3">
            Pay Online & get Free Product worth ₹ {free_gift_price}/-
          </p>
        ) : prepaid_gift_check ? (
          <p className="text-gray-500 text-xss xsss:text-xs xss:text-sm border-b border-gray-300 mx-auto text-center mb-4 font-semibold pb-3">
            {discount_titles.CHECKOUT_MODAL_DESC}
          </p>
        ) : (
          <p className="text-gray-500 text-xss xsss:text-xs xss:text-sm border-b border-gray-300 mx-auto text-center mb-4 font-semibold pb-3">
            Pay Online & get Flat {onlinePercent}% OFF on this order!
          </p>
        )}
        <div className="flex flex-col gap-3 mb-2">
          <Button
            type="button"
            hideLoader={true}
            handler={() => handleOrder("COD")}
            className="bg-[#FBF8EC] rounded-md border text-left border-lime-950 w-full text-lime-950 py-2 flex justify-start items-center"
          >
            <div className="mx-3 text-center w-full">
              <p className="text-sm xsss:text-base xss:text-lg xss:py-1">
                COD (Cash On Delivery) -
                <span className="font-extrabold">
                  {" "}
                  ₹ {cart?.final_amount} {COD_desc}
                </span>
              </p>
            </div>
          </Button>
          <Button
            type="button"
            hideLoader={true}
            handler={() => handleOrder("Prepaid")}
            className="bg-[#1F4941] rounded-md border text-left border-[#1F4941] hover:bg-[#1F4941]/90 w-full text-white py-2 flex justify-start items-center"
          >
            <div className="mx-3 w-full">
              <p className="text-sm xsss:text-base xss:text-lg text-center leading-4 xsss:leading-5">
                Pay Online -{" "}
                <span className="font-extrabold">
                  ₹ {(save - flatDiscount.toFixed(1)).toFixed(1)}
                </span>
                <br />
                <span className="text-white text-[9px] xsss:text-[11px] xss:text-xs" dangerouslySetInnerHTML={{__html: discount_titles.CHECKOUT_MODAL_CTA}}>
                </span>
              </p>
            </div>
          </Button>
        </div>
        <div className="mx-auto w-3/4">
          <PaymentCards confirm={true} />
        </div>
      </div>
    </CommonModal>
  );
};

export default ConfirmPaymentType;
