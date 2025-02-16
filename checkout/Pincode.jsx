import React from "react";
import Form from "../common/Form";
import { TiTick } from "react-icons/ti";
import { states } from "../../data/state";
import { pincodeCheck } from "@/api/orderAPI";
import { BiSolidError } from "react-icons/bi";
import { handleKeyPress, valid } from "@/api/generalFunc";

const Pincode = ({
  user,
  setUser,
  disableText,
  customErrors,
  handleOnChange,
  isPincodeService,
  handleCustomError,
  setIsButtonDisabled,
  handlePincodeResponse,
}) => {
  const handlePinCode = async (e) => {
    try {
      const enteredPincode = e.target.value.replace(/\D/g, "");
      setUser({ ...user, pin_code: enteredPincode });
      if (e.target.value.length === 6 && /^[0-9]{6}$/.test(e.target.value)) {
        setIsButtonDisabled(true);
        const resp = await pincodeCheck(e.target.value);
        handlePincodeResponse(resp, enteredPincode);
        setIsButtonDisabled(false);
      }
    } catch (error) {
      console.log("Pincode Error: " + error);
    } finally {
      setIsButtonDisabled(false);
    }
  };
  let validateState = valid.inputField(customErrors, "state");
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-5 mt-0 lg:mt-3">
      <div className="w-full lg:w-1/3 mt-3 lg:mt-0">
        <Form
          type="text"
          id="pin_code"
          maxLength={6}
          name="pin_code"
          label="Pincode *"
          inputMode="numeric"
          value={user.pin_code}
          disabled={disableText}
          onChange={handlePinCode}
          onBlur={handleCustomError}
          onKeyPress={handleKeyPress}
          ispincodeservice={isPincodeService.toString()}
          customerrors={valid.inputField(customErrors, "pin_code")}
        />
      </div>
      <div className="w-full lg:w-1/3 mt-3 lg:mt-0">
        <Form
          id="city"
          type="text"
          name="city"
          maxLength="60"
          value={user.city}
          disabled={disableText}
          label="City/district *"
          onChange={handleOnChange}
          onBlur={handleCustomError}
          customerrors={valid.inputField(customErrors, "city")}
        />
      </div>
      <div className="w-full lg:w-1/3 mt-3 lg:mt-0">
        <div className="relative">
          <select
            id="state"
            name="state"
            disabled={disableText}
            className={`block px-2.5 pb-2.5 pt-4 w-full text-lg ${
              user?.state && user?.state.toString().length > 0
                ? "border-1 border-green-500 opacity-70"
                : validateState?.error
                ? "border-1 border-red-400 transition-all duration-200 ease-in-out opacity-50"
                : ""
            } text-gray-500 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer`}
            value={user?.state}
            onBlur={handleCustomError}
            onChange={handleOnChange}
          >
            <option value="">Select state</option>
            {states.map((state) => {
              return (
                <React.Fragment key={state.id}>
                  <option value={state?.name}>{state?.name}</option>
                </React.Fragment>
              );
            })}
          </select>
          {validateState?.error && (
            <div className="absolute transition-all duration-200 ease-in-out right-3 top-5 text-red-400">
              <BiSolidError size={20} />
            </div>
          )}
          {validateState?.success === "showBorder" &&
            user.state.toString() !== "NaN" && (
              <div className="absolute transition-all duration-200 ease-in-out right-3 top-5 text-green-400">
                <TiTick size={20} />
              </div>
            )}
          {validateState?.error && (
            <p className="text-red-400 transition-all duration-200 ease-in-out text-[14px] mt-1 font-semibold">
              {validateState?.error}
            </p>
          )}
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

export default Pincode;
