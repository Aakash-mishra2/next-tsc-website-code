import Link from "next/link";
import * as fbq from "@/api/events";
import { toast } from "react-toastify";
import { Button } from "../common/Button";
import { useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import { FaLock, FaTruckFast } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
import { valiDateFormByCustomChecks } from "./validateForm";
import {
  VerifyOtp,
  ConfirmPaymentType,
  DuplicateOrderConfirmation,
} from "../modals";
import {
  Pincode,
  AddressGender,
  PersonalDetail,
  SelectPaymentMode,
  Testimonial,
} from "./index";
import TrustIcons from "./TrustIcons";
import { sendOTP } from "@/api/authAPI";
import { blockCOD } from "@/api/cartAPI";
import { createOrder, placeOrderByPrepaid } from "@/api/orderAPI";
import {
  focusElement,
  validateEmail,
  setLocalStorage,
  handleAutoScroll,
  checkCartChanges,
} from "@/api/generalFunc";
import PayU from "./PayU";
import { Loader } from "../common";
import config from "@/config/config";
import PaymentCards from "./PaymentCards";
import { handleCashFreePayments } from "@/api/cashfree";

const CheckoutForm = ({
  user,
  cart,
  setCart,
  setUser,
  fetchCart,
  disableText,
  productAdded,
  initiatePayU,
  isZippeeOrder,
  onlinePercent,
  onlineDiscountType,
  blockCODOption,
  pincodeService,
  handleOnChange,
  showApplyCoupon,
  activatePincode,
  showProductAdded,
  isButtonDisabled,
  blockCODForIgain,
  setOnlinePercent,
  setPincodeService,
  handleApplyCoupon,
  setBlockCODOption,
  disablePaymentMode,
  setIsButtonDisabled,
  partialPaymentStatus,
  handlePincodeResponse,
  setOnlineDiscountType,
  setDisablePaymentMode,
  coupons,
}) => {
  const router = useRouter();
  const toastId = useRef(null); // for showing toast dialog
  const addressRef = useRef(null); // for showing address toast dialog

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

  const [otp, setOtp] = useState(null); // for setting OTP state
  const [otpModal, showOtpModal] = useState(false); // to show OTP modal

  const [initiatePayUScreen, setInitiatePayUScreen] = useState(false);

  const [paymentMode, setPaymentMode] = useState(user?.payment_method);
  const [emailError, setEmailError] = useState(false); // to set the email error check
  const [customErrors, setCustomErrors] = useState([]); // to set the custom errors

  const [duplicateOrder, setDuplicateOrder] = useState(false); // to check duplicate order
  const [previousOrderDetails, setPreviousOrderDetails] = useState(); // to show order details
  const [duplicateOrderModal, setDuplicateOrderModal] = useState(false); // to show duplicate order Modal

  const [confirmPaymentMethod, setconfirmPaymentMethod] = useState(false); // to show confirm payment Modal

  const isShipRocketOrder =
    typeof window !== "undefined" &&
    localStorage.getItem("SHIPROCKET_CHECKOUT_ORDER");

  const toastMessage = (message, type, autoClose) =>
    toast.update(toastId.current, {
      type: type,
      render: message,
      autoClose: autoClose ?? 2000,
      isLoading: false,
    });

  useEffect(() => {
    setPaymentMode(user?.payment_method);
  }, [user?.payment_method]);

  const toastLoading = () =>
  (toastId.current = toast("Please wait...", {
    autoClose: false,
    isLoading: true,
  }));

  // send notification
  const sendOtp = async (data) => {
    let email;
    toastLoading();
    setIsButtonDisabled(true);
    if (data?.email) email = validateEmail(data?.email) ? data.email : "";
    const response = await sendOTP({ ...data, email: email });
    setIsButtonDisabled(false);
    if (response?.message === "success" && response?.phone) {
      showOtpModal(true);
      toastMessage("OTP sent successfully!", "success");
    } else if (response?.error === "email") {
      toast.dismiss(toastId.current);
      localStorage.setItem(
        "AYUVYA_USERDATA",
        JSON.stringify({ ...user, email: "" })
      );
      sendOtp({ phone: user?.phone });
    } else {
      showOtpModal(false);
      toast.dismiss(toastId.current);
    }
  };
  // to close sendOtpModal
  const handleClose = () => {
    if (isButtonDisabled) return;
    showOtpModal(false);
    setconfirmPaymentMethod(false);
    setOtp(null);
  };

  // only run when user left the input box
  const handleCustomError = () => {
    Object.keys(user).forEach(
      (k) => (user[k] = typeof user[k] == "string" ? user[k].trim() : user[k])
    );
    const customErrors = valiDateFormByCustomChecks(user);
    return setCustomErrors(customErrors?.error);
  };
  // to highlight address field errors
  const highlightAddressError = (isError) => {
    if (isError && addressRef.current) {
      addressRef.current.focus();
      addressRef.current.error = true;
      addressRef.current.style.border = "2px solid red";
      addressRef.current.style.opacity = "0.5";
      return toast.error("Address too short", { autoClose: 3000 });
    } else {
      addressRef.current.focus();
      addressRef.current.error = false;
      addressRef.current.style.border = "1px solid #e5e7eb";
      addressRef.current.style.opacity = "1";
    }
  };

  // to create a new checkout / order
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!navigator.onLine)
        return toast.warn("Check your internet connection!");

      if (disablePaymentMode)
        return toast.update(toastId.current, {
          render: "Please wait...",
          autoClose: false,
          isLoading: true,
        });
      setIsButtonDisabled(true);
      Object.keys(user).forEach(
        (k) =>
        (user[k] =
          typeof user[k] === "string" ? user[k] && user[k].trim() : user[k])
      );
      if (user.city === undefined) user.city = "";
      if (user.pin_code === undefined) user.pin_code = "";
      if (user?.state.toString() === "NaN") user.state = "";

      const customErrors = valiDateFormByCustomChecks(user, "clicked");
      if (!customErrors?.isErrorOrdered) {
        handleAutoScroll(customErrors?.error);
        setIsButtonDisabled(false);
        return setCustomErrors(customErrors?.error);
      } else {
        const data = { ...user, country: "India" };
        setCustomErrors(customErrors?.error);
        setUser(data);
        if (pincodeService) {
          setIsButtonDisabled(false);
          return focusElement("pin_code"); // to prevent infinite recursion
        }

        const watti = JSON.parse(localStorage.getItem("AYUVYA_WATTI_ORDER_ID"));
        const isCartOk = await checkCartChanges(cart);
        setIsButtonDisabled(false);
        if (isCartOk) {
          if (watti) return handlePrepaidConfirmedOrder();
          else {
            localStorage.setItem("AYUVYA_FINAL_AMOUNT", cart?.final_amount);
            localStorage.setItem("AYUVYA_USERDATA", JSON.stringify(data));
            if (user?.payment_method === "COD") handleCreateOrder();
            else if (user?.payment_method === "Partial_Payment")
              handlePrePaidOrder("Partial_Payment");
            else handlePrePaidOrder("Prepaid");
          }
        }
      }
    } catch (error) {
      console.log("CHECKOUT PAGE ERROR:" + error);
    }
  };
  // to handle COD confirmed orders & abondoned orders from whatsapp
  const handlePrepaidConfirmedOrder = async () => {
    setIsButtonDisabled(true);
    setDisablePaymentMode(true);
    toastLoading();
    const orderId = JSON.parse(localStorage.getItem("AYUVYA_ORDER_ID"));
    const userData = JSON.parse(localStorage.getItem("AYUVYA_USERDATA"));
    const response = await placeOrderByPrepaid({
      ...user,
      get_order_id: orderId,
      payment_method: userData?.payment_method,
    });
    setIsButtonDisabled(false);
    setDisablePaymentMode(false);
    if (response) {
      setEmailError(false);
      toast.dismiss(toastId.current);
      if (response?.get_order_id)
        localStorage.setItem("AYUVYA_ORDER_ID", response?.get_order_id);
      if (response?.order_id)
        localStorage.setItem("AYUVYA_UPDATED_ORDER_ID", response?.order_id);
      const user = JSON.parse(localStorage.getItem("AYUVYA_USERDATA"));
      if (user?.payment_method === "COD") {
        localStorage.setItem(
          "AYUVYA_USERDATA",
          JSON.stringify({ ...user, payment_method: "Prepaid" })
        );
      }
      const return_url =
        window.location.href.replace("/checkout", "") + "/verifying_payment";
      setDisablePaymentMode(false);
      handleCashFreePayments(response.order_token, return_url, cart);
    } else {
      toastMessage("Something went wrong! Please try again", "error");
      setDisablePaymentMode(false);
      localStorage.removeItem("AYUVYA_ORDER_ID");
    }
  };
  // to handle COD orders, we need to check if the user is authorized or not
  const handleCodOrder = async () => {
    if (isShipRocketOrder && isShipRocketOrder === "true") {
      return handleShipRocketOrder(true);
    } else if (user?.email && user?.email.length > 0)
      await sendOtp({ phone: user?.phone, email: user?.email });
    else await sendOtp({ phone: user?.phone });
  };
  // to handle shiprocket checkout orders
  const handleShipRocketOrder = async (isShipRocketOrder) => {
    setDisablePaymentMode(true);
    const response = await createOrderByMethod("COD", isShipRocketOrder); // to place COD order
    setDisablePaymentMode(false);
    if (response && !response?.errorMessage) {
      setLocalStorage(response);
      setEmailError(false);
      toast.dismiss(toastId.current);
      localStorage.setItem("ORDER_STATUS", "CONFIRMED");
      router.replace("/thank-you");
    } else {
      if (response?.errorMessage) {
        if (response?.errorMessage === "Enter a valid email address.")
          setEmailError(true);
        toastMessage(response?.errorMessage, "error");
      } else
        toastMessage("Something went wrong! Please try again Later", "error");
    }
  };
  // to create prepaid orders
  const handlePrePaidOrder = async (paymentType) => {
    setIsButtonDisabled(true);
    setDisablePaymentMode(true);
    const response = await createOrderByMethod(paymentType);
    setIsButtonDisabled(false);
    const orderId = { get_order_id: response?.get_order_id };
    if (response && !response?.errorMessage) {
      setEmailError(false);
      setLocalStorage(response);
      toast.dismiss(toastId.current);
      const return_url =
        window.location.href.replace("/checkout", "") + "/verifying_payment";
      setDisablePaymentMode(false);
      initiatePayU
        ? initiatePayUPayments({ ...response, ...orderId })
        : handleCashFreePayments(response.order_token, return_url, cart);
    } else {
      setDisablePaymentMode(false);
      if (response?.errorMessage) {
        if (response?.errorMessage === "Enter a valid email address.")
          setEmailError(true);
        toastMessage(response?.errorMessage, "error");
      } else
        toastMessage("Something went wrong! Please try again Later", "error");
    }
  };

  const calcSaveAmount = (cart, isModal) => {
    let deal_discount = 0;
    if (cart?.price_breakup?.deal_discount)
      deal_discount = cart?.price_breakup?.deal_discount;

    let finalAmount;
    const totalAmount = cart?.total_amount + 1;
    const coupon = (coupons && coupons?.applicable?.length > 0) && coupons.applicable.filter(coupon => coupon.code === cart?.coupon)[0];
    if (!coupon) {
      finalAmount = totalAmount - deal_discount;
    }else if (coupon?.code_type === "numeric") {
      finalAmount = totalAmount - coupon?.value - deal_discount;
    } else if (coupon?.code_type === "percentage") {
      finalAmount = totalAmount - (totalAmount * (coupon?.value / 100)) - deal_discount;
    }

    const amount = cart?.total_amount - cart?.coupon_discount - deal_discount;
    if (isModal) return finalAmount;
    else return cart?.paymentMethod === "COD" ? amount + 1 : amount;
  };

  const initiatePayUPayments = (response) => {
    let deal_discount = 0;
    if (cart?.price_breakup?.deal_discount)
      deal_discount = cart?.price_breakup?.deal_discount;

    const save = cart?.total_amount - cart?.coupon_discount - deal_discount + 1;
    const flatDiscount = onlineDiscountType === "numeric"
      ? onlinePercent
      : (save * onlinePercent) / 100;
    const final_amount = (save - flatDiscount.toFixed(1)).toFixed(1);

    payUphoneRef.current.value = response.phone;
    payUpinRef.current.value = response.pin_code;
    payUorderRef.current.value = response.order_id;
    payUaddressRef.current.value = response.address;
    payUamountRef.current.value =
      cart?.paymentMethod === "COD"
        ? final_amount
        : cart.final_amount.toFixed(1);
    payUhashRef.current.value = response.order_token;
    payUlastnameRef.current.value = response.last_name;
    payUfirstnameRef.current.value = response.first_name;
    payUorderIdRef.current.value = response.get_order_id;
    payUproductRef.current.value = response.product_name;
    payUemailRef.current.value =
      response.email?.length > 0 ? response.email : "ayuvyauser@gmail.com";
    if (payUhashRef.current.value && payUorderIdRef.current.value) {
      setInitiatePayUScreen(true);
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, behavior: "smooth" });
      return payURef.current.click();
    }
  };

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

  // to handle duplicate order pop ups
  const handleDuplicateOrder = async () => {
    const user = JSON.parse(localStorage.getItem("AYUVYA_USERDATA"));
    const orderId = JSON.parse(localStorage.getItem("AYUVYA_ORDER_ID"));
    delete user?.order_id;
    delete user?.order_token;
    delete user?.get_order_id;
    const isEmailValid = validateEmail(user?.email);
    const email = isEmailValid ? user?.email : "";
    const response = await createOrder({
      ...user,
      email: email,
      get_order_id: orderId,
      payment_method: "COD",
      order_status: "DUPLICATE",
    });
    if (response?.error_list) {
      const error_key = Object.keys(response?.error_list)[0];
      const error_value = Object.values(response?.error_list)[0];
      const element = document.getElementById(error_key);
      if (!element) return;
      const offsetTop = element.offsetTop;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      element.focus();
      return toastMessage(error_value[0], "warn");
    } else if (response && !response?.errorMessage) {
      setLocalStorage(response);
      localStorage.setItem("ORDER_STATUS", "CONFIRMED");
      toast.dismiss(toastId.current);
      router.replace("/thank-you");
    } else toastMessage("Try again later", "error");
  };
  // to create order by method
  const createOrderByMethod = async (paymentMethod, isShipRocketOrder) => {
    let orderId = "";
    if (localStorage.getItem("AYUVYA_ORDER_ID") !== "undefined")
      orderId = JSON.parse(localStorage.getItem("AYUVYA_ORDER_ID"));
    else localStorage.removeItem("AYUVYA_ORDER_ID");

    const user = JSON.parse(localStorage.getItem("AYUVYA_USERDATA"));
    delete user?.order_id;
    delete user?.order_token;
    delete user?.get_order_id;
    toastLoading();
    const isEmailValid = validateEmail(user?.email);
    const email = isEmailValid ? user?.email : "";
    const data = {
      ...user,
      email: email,
      payment_method: paymentMethod,
      is_otp_verified: isShipRocketOrder && orderId,
      payment_gateway: initiatePayU ? "PAYU" : "CASHFREE",
    };
    return createOrder(orderId ? { ...data, get_order_id: orderId } : data);
  };

  //to handle a new order
  const handleCreateOrder = async () => {
    setDisablePaymentMode(true);
    const response = await createOrderByMethod("COD"); // create a new COD order
    setDisablePaymentMode(false);
    if (response && !response?.errorMessage) {
      setLocalStorage(response);
      setEmailError(false);
      const errorExists = response?.error;
      toast.dismiss(toastId.current);
      const error =
        errorExists?.address || errorExists?.apartment || errorExists?.house;
      if (error) return highlightAddressError(true);
      else highlightAddressError(false);
      if (response.detail === "duplicate" && !error) {
        setDuplicateOrder(true);
        setconfirmPaymentMethod(true);
        setPreviousOrderDetails(response);
      } else {
        setDuplicateOrder(false);
        setconfirmPaymentMethod(true);
      }
    } else {
      if (response?.errorMessage) {
        if (response?.errorMessage === "Enter a valid email address.")
          setEmailError(true);
        toastMessage(response?.errorMessage, error);
      } else
        toastMessage("Something went wrong! Please try again Later", error);
    }
  };

  // to check Block COD check
  const handleBlockCODCheck = async (e) => {
    const phone = e.target.value.replace(/\D/g, "");
    setUser({ ...user, phone: phone });
    localStorage.setItem(
      "AYUVYA_USERDATA",
      JSON.stringify({ ...user, phone: phone })
    );
    if (phone && phone.length === 10 && /^\d+$/.test(phone)) {
      const cartId = localStorage.getItem("AYUVYA_CART_ID_8932_6754");
      setDisablePaymentMode(true);
      setIsButtonDisabled(true);
      const resp = await blockCOD({ cart: cartId, phone: phone });
      const user = JSON.parse(localStorage.getItem("AYUVYA_USERDATA"));

      if (resp?.block_cod && user?.payment_method === "COD")
        fetchCart({}, "Prepaid", true, { ...user, phone: phone });
      setBlockCODOption(resp?.block_cod);
      setDisablePaymentMode(false);
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
      if (typeof window !== "undefined" && cart?.cart && cart?.items.length > 0) {
        const ids = cart?.items.map((product) => product.id);
        fbq.gevent("begin_checkout", { cart: cart });
        if (JSON.parse(config?.scq_active))
          window.scq("Initiate checkout", "pre_defined");
        if (JSON.parse(config?.snap_active))
          fbq.snapChat("START_CHECKOUT", { contentIds: ids, cart: cart });
        if (JSON.parse(config?.twq_active))
          fbq.twitter("InitiateCheckout", { contentIds: ids, cart: cart });
        fbq.event("InitiateCheckout", { contentIds: ids, cart: cart });
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-gray-700">
      {initiatePayUScreen && (
        <div className="absolute top-0 z-[9999] right-0 left-0 bottom-0 h-full bg-white">
          <div className="flex justify-center transition-all duration-200 ease-in-out items-center h-screen">
            <Loader />
          </div>
        </div>
      )}
      <DuplicateOrderConfirmation
        toastId={toastId}
        handleClose={handleClose}
        duplicateOrderModal={duplicateOrderModal}
        previousOrderDetails={previousOrderDetails}
        handleDuplicateOrder={handleDuplicateOrder}
        setDuplicateOrderModal={setDuplicateOrderModal}
      />
      <VerifyOtp
        otp={otp}
        user={user}
        setOtp={setOtp}
        sendOtp={sendOtp}
        phone={user.phone}
        otpModal={otpModal}
        handleClose={handleClose}
        showOtpModal={showOtpModal}
        handleCreateOrder={handleCreateOrder}
      />
      <ConfirmPaymentType
        cart={cart}
        user={user}
        setUser={setUser}
        setCart={setCart}
        handleClose={handleClose}
        productAdded={productAdded}
        onlinePercent={onlinePercent}
        setOnlineDiscountType={setOnlineDiscountType}
        setOnlinePercent={setOnlinePercent}
        onlineDiscountType={onlineDiscountType}
        setPaymentMode={setPaymentMode}
        handleCodOrder={handleCodOrder}
        duplicateOrder={duplicateOrder}
        save={calcSaveAmount(cart, true)}
        shippingAmount={cart?.shipping_amount}
        handlePrePaidOrder={handlePrePaidOrder}
        confirmPaymentMethod={confirmPaymentMethod}
        setDuplicateOrderModal={setDuplicateOrderModal}
        setconfirmPaymentMethod={setconfirmPaymentMethod}
      />
      <h1 className="text-3xl text-black mb-4 hidden lg:block">
        Ayuvya Ayurveda
      </h1>
      <h2 className="text-xl">Contact Information</h2>
      {initiatePayU && (
        <PayU
          user={user}
          payURef={payURef}
          payUpinRef={payUpinRef}
          payUhashRef={payUhashRef}
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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 my-4"
        data-clarity-unmask="true"
      >
        {/* Component contains Phone Number, Email, Keep me update, First & Last Name */}
        <PersonalDetail
          user={user}
          disableText={disableText}
          customErrors={customErrors}
          handleOnChange={handleOnChange}
          isShipRocketOrder={isShipRocketOrder}
          handleCustomError={handleCustomError}
          handleBlockCODCheck={handleBlockCODCheck}
        />
        {/* Component contains Pincode, city, state */}
        <Pincode
          user={user}
          setUser={setUser}
          disableText={disableText}
          customErrors={customErrors}
          handleOnChange={handleOnChange}
          isPincodeService={pincodeService}
          handleCustomError={handleCustomError}
          setPincodeService={setPincodeService}
          setIsButtonDisabled={setIsButtonDisabled}
          handlePincodeResponse={handlePincodeResponse}
        />
        {/* Component contains address, apartment, country, gender */}
        <AddressGender
          user={user}
          addressRef={addressRef}
          disableText={disableText}
          customErrors={customErrors}
          handleOnChange={handleOnChange}
          emailError={emailError.toString()}
          handleCustomError={handleCustomError}
        />
        {/* Component contains payment mode, save information check */}
        <SelectPaymentMode
          user={user}
          cart={cart}
          setUser={setUser}
          setCart={setCart}
          paymentMode={paymentMode}
          disableText={disableText}
          save={calcSaveAmount(cart)}
          onlinePercent={onlinePercent}
          onlineDiscountType={onlineDiscountType}
          setOnlineDiscountType={setOnlineDiscountType}
          setOnlinePercent={setOnlinePercent}
          setPaymentMode={setPaymentMode}
          handleOnChange={handleOnChange}
          blockCODOption={blockCODOption}
          activatePincode={activatePincode}
          showApplyCoupon={showApplyCoupon}
          blockCODForIgain={blockCODForIgain}
          showProductAdded={showProductAdded}
          isButtonDisabled={isButtonDisabled}
          handleApplyCoupon={handleApplyCoupon}
          setBlockCODOption={setBlockCODOption}
          disablePaymentMode={disablePaymentMode}
          setIsButtonDisabled={setIsButtonDisabled}
          partialPaymentStatus={partialPaymentStatus}
          setDisablePaymentMode={setDisablePaymentMode}
        />
        {isZippeeOrder && (
          <div className="inline-flex mt-6 gap-3">
            <FaTruckFast size={25} className="text-green-700" />
            <span className="text-green-600 text-lg font-semibold">
              Earliest Delivery by Tomorrow
            </span>
          </div>
        )}
        <Button
          type="submit"
          hideLoader={true}
          disabled={isButtonDisabled}
          className={`p-0 bg-[#1D7F75] rounded-lg flex justify-center ${!isZippeeOrder && "mt-7"
            } w-full h-14`}
        >
          <span className="text-xl flex gap-2 items-center justify-center h-full w-full text-white">
            <FaLock className="pb-1" />
            SECURE CHECKOUT <IoIosArrowForward />
          </span>
        </Button>
        <PaymentCards />
        <p className="text-xss xss:text-xs">
          By clicking secure checkout, you are confirming that you have read,
          understood and agree to{" "}
          <Link href="/terms-and-conditions" className="underline">
            terms and conditions.
          </Link>
        </p>
        <div className="lg:hidden">
          <Testimonial />
        </div>
        <TrustIcons />
      </form>
    </div>
  );
};

export default CheckoutForm;
