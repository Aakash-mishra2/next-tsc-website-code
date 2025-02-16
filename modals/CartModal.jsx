"use client";
import Modal from "react-modal";
import { Button } from "../common";
import { CartItem } from "../cart";
// import config from "@/config/config";
import * as fbq from "@/api/events.js";
import { useRouter } from "next/navigation";
import { VscChromeClose } from "react-icons/vsc";
import { fetchCartByPaymentMethod } from "@/api/cartAPI";
// import CustomSwiper from "../common/custom/CustomSwiper";
import { useEffect, useCallback, useState, useRef } from "react";
// import RecommendationCard from "../common/card/RecommendationCard";

const customStyles = {
  content: {
    top: "0%",
    right: "0%",
    left: "auto",
    bottom: "auto",
    height: "100%",
    padding: 0,
    borderRadius: "0px",
    backgroundColor: "#f5f0f7",
    border: "#f5f0f7",
  },
  overlay: { background: "rgba(0, 0, 0, 0.6)", zIndex: 1000 },
};
Modal.setAppElement("#root");

const CartModal = (props) => {
  const slug = props?.slug;
  const router = useRouter();
  // const toastId = useRef(null); // to send NOTIFICATION

  const [loaded, setLoaded] = useState(false);
  const [disable, setDisable] = useState(false);
  const [cart, setUpdatedCart] = useState(props?.cart);
  // const [relatedProducts, setRelatedProducts] = useState([]);

  // const toastLoading = () =>
  //   (toastId.current = toast("Please wait...", {
  //     autoClose: false,
  //     isLoading: true,
  //   }));

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (cart?.items.length === 0 && props.toggle) {
        const resp = await fetchCartByPaymentMethod();
        if (resp?.message === "success") setUpdatedCart(resp);
      }
    };
    if (loaded) {
      if (cart?.items.length === 0) setUpdatedCart(props.cart);
      else fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  // /**@type {function(number[]):PromiseLike<any>}*/
  // const fetchRelatedProducts = useCallback(async (idArr) => {
  //   const resp = await fetch(`${config.BASE_URL}api/products/related/`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(idArr),
  //   })
  //     .then((res) => res.json())
  //     .catch((err) => console.log("Error: " + err.message));
  //   if (resp) setRelatedProducts(resp);
  // }, []);

  // useEffect(() => {
  //   if (loaded) {
  //     if (props?.cart || cart?.items.length > 0)
  //       fetchRelatedProducts(cart?.items?.map((prod) => prod.id));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [cart?.items.length, loaded]);

  const handleCheckoutButton = () => {
    const userData = JSON.parse(localStorage.getItem("AYUVYA_USERDATA"));
    if (userData) {
      delete userData.payment_method
      localStorage.setItem("AYUVYA_USERDATA", JSON.stringify(userData));
    }
    router.push("/checkout");
  };

  useEffect(() => {
    if (cart?.items.length === 0) props.handleClose();
  }, [cart?.items.length, props]);

  useEffect(() => {
    if (props.cart && cart.items.length > 0 && props.toggle) {
      fbq.gevent("view_cart", { cart: cart });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cart, props.toggle]);

  const deal_discount =
    cart?.price_breakup?.deal_discount &&
    cart?.total_amount - cart?.price_breakup?.deal_discount;

  return (
    <>
      {(props.cart || cart.items.length > 0) && (
        <Modal
          id="cartModal"
          style={customStyles}
          isOpen={props.toggle}
          onRequestClose={props.handleClose}
          contentLabel="Address Modal"
        >
          <>
            <div className="w-screen xss:max-w-sm">
              <div className="bg-white min-h-screen overflow-x-hidden pt-20 pb-36 relative">
                <div className="fixed top-0 bg-white z-50 h-20 w-screen xss:max-w-sm">
                  <div className="flex justify-between px-5 py-3 font-semibold text-lg items-center">
                    <h3>Your Shopping Cart ({cart?.items.length || 0})</h3>
                    <div>
                      <VscChromeClose
                        className="cursor-none lg:cursor-pointer"
                        onClick={props.handleClose}
                        size={20}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor:
                        props.theme && slug ? `#${props.theme}` : "black",
                    }}
                    className="flex justify-center items-center w-full h-9 text-white"
                  >
                    <p className="text-sm">Free shipping on all orders!</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-col">
                    {cart?.items?.map((product, index) => {
                      return (
                        <CartItem
                          key={index}
                          product={product}
                          theme={slug && props.theme}
                          isCheckoutPage={false}
                          setUpdatedCart={setUpdatedCart}
                          handleClose={props.handleClose}
                        />
                      );
                    })}
                  </div>
                  {/*
                  <div className="pt-4">
                    <CustomSwiper
                      cart={cart}
                      slide={true}
                      navigation={false}
                      theme={props?.theme}
                      data={relatedProducts}
                      headingText="You may also like"
                      setUpdatedCart={setUpdatedCart}
                      componentToBeRender={RecommendationCard}
                      noOfSlidePerView={[
                        {
                          0: {
                            slidesPerView: 1.5,
                            spaceBetween: 10,
                          },
                          400: {
                            slidesPerView: 2,
                            spaceBetween: 0,
                          },
                        },
                      ]}
                    />
                  </div>*/}
                </div>
                <div className="fixed bottom-0 bg-white z-50 h-36 w-screen xss:max-w-sm border-t p-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-bold">SUBTOTAL</h4>
                    <p
                      style={{
                        color:
                          props.theme && slug ? `#${props.theme}` : "black",
                      }}
                      className={`font-semibold `}
                    >
                      {deal_discount && (
                        <span className="text-black text-xl font-bold">
                          ₹ {deal_discount}
                        </span>
                      )}{" "}
                      <span
                        className={`${deal_discount
                            ? "line-through text-gray-500 pl-2 text-sm lg:text-base"
                            : "text-base lg:text-xl"
                          }`}
                      >
                        ₹ {cart?.total_amount}
                      </span>
                    </p>
                  </div>
                  <p className="text-sm py-2">
                    Shipping and taxes calculated at checkout
                  </p>
                  <Button
                    id="myBtn"
                    disabled={disable}
                    handler={handleCheckoutButton}
                    className="outline-none border-none w-full"
                  >
                    <span
                      style={{
                        backgroundColor:
                          props.theme && slug ? `#${props.theme}` : "black",
                        borderColor:
                          props.theme && slug ? `#${props.theme}` : "black",
                      }}
                      className="text-xl w-full py-2 border-3 hover:bg-slate-50 border-solid font-bold text-white text-center mx-auto"
                    >
                      CHECKOUT
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </>
        </Modal>
      )}
    </>
  );
};

export default CartModal;
