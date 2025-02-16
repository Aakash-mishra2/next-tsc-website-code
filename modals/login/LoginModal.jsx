import { useState } from "react";
import { toast } from "react-toastify";
import SignInModal from "./SignInModal";
import { useDispatch } from "react-redux";
import RegisterModal from "./RegisterModal";
import VerifyOtpModal from "./VerifyOtpModal";
import CommonModal from "../../common/custom/CommonModal";
import { sendOTP } from "../../../store/slices/authSlice";
import { verifyOTP } from "../../../store/slices/authSlice";

const LoginModal = ({ openModal, handleClose }) => {
  const [user, setUser] = useState({
    phone: "",
    gender: "",
    emailId: "",
    referralCode: "",
  });
  const [otp, setOtp] = useState();
  const dispatch = useDispatch();
  const [currentModal, setCurrentModal] = useState(1);

  const sendOtp = (e) => {
    e.preventDefault();
    const data = { phone: user.phone };
    dispatch(sendOTP(data)).then(() => {
      setCurrentModal(2);
    });
  };

  const verify = (e) => {
    e.preventDefault();
    dispatch(verifyOTP())
      .then(() => setCurrentModal(3))
      .then(() => toast.success("Account created successfully"));
  };

  // to handle changes of state
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prevFields) => ({ ...prevFields, [name]: value }));
  };

  return (
    <CommonModal openModal={openModal} handleClose={handleClose}>
      <div className="p-4">
        {currentModal === 1 && (
          <SignInModal
            user={user}
            sendOtp={sendOtp}
            handleOnChange={handleOnChange}
          />
        )}
        {currentModal === 2 && (
          <VerifyOtpModal
            otp={otp}
            user={user}
            setOtp={setOtp}
            verify={verify}
            handleClose={handleClose}
            setCurrentModal={setCurrentModal}
          />
        )}
        {currentModal === 3 && (
          <RegisterModal
            user={user}
            handleClose={handleClose}
            handleOnChange={handleOnChange}
          />
        )}
      </div>
    </CommonModal>
  );
};

export default LoginModal;
