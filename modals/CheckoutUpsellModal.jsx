"use client";

import Image from "next/image";
import Modal from "react-modal";
import { useState } from "react";
import { Button } from "../common";
import { TiTick } from "react-icons/ti";
import { IoMdUnlock } from "react-icons/io";
import { useRouter } from "next/navigation";
import { postCheckoutUpsell } from "@/api/cartAPI";
import CircularLoader from "../common/CircularLoader";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    zIndex: 10000,
    padding: "10px",
    border: "#f5f0f7",
    borderRadius: "12px",
    marginRight: "-50%",
    backgroundColor: "white",
    transform: "translate(-50%, -50%)",
  },
  overlay: { background: "rgba(0, 0, 0, 0.6)" },
};
Modal.setAppElement("#root");

const CheckoutUpsellModal = ({
  products,
  upsellModal,
  addedToCart,
  handleClose,
  previousProduct,
}) => {
  const router = useRouter();
  const [updateProduct, updateProductState] = useState([]);

  const updateState = (product, loading, added) => {
    const currState = { id: product?.id, loading: loading, added: added };
    if (updateProduct && updateProduct.length === 0)
      return updateProductState([currState]);
    const not_existing = updateProduct?.filter((e) => e?.id !== product.id);
    if (not_existing) return updateProductState([...not_existing, currState]);
  };

  const addToCart = async (product) => {
    try {
      updateState(product, true, false);
      const resp = await postCheckoutUpsell(product);
      if (resp === "request_timeout") {
        updateState(product, false, false);
        return enableButton(false, "Check your internet connection!", "warn");
      }
      if (resp && resp?.detail === "success" && resp?.items.length > 1)
        return updateState(product, false, true);
      else return updateState(product, false, false);
    } catch (error) {
      console.log("Upsell Added Error: " + error);
      updateState(product, false, false);
    }
  };

  const handleCheckout = () => {
    return router.push("/checkout");
  };

  return (
    <Modal
      id="checkoutUpsellModal"
      isOpen={upsellModal}
      style={customStyles}
      onRequestClose={handleClose}
      contentLabel="Checkout Upsell Modal"
    >
      <div className="w-full lg:max-w-md">
        {addedToCart && (
          <div className="text-left text-lg font-bold bg-orange-100 rounded-lg p-2">
            <div className="flex justify-center items-center gap-2 rounded-lg">
              <div className="w-[15%]">
                <Image
                  width={100}
                  height={100}
                  alt={previousProduct?.product_name}
                  src={previousProduct?.primary_image ?? ""}
                  className="w-full object-contain rounded-md"
                />
              </div>
              <div className="w-[85%]">
                <h1 className="text-sm lg:text-base font-bold leading-5">
                  {previousProduct?.product_name} Successfully added to your
                  cart!
                </h1>
              </div>
            </div>
          </div>
        )}
        <h4 className="py-3 text-xl xsss:text-2xl font-bold">
          Special Deals for you!
        </h4>
        <div className="bg-purple-100 rounded-lg p-2">
          <div className="flex gap-5 items-center px-2 pb-4 lg:p-4 pt-2">
            <span className="bg-white rounded-lg">
              <IoMdUnlock
                className="text-purple-700 h-8 w-8 xss:h-10 xss:w-10 p-1"
                size={25}
              />
            </span>
            <div className="text-violet-800">
              <h4 className="text-sm xss:text-md">
                Yay! Special deal Unlocked
              </h4>
              <p className="text-sm xss:text-md font-bold">
                Add this item to your cart
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {products.map((product, idx) => {
              const update =
                updateProduct && updateProduct.length > 0
                  ? updateProduct?.filter((item) => item?.id === product?.id)[0]
                  : [];
              const loading =
                update?.id === product?.id && update?.loading && !update?.added;
              const added =
                update?.id === product?.id && !update?.loading && update?.added;
              return (
                <div
                  key={idx}
                  className="bg-white flex justify-center items-center gap-2 lg:gap-5 rounded-lg"
                >
                  <div className="w-1/4 p-2">
                    <Image
                      width={100}
                      height={100}
                      src={product?.primary_image}
                      alt={product?.product_name}
                      className="w-full object-contain rounded-lg"
                    />
                  </div>
                  <div className="w-3/4 p-2 pl-0">
                    <h1 className="text-sm lg:text-md font-light leading-5 lg:leading-6 line-clamp-1">
                      {product?.product_name}
                    </h1>
                    <div className="flex flex-wrap justify-between items-center gap-2 mt-1 xss:mt-2 text-md font-semibold">
                      <p className="flex gap-2 text-xs xss:text-lg">
                        <span className="">₹ {product?.price?.toFixed(1)}</span>
                        <span className="line-through text-gray-400">
                          ₹ {product?.cut_price?.toFixed(1)}
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {update && updateProduct.length > 0 ? (
                          <>
                            {loading || added ? (
                              <span
                                className={`flex justify-center text-xs xsss:text-sm px-2 py-[2px] font-extralight rounded-md bg-[#1D7F75] text-white items-center ${
                                  loading
                                    ? "cursor-not-allowed bg-[#1D7F75]/70"
                                    : "cursor-pointer"
                                }`}
                              >
                                {loading ? (
                                  <>
                                    Please wait{" "}
                                    <CircularLoader className="h-4 w-4" />
                                  </>
                                ) : (
                                  <>
                                    Added <TiTick size={18} />
                                  </>
                                )}
                              </span>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <>
                            <Button
                              hideLoader={true}
                              handler={() => addToCart(product)}
                              className="outline-none border-none"
                            >
                              <span className="text-xs xsss:text-sm xss:text-base flex justify-center items-center font-extralight w-fit px-4 rounded-md py-[2px] text-white bg-[#1D7F75]">
                                + Add
                              </span>
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Button
          className="outline-none border-none mt-3 w-full"
          handler={handleCheckout}
        >
          <span className="text-md hover:bg-current/50 bg-[#1D7F75] font-extralight w-full px-4 rounded-md py-2 border border-[#1D7F75] text-white">
            Proceed to checkout
          </span>
        </Button>
      </div>
    </Modal>
  );
};

export default CheckoutUpsellModal;
