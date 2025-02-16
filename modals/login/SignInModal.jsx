import Form from "../../common/Form";
import Button from "../../common/Button";
import { FaUserCircle } from "react-icons/fa";

const SignInModal = ({ sendOtp, handleOnChange, user }) => {
  return (
    <div className="w-80">
      <div className="text-center">
        <FaUserCircle size={100} className="mx-auto my-5" />
        <h2 className="text-3xl font-semibold mb-8">Login / Register</h2>
        <form onSubmit={sendOtp}>
          <div className="my-5">
            <Form
              id="phone"
              type="text"
              name="phone"
              pattern="^[6-9]\d{9}"
              maxLength="10"
              title="Please enter a 10-digit number starting from 6 to 9"
              label="Enter your mobile number *"
              value={user.phone}
              onChange={handleOnChange}
              required
              autoFocus
            />
          </div>
          <p className="text-sm text-slate-400 mb-5">
            A 4-digit OTP will be sent via SMS to verify your mobile number.
          </p>
          <Button
            type="submit"
            className="bg-black w-full py-3 flex justify-center text-xl text-white hover:bg-black/80 cursor-none lg:cursor-pointer"
          >
            SEND OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;
