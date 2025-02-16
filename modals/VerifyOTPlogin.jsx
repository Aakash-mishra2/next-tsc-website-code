import { useState } from "react";
import { toast } from "react-toastify";
import OTPInput from "react-otp-input";
import { Form, Button } from "../common";
import { useDispatch } from "react-redux";
import { CommonModal } from "../common/custom";
import { BsArrowLeftShort } from "react-icons/bs";
import { sendOTP } from "../../store/slices/authSlice";
import { verifyOTP } from "../../store/slices/authSlice";
import { createOrder } from "../../store/slices/orderSlice";

const VerifyOTPlogin = ({ user, otpModal, setScreenBasedOnPayment, phone }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(phone);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [updateNumberScreen, setUpdateNumberScreen] = useState(false);

  const resendOTP = () => {
    dispatch(sendOTP({ phone: currentNumber, email: user?.email })).then(() =>
      setOtp(null)
    );
  };
  const handleverifyOtp = async (e) => {
    e.preventDefault();
    if (/^\d+$/.test(otp) && otp.length === 4) {
      setIsButtonDisabled(true);
      dispatch(verifyOTP({ phone: currentNumber, otp: otp }))
        .then((response) => {
          if (response.meta?.requestStatus === "fulfilled") {
            const user = JSON.parse(localStorage.getItem("AYUVYA_USERDATA"));
            const orderId = JSON.parse(localStorage.getItem("AYUVYA_ORDER_ID"));
            delete user?.order_id;
            delete user?.order_token;
            dispatch(
              createOrder({
                ...user,
                get_order_id: orderId,
                is_phone_verified: true,
                payment_method: "Prepaid",
              })
            ).then((response) => {
              if (response.meta?.requestStatus === "fulfilled") {
                setIsButtonDisabled(false);
                setScreenBasedOnPayment("SUCCESS");
                // navigate("/thank-you");
              }
            });
          }
          if (response.error?.message === "Rejected") {
            setOtp(null);
            setIsButtonDisabled(false);
            return toast.error("Wrong OTP! Try Again.");
          }
        })
        .catch(() => {
          setOtp(null);
          setIsButtonDisabled(false);
          return toast.error("Wrong OTP");
        });
    } else return toast.warn("Invalid OTP");
    setIsButtonDisabled(false);
  };
  const sendOtpToNewNumber = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    const orderId = localStorage.getItem("AYUVYA_ORDER_ID");
    dispatch(
      createOrder(
        orderId
          ? { get_order_id: orderId, ...user, phone: currentNumber }
          : { ...user, phone: currentNumber }
      )
    ).then(() =>
      dispatch(sendOTP({ phone: currentNumber, email: user?.email })).then(
        () => {
          setOtp(null);
          setIsButtonDisabled(false);
          setUpdateNumberScreen(false);
          setCurrentNumber(currentNumber);
        }
      )
    );
  };
  return (
    <CommonModal openModal={otpModal && phone.length === 10}>
      <div className="p-4 w-[22rem] lg:w-80">
        {updateNumberScreen ? (
          <div>
            <div className="flex items-center">
              <div
                onClick={() => {
                  if (currentNumber.length !== 10)
                    return toast.error("Invalid phone number");
                  else {
                    setCurrentNumber(phone);
                    setUpdateNumberScreen(false);
                  }
                }}
                className="bg-slate-200 rounded-md mr-5 hover:bg-slate-300 transition-all duration-200"
              >
                <BsArrowLeftShort size={30} className="text-slate-500" />
              </div>
              <h2 className="text-2xl text-center font-medium text-gray-500">
                Enter Your Number
              </h2>
            </div>
            <form onSubmit={sendOtpToNewNumber}>
              <div className="mt-5">
                <Form
                  id="phone"
                  type="text"
                  name="phone"
                  inputMode="numeric"
                  pattern="^[6-9]\d{9}"
                  maxLength="10"
                  title="Please enter a 10-digit number starting from 6 to 9"
                  label="Phone Number *"
                  value={currentNumber}
                  onChange={(e) => setCurrentNumber(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <Button
                type="submit"
                disabled={isButtonDisabled}
                className="w-full h-12 bg-black text-white mt-5"
              >
                <span className="w-full text-xl">Send OTP</span>
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center text-center text-gray-400">
            <h2 className="text-3xl font-medium text-gray-500">Enter OTP</h2>
            <p className="pt-5">
              OTP has been sent to your mobile number +91 {currentNumber}.
            </p>
            <p className="py-2 font-semibold">
              Not your number?{" "}
              <span
                className="hover:underline hover:underline-offset-2 cursor-pointer"
                onClick={() => setUpdateNumberScreen(true)}
              >
                Click here.
              </span>
            </p>
            <form onSubmit={handleverifyOtp}>
              <OTPInput
                value={otp}
                inputType="number"
                containerStyle="mt-4 mb-8 flex justify-between text-xl"
                onChange={(otp) => setOtp(otp)}
                numInputs={4}
                shouldAutoFocus={true}
                inputStyle="md:min-w-[3.1em] md:min-h-[3.1em] lg:min-w-[3rem] lg:min-h-[3rem] min-w-[4rem] min-h-[4rem] rounded-lg bg-white border border-gray-400 mx-2 text-xl text-primary outline-none border border-primary"
                renderInput={(props) => <input {...props} />}
              />
              <Button
                type="submit"
                disabled={isButtonDisabled}
                className="w-full h-12 bg-black text-white"
              >
                <span className="w-full text-xl">Submit</span>
              </Button>
            </form>
            <div className="py-2">
              <p className="">Haven&apos;t received your code?</p>
              <p
                onClick={resendOTP}
                className="hover:underline hover:underline-offset-2 cursor-pointer"
              >
                Resend OTP
              </p>
            </div>
          </div>
        )}
      </div>
    </CommonModal>
  );
};

export default VerifyOTPlogin;
