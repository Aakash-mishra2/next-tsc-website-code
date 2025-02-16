import Form from "../common/Form";
import { toast } from "react-toastify";
import config from "../../config/config";
import { states } from "../../data/state";

const UpdatePincode = ({
  user,
  setUser,
  handleOnChange,
  setPincodeService,
}) => {
  const BASE_URL = config.BASE_URL;
  const handleKeyPress = (e) => {
    const allowedKeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ];
    if (!allowedKeys.includes(e.key)) e.preventDefault();
  };

  const handlePincodeResponse = async (resp, enteredPincode) => {
    if (resp.message === "nonserviceable") {
      setPincodeService(true);
      setUser({ ...user, pin_code: enteredPincode, city: "", state: "" });
      toast.warn("Your pincode is not serviceable", { autoClose: 2000 });
    } else {
      setPincodeService(false);
      const data = {
        pin_code: resp.data.pincode,
        city: resp.data?.city,
        state: resp.data?.state[0] + resp.data?.state.toLowerCase().slice(1),
      };
      setUser({ ...user, ...data });
      localStorage.setItem(
        "AYUVYA_USERDATA",
        JSON.stringify({ ...user, ...data })
      );
    }
  };

  const handlePinCode = async (e) => {
    const enteredPincode =
      e.target.value.length > 6 ? e.target.value.slice(0, 6) : e.target.value;
    setUser({ ...user, pin_code: enteredPincode });
    localStorage.setItem(
      "AYUVYA_USERDATA",
      JSON.stringify({ ...user, pin_code: enteredPincode })
    );
    if (e.target.value.length === 6 && /^[0-9]{6}$/.test(e.target.value)) {
      const resp = await fetch(
        `${BASE_URL}check-pincode/?pincode=` + e.target.value
      )
        .then((resp) => resp.json())
        .catch((err) => console.log("Error: " + err.message));
      handlePincodeResponse(resp, enteredPincode); // to set state of Cash of delivery service
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-5 mt-0 lg:mt-3">
      <div className="w-full lg:w-1/3 mt-3 lg:mt-0">
        <Form
          type="text"
          id="pin_code"
          maxLength={6}
          minLength={6}
          name="pin_code"
          disabled={true}
          label="Pincode *"
          inputMode="numeric"
          pattern="^[1-9]\d{5}$"
          value={user?.pin_code}
          onChange={handlePinCode}
          onKeyPress={handleKeyPress}
          title="Must contain numbers only"
          required
        />
      </div>
      <div className="w-full lg:w-1/3 mt-3 lg:mt-0">
        <Form
          id="city"
          type="text"
          name="city"
          minLength="3"
          maxLength="60"
          disabled={true}
          value={user.city}
          label="City/district *"
          onChange={handleOnChange}
          pattern="^[A-Za-z\s\-\(\)_&]{3,60}$"
          title="Must contains 3 Characters & A-Z a-z characters Only"
          required
        />
      </div>
      <div className="w-full lg:w-1/3 mt-3 lg:mt-0">
        <div className="relative">
          <select
            id="state"
            type="text"
            name="state"
            disabled={true}
            value={user?.state}
            onChange={handleOnChange}
            className="block px-2.5 pb-2.5 pt-4 w-full text-lg text-gray-500 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
            required
          >
            <option value="">Select state</option>
            {states.map((state) => {
              return (
                <option key={state.id} value={state?.name}>
                  {state?.name}
                </option>
              );
            })}
          </select>
          <label
            htmlFor="state"
            className="absolute rounded-lg text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
          >
            State
          </label>
        </div>
      </div>
    </div>
  );
};

export default UpdatePincode;
