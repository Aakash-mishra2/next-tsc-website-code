import Image from "next/image";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button, Form } from "@/components/common";
import UpdatePincode from "../../checkout/UpdatePincode";
import ToastProvider from "@/components/common/ToastProvider";
import { updateUserAddress } from "@/api/orderAPI";
import { valid } from "@/api/generalFunc";
import { valiDateFormByCustomChecks } from "@/components/checkout/validateForm";

const UpdateAddress = ({ userDetails, checkoutId }) => {
  const router = useRouter();
  const toastId = useRef(null);
  const addressRef = useRef(null);
  const [pincodeService, setPincodeService] = useState(false);
  const [customErrors, setCustomErrors] = useState([]); // to set the custom errors


  // customer details
  const [user, setUser] = useState({
    city: userDetails?.city || "",
    state: userDetails?.state || "",
    address: userDetails?.address || "",
    pin_code: userDetails?.pin_code || "",
    landmark: userDetails?.landmark || "",
    apartment: userDetails?.apartment || "",
    country: "India",
  });

  const valiDateForm = async (data) => {
    const messages = [];
    if (!data?.city || data?.city.trim().length < 3)
      messages.push("City / District must be atleast 3 characters");
    if (!data?.address || data?.address.trim().length < 1)
      messages.push("House number is required");
    if (!data?.apartment || data?.apartment.trim().length < 3)
      messages.push("Road, Area, Colony must be atleast 3 characters");
    return messages;
  };

  const handleCustomError = () => {
    Object.keys(user).forEach(
      (k) => (user[k] = typeof user[k] == "string" ? user[k].trim() : user[k])
    );
    const customErrors = valiDateFormByCustomChecks(user);
    return setCustomErrors(customErrors?.error);
  };

  const handleSubmit = async (e) => {
    Object.keys(user).forEach(
      (k) => (user[k] = typeof user[k] == "string" ? user[k].trim() : user[k])
    );
    e.preventDefault();
    const customErrors = valiDateFormByCustomChecks({ ...user, country: "India" }, "clicked");
    if(!customErrors?.isErrorOrdered){
      return setCustomErrors(customErrors?.error);
    }
    // if (errors.length > 0) {
    //   if (errors[0]?.includes("House") || errors[0]?.includes("Road"))
    //     window.scrollTo({ top: 500, behavior: "smooth" });
    //   else window.scrollTo({ top: 200, behavior: "smooth" });
    //   return toast.warn(errors[0]);
    // }
    if (pincodeService)
      return toast.warn("Your pincode is not serviceable", { autoClose: 2000 });
    toastId.current = toast("Please wait...", { isLoading: true });
    const response = await updateUserAddress(user, checkoutId);
    if (response.addresschange_from_message) {
      toast.update(toastId.current, {
        type: "warn",
        render: "Your address has been changed already.",
        autoClose: 2000,
        isLoading: false,
      });
      return router.replace("/collection/ayurvedic-products");
    }
    if (!response.is_valid && response.errors?.address) {
      highlightAddressError(true);
      toast.update(toastId.current, {
        type: "error",
        render: response.errors.address.toString(),
        autoClose: 3000,
        isLoading: false,
      });
    } else highlightAddressError(false);
    if (
      response.order_status === "CONFIRMED" &&
      response?.is_otp_verified &&
      response?.is_valid
    ) {
      localStorage.setItem("ORDER_STATUS", "CONFIRMED");
      toast.update(toastId.current, {
        type: "success",
        render: "Successfully!🎉 Your address has been changed.",
        autoClose: 2000,
        isLoading: false,
      });
      setLocalStorage(response);
      router.replace("/thank-you");
    }
  };
  // set local storage
  const setLocalStorage = (response) => {
    const userDetails = response?.userDetails;
    if (userDetails.get_order_id)
      localStorage.setItem("AYUVYA_ORDER_ID", userDetails.get_order_id);
    if (userDetails.order_id)
      localStorage.setItem("AYUVYA_UPDATED_ORDER_ID", userDetails.order_id);
    localStorage.setItem("AYUVYA_CART_ID_8932_6754", response.cart);
    delete userDetails.order_id;
    delete userDetails.order_token;
    delete userDetails.get_order_id;
    localStorage.setItem("AYUVYA_USERDATA", JSON.stringify(userDetails));
  };
  // to highlight address errors
  const highlightAddressError = (isError) => {
    if (isError && addressRef.current) {
      addressRef.current.focus();
      addressRef.current.style.border = "5px solid red";
      addressRef.current.style.opacity = "0.5";
      return;
    } else {
      addressRef.current.focus();
      addressRef.current.style.border = "1px solid #d1d5dbd9";
      addressRef.current.style.opacity = "1";
    }
  };
  // to handle changes of state
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prevFields) => ({ ...prevFields, [name]: value }));
  };

  return (
    <ToastProvider>
      <div className="w-96 mx-auto overflow-auto example md:w-[32rem] lg:w-[35rem] p-2">
        <div className="flex justify-center mt-5 mb-10">
          <Image
            width={100}
            height={100}
            priority
            src={
              "https://storage.googleapis.com/ayuvya_images/product_image/address_icon_assetimageother_17april2024.png"
            }
            alt="Cart Expired"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <UpdatePincode
            user={user}
            setUser={setUser}
            handleOnChange={handleOnChange}
            setPincodeService={setPincodeService}
          />
          <div className="flex flex-col md:flex-row md:gap-5">
            <div className="w-full md:w-1/2 mt-5">
              <Form
                type="text"
                id="address"
                name="address"
                maxLength={130}
                value={user?.address}
                label="House number *"
                onChange={handleOnChange}
                onBlur={handleCustomError}
                customerrors={valid.inputField(customErrors, "address")}
              />
            </div>
            <div className="w-full md:w-1/2 mt-5">
              <Form
                type="text"
                id="landmark"
                name="landmark"
                maxLength={100}
                value={user?.landmark}
                label="Landmark (Optional)"
                onChange={handleOnChange}
                onBlur={handleCustomError}
                customerrors={valid.inputField(customErrors, "landmark")}
              />
            </div>
          </div>
          <div className="w-full mt-5">
            <Form
              type="text"
              minLength={3}
              id="apartment"
              maxLength={200}
              name="apartment"
              reference={addressRef}
              value={user?.apartment}
              onChange={handleOnChange}
              label="Road, Area, Colony *"
              onBlur={handleCustomError}
              customerrors={valid.inputField(customErrors, "apartment")}
            />
          </div>
          <div className="w-full mt-5">
            <div className="relative">
              <select
                id="country"
                name="country"
                value={"India"}
                onChange={handleOnChange}
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
          <div className="flex justify-center pt-5">
            <Button
              type="submit"
              className="p-0 bg-gray-400 rounded-lg flex justify-center w-full lg:w-40 h-14 hover:bg-white hover:text-gray-400 hover:border hover:border-gray-400"
            >
              <span className="text-xl flex items-center justify-center h-full w-full text-white hover:text-gray-400">
                Continue
              </span>
            </Button>
          </div>
        </form>
      </div>
    </ToastProvider>
  );
};

export default UpdateAddress;
