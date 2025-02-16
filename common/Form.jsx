import { TiTick } from "react-icons/ti";
import { BiSolidError } from "react-icons/bi";

const Form = (props) => {
  let errorMessage = props.customerrors?.error;
  let successMessage = props.customerrors?.success;

  if (
    (props?.name === "apartment" && props.reference?.current?.error) ||
    (props?.name === "pin_code" && props?.ispincodeservice === "true") ||
    (props?.name === "email" && props?.emailerror === "true")
  ) {
    if (props?.name === "pin_code")
      errorMessage = "Your Pincode is not serviceable";
    if (props?.name === "email") errorMessage = "Invalid Email Address";
    if (props?.name === "apartment") errorMessage = "Address too short";
    successMessage = "";
  }
  return (
    <div className="relative">
      <input
        {...props}
        onBlur={props.onBlur}
        ref={props?.reference}
        onChange={props.onChange}
        value={props.value || ""}
        className={`${props.disabled ? "bg-gray-100" : "bg-transparent"} ${
          errorMessage
            ? "border-red-400 transition-all duration-200 ease-in-out opacity-50"
            : successMessage === "showBorder" &&
              props?.value &&
              props?.value.toString().length > 0 &&
              "border-green-500 transition-all duration-200 ease-in-out opacity-70"
        } block pl-2.5 pb-2.5 pt-4 pr-10 w-full text-lg text-gray-900 rounded-lg border border-gray-300 appearance-none focus:outline-0 focus:outline-none focus:border-gray-500 peer`}
        placeholder=" "
      />
      {errorMessage && (
        <div className="absolute transition-all duration-200 ease-in-out right-3 top-5 text-red-400">
          <BiSolidError size={20} />
        </div>
      )}
      {successMessage === "showBorder" &&
        props?.value.toString().length > 0 && (
          <div className="absolute transition-all duration-200 ease-in-out right-3 top-5 text-green-400">
            <TiTick size={20} />
          </div>
        )}
      <label
        htmlFor={props.id}
        className={`${
          props?.className
        } absolute rounded-lg text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:w-auto ${
          props?.customerrors && props?.customerrors?.required
            ? "peer-placeholder-shown:top-[35%]"
            : "peer-placeholder-shown:top-1/2"
        } peer-focus:top-0 peer-focus:scale-75 peer-focus:w-auto peer-focus:-translate-y-4 left-3`}
      >
        {props.label}
      </label>
      {errorMessage && (
        <p className="text-red-400 transition-all duration-200 ease-in-out text-xss xsss:text-xs xss:text-sm mt-1 xss:font-semibold">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Form;
