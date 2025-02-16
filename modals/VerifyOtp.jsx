"use client";

import OtpInput from "./OtpInput";
import { Button } from "../common";
import { toast } from "react-toastify";
import Counter from "../login/Counter";
import { verifyOTP } from "@/api/authAPI";
import { useRouter } from "next/navigation";
import { VscChromeClose } from "react-icons/vsc";
import { useEffect, useRef, useState } from "react";
import CommonModal from "../common/custom/CommonModal";

const VerifyOtp = ({
  showOtpModal,
  handleClose,
  otpModal,
  sendOtp,
  phone,
  user,
}) => {
  const router = useRouter();
  const toastVerifyId = useRef(null);
  const [otp, setOtp] = useState("");
  const onChange = (value) => setOtp(value);

  const [disableModal, setDisableModal] = useState(false);
  const [isToastActive, setIsToastActive] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // resend otp
  const resendOTP = () => {
    sendOtp({ phone: phone, email: user?.email });
    setOtp("");
  };

  const showMessage = () => {
    setIsToastActive(true);
    if (!isToastActive) {
      toast.warn("Enter a valid OTP", { autoClose: 2000 });
      setTimeout(() => setIsToastActive(false), 3000);
    }
  };

  const handleCloseModal = () => {
    if (disableModal) return;
    setOtp("");
    handleClose();
  };

  const toastMessage = (message, type, autoClose) =>
    toast.update(toastVerifyId.current, {
      type: type,
      render: message,
      autoClose: autoClose ?? 2000,
      isLoading: false,
    });

  const toastLoading = () =>
    (toastVerifyId.current = toast("Please wait...", {
      autoClose: false,
      isLoading: true,
    }));

  const resetComponent = () => {
    localStorage.removeItem("AYUVYA_ORDER_ID");
    setOtp("");
    return handleClose();
  };

  const handleverifyOtp = async (e) => {
    e.preventDefault();
    if (/^\d+$/.test(otp) && otp.trim().length === 4) {
      const orderId = localStorage.getItem("AYUVYA_ORDER_ID");
      if (orderId === "undefined" || !orderId || orderId === null)
        return resetComponent();
      toastLoading();
      setDisableModal(true);
      setIsButtonDisabled(true);
      const response = await verifyOTP({
        otp: otp,
        token: true,
        phone: phone,
        get_order_id: orderId,
      });
      setIsButtonDisabled(false);
      if (response.message === "order_id_not_existed") {
        setDisableModal(false);
        return resetComponent();
      }
      if (
        response.message === "success" ||
        response.message === "already_confirmed"
      ) {
        if (response?.token)
          localStorage.setItem("AYUVYA_USER_TOKEN", response.token);
        localStorage.setItem("ORDER_STATUS", "CONFIRMED");
        // toast.dismiss(toastVerifyId.current);
        router.replace("/thank-you");
      } else if (response.message === "checkout_not_found") {
        setDisableModal(false);
        toast.dismiss(toastVerifyId.current);
        return resetComponent();
      } else if (response.message === "invalid") {
        setDisableModal(false);
        toastMessage("Enter a valid OTP!", "warn", 1000);
        setOtp("");
      } else {
        setDisableModal(false);
        toastMessage("Please try again!", "error", 1000);
        setOtp("");
      }
    } else {
      setDisableModal(false);
      showMessage();
      setOtp("");
    }
  };

  useEffect(() => {
    if (otpModal && phone.length === 10)
      document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [otpModal, phone.length]);

  return (
    <CommonModal
      handleClose={handleClose}
      openModal={otpModal && phone.length === 10}
      notAllowClickAnywhere={() => showOtpModal(true)}
    >
      <div className="max-w-screen md:max-w-[350px] rounded-[12px]">
        <div className="flex justify-end">
          <VscChromeClose
            size={25}
            onClick={handleCloseModal}
            className="text-gray-500 cursor-none lg:cursor-pointer"
          />
        </div>
        <div className="flex flex-col justify-center items-center text-center text-gray-400">
          <h2 className="text-3xl font-medium text-gray-500">Enter OTP</h2>
          <p className="pt-5">
            OTP has been sent to your mobile number +91 {phone}.
          </p>
          <p className="py-5">
            Not your number?{" "}
            <span
              onClick={handleCloseModal}
              className="hover:underline hover:underline-offset-2 cursor-pointer"
            >
              Click here.
            </span>
          </p>
          <form onSubmit={handleverifyOtp}>
            <OtpInput value={otp} onChange={onChange} valueLength={4} />
            <Button
              type="submit"
              disabled={isButtonDisabled}
              className="w-full h-12 bg-black text-white text-xl"
            >
              Submit
            </Button>
          </form>
          <div className="py-2">
            <p className="">Haven&apos;t received your code?</p>
            <div className="w-full">
              <div className="block p-2 text-brand-50 mx-auto text-center">
                <Counter resendOTP={resendOTP} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

export default VerifyOtp;
