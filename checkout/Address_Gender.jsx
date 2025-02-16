import Form from "../common/Form";
import { TiTick } from "react-icons/ti";
import { BiSolidError } from "react-icons/bi";
import { handleKeyPress, valid } from "@/api/generalFunc";

const Address_Gender = ({
  user,
  addressRef,
  emailError,
  disableText,
  customErrors,
  handleOnChange,
  handleCustomError,
}) => {
  const validateGender = valid?.inputField(customErrors, "gender");
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="w-full mt-3">
          <Form
            type="text"
            id="address"
            name="address"
            maxLength={130}
            value={user?.address}
            label="Flat, House no., Building, Company, Apartment *"
            className="line-clamp-1 text-sm md:text-lg top-1 peer-focus:top-1"
            onChange={handleOnChange}
            onBlur={handleCustomError}
            customerrors={valid.inputField(customErrors, "address")}
          />
        </div>
        <div className="w-full mt-3">
          <Form
            type="text"
            id="apartment"
            maxLength={200}
            name="apartment"
            reference={addressRef}
            value={user?.apartment}
            onChange={handleOnChange}
            onBlur={handleCustomError}
            label="Area, Street, Sector, Village *"
            className="line-clamp-1 text-sm md:text-lg top-1 peer-focus:top-1"
            customerrors={valid.inputField(customErrors, "apartment")}
          />
        </div>
      </div>
      <div className="w-full mt-3">
        <Form
          type="text"
          id="landmark"
          name="landmark"
          maxLength={100}
          value={user?.landmark}
          onBlur={handleCustomError}
          label="Landmark (Optional)"
          onChange={handleOnChange}
          customerrors={valid.inputField(customErrors, "landmark")}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-5">
        <div className="w-full lg:w-1/2 mt-3">
          <div className="relative">
            <select
              id="country"
              name="country"
              value={"India"}
              disabled={disableText}
              onChange={handleOnChange}
              onBlur={handleCustomError}
              className="block px-2.5 pb-2.5 pt-4 w-full text-lg text-gray-500 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
              required
            >
              <option value="India">India</option>
            </select>
            <label
              htmlFor="country"
              className="absolute rounded-lg text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
            >
              Country
            </label>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mt-3">
          <div className="relative">
            <select
              id="gender"
              name="gender"
              disabled={disableText}
              className={`block ${
                user?.gender && user?.gender.toString().length > 0
                  ? "border-1 border-green-500 opacity-70"
                  : validateGender?.error
                  ? "border-1 border-red-400 transition-all duration-200 ease-in-out opacity-50"
                  : ""
              } px-2.5 pb-2.5 pt-4 w-full text-lg text-gray-500 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer`}
              value={user?.gender}
              onBlur={handleCustomError}
              onChange={handleOnChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {user?.gender && user?.gender.toString().length > 0 && (
              <div className="absolute transition-all duration-200 ease-in-out right-3 top-5 text-green-400">
                <TiTick size={20} />
              </div>
            )}
            {validateGender?.error && (
              <div className="absolute transition-all duration-200 ease-in-out right-3 top-5 text-red-400">
                <BiSolidError size={20} />
              </div>
            )}
            {validateGender?.error && (
              <p className="text-red-400 transition-all duration-200 ease-in-out text-[14px] mt-1 font-semibold">
                {validateGender?.error}
              </p>
            )}
            <label
              htmlFor="gender"
              className="absolute rounded-lg text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
            >
              Gender
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-5 items-center">
        <div className="w-full lg:w-1/2 mt-3">
          <Form
            id="email"
            type="text"
            name="email"
            maxLength={200}
            value={user?.email}
            disabled={disableText}
            emailerror={emailError}
            label="Email (Optional)"
            onChange={handleOnChange}
            onBlur={handleCustomError}
            customerrors={valid.inputField(customErrors, "email")}
          />
        </div>
        <div className="w-full lg:w-1/2 mt-3">
          <Form
            type="text"
            maxLength="10"
            inputMode="numeric"
            id="alternate_phone"
            name="alternate_phone"
            disabled={disableText}
            onChange={handleOnChange}
            onBlur={handleCustomError}
            onKeyPress={handleKeyPress}
            label="Alternate Number (Optional)"
            value={user?.alternate_phone || ""}
            className="text-sm xsss:text-lg lg:text-sm top-1 peer-focus:top-1 lg:top-[6px] lg:peer-focus:top-[6px]"
            customerrors={valid.inputField(customErrors, "alternate_phone")}
          />
        </div>
      </div>
    </>
  );
};

export default Address_Gender;
