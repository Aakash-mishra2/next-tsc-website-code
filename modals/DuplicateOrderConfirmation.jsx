import Image from "next/image";
import { Button } from "../common";
import { toast } from "react-toastify";
import CommonModal from "../common/custom/CommonModal";
import { cartCreateUpdate, clearLocalStorage } from "@/api/cartAPI";

const DuplicateOrderConfirmation = ({
  toastId,
  handleClose,
  duplicateOrderModal,
  handleDuplicateOrder,
  previousOrderDetails,
  setDuplicateOrderModal,
}) => {
  const date = new Date(previousOrderDetails?.created_date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleString("en-US", options);

  const handleDuplicte = async () => {
    try {
      let items = localStorage.getItem("AYUVYA_CART_ITEMS");
      if (items) items = JSON.parse(items);
      clearLocalStorage();
      if (items && items.length > 0)
        await cartCreateUpdate("ADD", { id: 0 }, true, items);
      return window.location.reload();
    } catch (error) {
      console.log("Duplicate Error: " + error);
    }
  };

  return (
    <CommonModal
      handleClose={handleClose}
      openModal={duplicateOrderModal}
      notAllowClickAnywhere={() => setDuplicateOrderModal(true)}
    >
      <div className="max-w-screen md:max-w-[400px] text-center rounded-[12px]">
        <figure>
          <Image
            width={100}
            height={100}
            priority
            className="mx-auto mt-5 md:mt-0 w-20 md:w-32 aspect-square"
            src={
              "https://storage.googleapis.com/ayuvya_images/product_image/check_icon_17april2024_2.png"
            }
            alt="Confirmed"
          />
        </figure>
        <figcaption>
          <h2 className="text-2xl my-5 font-semibold">Already Confirmed</h2>
          <p className="mb-5">
            Your Order Is Already Confirmed On {formattedDate}
          </p>
          <p>Product: {previousOrderDetails?.product_name}</p>
          <p>Order ID: {previousOrderDetails?.get_order_id}</p>
          <p>Amount: {previousOrderDetails?.amount}</p>
        </figcaption>
        <p className="my-5">Do you want to buy One More Product?</p>
        <div className="flex flex-col md:flex-row gap-2 md:gap-5">
          <Button
            type="button"
            handler={() => {
              toastId.current = toast("Please wait...", {
                autoClose: false,
                isLoading: true,
              });
              handleDuplicte();
            }}
            className="bg-black px-5 rounded-full border border-black hover:bg-black/90 w-full text-white py-2 flex justify-center items-center"
          >
            Continue
          </Button>
          <Button
            type="button"
            handler={() => setDuplicateOrderModal(false)}
            className="bg-white px-5 text-black rounded-full border hover:text-white border-black hover:bg-black/90 w-full py-2 flex justify-center items-center"
          >
            Cancel
          </Button>
        </div>
      </div>
    </CommonModal>
  );
};

export default DuplicateOrderConfirmation;
