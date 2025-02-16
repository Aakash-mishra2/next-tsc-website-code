import Form from "../../common/Form";
import Button from "../../common/Button";

const RegisterModal = ({ user, handleOnChange }) => {
  // const dispatch = useDispatch();
  const referralCodeAvailable = (e) => {
    e.preventDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(registerUser(user))
    //   .then(() => handleClose())
    //   .then(() => toast.success("User registered successfully!"));
  };
  return (
    <div className="w-80">
      <h2 className="text-3xl text-center font-semibold">Login / Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <Form
            id="emailId"
            type="email"
            name="emailId"
            maxLength="50"
            label="Email (Optional)"
            pattern="^[a-zA-Z0-9\s,'.-]*$"
            value={user.emailId}
            onChange={handleOnChange}
          />
        </div>
        <div className="mt-5">
          <Form
            type="text"
            maxLength="50"
            id="first_name"
            name="first_name"
            pattern="^[A-Za-z\s]{3,50}$"
            label="First Name *"
            value={user.first_name}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="mt-5">
          <div className="relative">
            <select
              id="gender"
              name="gender"
              className="block px-2.5 pb-2.5 pt-4 w-full text-lg text-gray-500 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
              value={user?.gender}
              onChange={handleOnChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <label
              htmlFor="gender"
              className="absolute rounded-lg text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
            >
              Gender
            </label>
          </div>
        </div>
        <div className="mt-5">
          <div className="border border-gray-300 rounded-full pl-4 pr-1 flex justify-between items-center mt-3">
            <input
              type="text"
              id="referralCode"
              name="referralCode"
              placeholder="Referral Code"
              className="py-3 w-full rounded-md font-medium outline-none"
              value={user.referralCode}
              onChange={handleOnChange}
            />
            <span
              onClick={referralCodeAvailable}
              className="bg-gray-500 px-8 rounded-full text-white py-2 cursor-none lg:cursor-pointer hover:bg-gray-500/80"
            >
              Apply
            </span>
          </div>
        </div>
        <Button
          type="submit"
          className="p-0 bg-gray-400 mt-5 rounded-lg flex justify-center w-full h-14 hover:bg-gray-400/80"
        >
          <span className="text-xl flex items-center justify-center h-full w-full text-white">
            Register
          </span>
        </Button>
      </form>
    </div>
  );
};

export default RegisterModal;
