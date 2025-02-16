import OTPInput from "react-otp-input";
import Button from "../../common/Button";
import { useDispatch } from "react-redux";
import { sendOTP } from "../../../store/slices/authSlice";

const VerifyOtpModal = ({ user, otp, setOtp, verify, setCurrentModal }) => {
  const dispatch = useDispatch();
  const resendOTP = () => {
    const data = {
      phone: user.phone,
    };
    dispatch(sendOTP(data)).then(() => setOtp(null));
  };
  return (
    <div className="w-80">
      <div className="text-center">
        <div className="">
          <div className="flex flex-col justify-center items-center text-center text-gray-400">
            <h2 className="text-3xl font-medium text-gray-500">
              Verify Mobile Number
            </h2>
            <p className="pt-5">
              OTP has been sent to your mobile number +91 {user.phone}.
            </p>
            <p className="py-5">
              Not your number?{" "}
              <span
                className="hover:underline hover:underline-offset-2 cursor-pointer"
                onClick={() => setCurrentModal(1)}
              >
                Click here.
              </span>
            </p>
            <form onSubmit={verify}>
              <OTPInput
                value={otp}
                containerStyle="mt-4 mb-8 flex justify-between text-xl"
                onChange={(otp) => setOtp(otp)}
                numInputs={4}
                shouldAutoFocus={true}
                inputStyle="md:min-w-[3.1em] shadow-3xl md:min-h-[3.1em] lg:min-w-[3rem] lg:min-h-[3rem] min-w-[4rem] min-h-[4rem] rounded-lg bg-white border border-gray-400 mx-2 text-xl text-primary outline-none border border-primary"
                renderInput={(props) => <input {...props} />}
              />
              <Button
                type="submit"
                className="w-full h-12 bg-gray-400 text-white hover:bg-gray-400/80"
              >
                <span className="w-full text-lg">VERIFY & PROCEED</span>
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
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpModal;
