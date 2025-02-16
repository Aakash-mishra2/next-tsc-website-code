import config from "@/config/config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { ApplyCouponBtn, PromoCode } from ".";
import { getOrderProductType } from "@/api/generalFunc";
import { createResponse, fetchCartByPaymentMethod } from "../../api/cartAPI";

const SelectPaymentMode = ({
  user,
  save,
  cart,
  setUser,
  setCart,
  paymentMode,
  disableText,
  setPaymentMode,
  handleOnChange,
  blockCODOption,
  onlinePercent,
  onlineDiscountType,
  showApplyCoupon,
  activatePincode,
  blockCODForIgain,
  showProductAdded,
  isButtonDisabled,
  setOnlineDiscountType,
  setOnlinePercent,
  handleApplyCoupon,
  setBlockCODOption,
  disablePaymentMode,
  setIsButtonDisabled,
  partialPaymentStatus,
  setDisablePaymentMode,
}) => {
  const [loading, setLoading] = useState(false);
  const hot_deal_check = JSON.parse(localStorage.getItem("hot_deal"));
  const cod_plus_check = JSON.parse(localStorage.getItem("cod_plus"));
  const free_gift_check = JSON.parse(localStorage.getItem("free_gift"));

  const prepaid_gift_check = JSON.parse(localStorage.getItem("prepaid_gift"));
  const prepaid_gift_price = JSON.parse(
    localStorage.getItem("AYUVYA_FREE_PREPAID_GIFT_PRICE"),
  );
  const flatDiscount =
    onlineDiscountType === "numeric"
      ? onlinePercent
      : (save * onlinePercent) / 100;

  const handlePaymentType = async (typeOfPayment) => {
    setLoading(true);
    if (paymentMode !== typeOfPayment) {
      setIsButtonDisabled(true);
      setDisablePaymentMode(true);
      const response = await fetchCartByPaymentMethod(
        getOrderProductType(typeOfPayment),
      );
      setIsButtonDisabled(false);
      setDisablePaymentMode(false);
      if (response?.message === "success") {
        const data = { ...user, payment_method: typeOfPayment };
        setPaymentMode(typeOfPayment);
        setUser(data);
        localStorage.setItem("AYUVYA_USERDATA", JSON.stringify(data));
      } else {
        const data = { ...user, payment_method: paymentMode };
        setPaymentMode(paymentMode);
        setUser(data);
        localStorage.setItem("AYUVYA_USERDATA", JSON.stringify(data));
      }
      let discountType = response?.online_discount_type?.toLowerCase();
      setOnlineDiscountType(discountType);
      setOnlinePercent(discountType === "numeric" ? response?.online_discount_factor : response?.online_discount_factor * 100 || 10);
      const updatedResponse = createResponse(response);
      setCart(updatedResponse);
      if (updatedResponse?.paymentMethod === "COD")
        toast.warn("Removing free product from cart.", {
          autoClose: 3000,
          position: "bottom-right",
          style: {
            fontSize: 20,
            color: "black",
            fontWeight: 500,
            background: "white",
          },
        });
      showProductAdded(updatedResponse?.free_gift ?? false);
      setBlockCODOption(updatedResponse?.block_cod ?? false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!partialPaymentStatus) localStorage.removeItem("partial");
  }, [partialPaymentStatus]);

  // !disableText &&
  // !hot_deal_check &&
  return (
    <>
      <fieldset
        className={`flex flex-col ${partialPaymentStatus ? "lg:flex-row lg:gap-10" : ""
          } gap-3 pt-4 pb-3`}
      >
        {!blockCODOption && !blockCODForIgain && !activatePincode && !partialPaymentStatus && (
          <div className="flex gap-3 items-center">
            <input
              id="COD"
              type="radio"
              name="payment_method"
              value="COD"
              checked={paymentMode === "COD"}
              disabled={isButtonDisabled || disablePaymentMode}
              onClick={(e) => handlePaymentType(e.target.value)}
              onChange={() => { }}
              className="min-h-[28px] min-w-[28px] h-7 w-7 rounded-md cursor-none lg:cursor-pointer"
            />
            <label
              htmlFor="COD"
              className="flex justify-center gap-2 items-center text-lg cursor-none lg:cursor-pointer"
            >
              <span>Cash On Delivery (COD)</span>
            </label>
          </div>
        )}
        {partialPaymentStatus && !disableText && (
          <div className="flex lg:w-1/2 gap-3 items-start">
            <input
              type="radio"
              id="Partial_Payment"
              name="payment_method"
              value="Partial_Payment"
              onChange={() => { }}
              checked={paymentMode === "Partial_Payment"}
              disabled={isButtonDisabled || disablePaymentMode}
              onClick={(e) => handlePaymentType(e.target.value)}
              className="min-h-[28px] min-w-[28px] h-7 w-7 lg:h-9 lg:w-9 rounded-md cursor-none lg:cursor-pointer"
            />
            <label
              htmlFor="Partial_Payment"
              className="text-lg flex flex-col cursor-none lg:cursor-pointer"
            >
              <span>Partial Payment</span>
              <span className="text-base">
                (Pay Rs.50 now and the rest on Delivery)
              </span>
            </label>
          </div>
        )}
        {!disableText ? (
          <div
            className={`flex gap-3 ${!partialPaymentStatus ? "items-center" : "items-start"
              }`}
          >
            <input
              type="radio"
              id="Prepaid"
              value="Prepaid"
              name="payment_method"
              onChange={() => { }}
              checked={paymentMode === "Prepaid"}
              disabled={isButtonDisabled || disablePaymentMode}
              onClick={(e) => handlePaymentType(e.target.value)}
              className="min-h-[28px] min-w-[28px] h-7 w-7 rounded-md cursor-none lg:cursor-pointer"
            />
            <label
              htmlFor="Prepaid"
              className="flex justify-center gap-2 items-center text-sm xsss:text-lg cursor-none lg:cursor-pointer"
            >
              <span className="min-w-[96px] w-24">Pay Online</span>
              {partialPaymentStatus ||
                free_gift_check ||
                hot_deal_check ||
                cod_plus_check ? (
                <>
                  {cod_plus_check ? (
                    <span className="text-sm font-black text-green-500">
                      (Save ₹ 50 + Free Shipping)
                    </span>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <span className="text-sm font-black text-green-500">
                  {loading
                    ? "Calculating amount..."
                    : `Save ₹ ${flatDiscount.toFixed(1)} + Free ${prepaid_gift_check || free_gift_check
                      ? "Product worth ₹ " + prepaid_gift_price
                      : "Shipping"
                    }`}
                </span>
              )}
            </label>
          </div>
        ) : (
          <div
            className={`flex gap-3 ${!partialPaymentStatus ? "items-center" : "items-start"
              }`}
          >
            <input
              type="radio"
              id="Prepaid"
              name="payment_method"
              value="Prepaid"
              checked
              readOnly
              onChange={() => { }}
              disabled={isButtonDisabled || disablePaymentMode}
              className="min-h-[28px] min-w-[28px] h-7 w-7 rounded-md cursor-none lg:cursor-pointer"
            />
            <label
              htmlFor="Prepaid"
              className="text-sm xsss:text-lg cursor-none lg:cursor-pointer"
            >
              Pay Online
            </label>
          </div>
        )}
      </fieldset>
      {/*prepaid_gift_price && (
        <p className="flex flex-col uppercase bg-purple-200 shadow-sm rounded-md py-3 px-2 text-center text-xs font-extrabold text-black">
          <span>Congratulations! You get free product</span>{" "}
          <span className="inline">
            worth<span className="text-lg"> ₹ {prepaid_gift_price}</span> on
            online Payment🎉🥳
          </span>
        </p>
      )*/}
      <div className="lg:hidden">
        {JSON.parse(config.coupon_active) && (
          <ApplyCouponBtn
            saved={cart?.coupon_discount}
            showBtn={cart?.block_coupon_btn}
            couponStatus={cart?.couponStatus}
            showApplyCoupon={showApplyCoupon}
            handleApplyCoupon={handleApplyCoupon}
          />
        )}
        {!cart.price_breakup.deal_discount && (
          <PromoCode
          user={user}
          newUI={true}
          handleOnChange={handleOnChange}
          isButtonDisabled={isButtonDisabled}
          handleApplyCoupon={handleApplyCoupon}
        />
        )}
      </div>
    </>
  );
};

export default SelectPaymentMode;
// <>
// {free_gift_check ? (
//   <p className="pb-3 text-gray-500">
//     Note: Get <strong className="text-green-600">Free Product</strong>{" "}
//     worth <strong className="text-green-600">₹{free_gift_price}</strong>{" "}
//     on Online Payment.
//   </p>
// ) : hot_deal_check || cod_plus_check ? (
//   <></>
// ) : prepaid_gift_check ? (
//   <p className="pb-3">
//     Note: Get <strong>{onlinePercent}% discount </strong> and{" "}
//     <strong>Free Product </strong>
//     worth{" "}
//     <strong className="text-green-600">₹{prepaid_gift_price}</strong> on
//     online payment.
//   </p>
// ) : (
//   <p className="pb-3">
//     Note: Get{" "}
//     <strong>
//       {onlinePercent}% discount
//       {/*cart?.total_amount >= 499 && " and Free Product"*/}
//     </strong>{" "}
//     on online payment.
//   </p>
// )}
// </>
