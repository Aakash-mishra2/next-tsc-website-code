"use client";

import * as fbq from "@/api/events";
import config from "@/config/config";
import Button from "../common/Button";
import { toast } from "react-toastify";
import CartModal from "../modals/CartModal";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { addScriptToHead, getOrderProductType } from "@/api/generalFunc";
import {
  cartCreateUpdate,
  evaluateOrderType,
  fetchCartByPaymentMethod,
} from "@/api/cartAPI";
import {
  initiateShipRocketCheckout,
  generateTokenForCompleteCheckout,
  getShiprocketInitiateCheckoutToken,
} from "@/api/shiprocket";
import CountdownTimer from "./Timer";
import CircularLoader from "./CircularLoader";
import { getUpsellProducts } from "@/api/upsellAPI";
import CheckoutUpsellModal from "../modals/CheckoutUpsellModal";

const UpdateCartBtn = ({
  url,
  qty,
  page,
  theme,
  igain,
  btnText,
  product,
  isStatic,
  hot_deal,
  offerPrice,
  specialOffer,
  isNotSwiperProduct,
}) => {
  const location = usePathname(); // to get location
  const router = useRouter(); // router for navigation
  const toastId = useRef(null); // to send NOTIFICATION

  const [cart, setCart] = useState({ items: [] });
  const [toggleModal, setToggleModal] = useState(false);
  const [upsellModal, setUpsellModal] = useState(false);
  const [upsellProduct, setUpsellProduct] = useState({});
  const [hideLoaderBtn, setHideLoaderBtn] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [upsellProductCheck, setUpsellProductCheck] = useState(false);

  // const CheckoutUpsellId = JSON.parse(config.UPSELL_ID); // define the product id to place checkout Upsell
  const gokwikCheckoutId = JSON.parse(config.GOKWIK_CHECKOUT_ID); // define the product id to place checkout Upsell
  const initiateCheckoutId = JSON.parse(config.PARTIAL_SHIPROCKET_CHECKOUT_ID); // define the product id to initiate the shiprocket checkout
  const shiprocketCheckoutId = JSON.parse(config.SHIPROCKET_CHECKOUT_ID); // to initiate the shiprocket complete checkout

  const toastMessage = (message, type, autoClose) =>
    toast.update(toastId.current, {
      type: type,
      render: message,
      autoClose: autoClose ?? 2000,
      isLoading: false,
    });

  const toastLoading = () =>
    (toastId.current = toast("Please wait...", {
      autoClose: false,
      isLoading: true,
    }));

  // to get checkout upsell products
  const checkoutUpsell = async (id) => {
    try {
      const resp = await getUpsellProducts(id, true);
      if (
        resp &&
        resp?.message === "success" &&
        resp?.status === 200 &&
        resp?.data &&
        resp?.data.length > 0
      ) {
        setUpsellModal(true);
        setUpsellProduct(resp?.data);
        return true;
      } else false;
    } catch (error) {
      console.log("FETCH CHECKOUT UPSELL PRODUCTS ERROR:" + error);
      return false;
    } finally {
      enableButton(true);
    }
  };

  const enableButton = (dismiss, message, type) => {
    if (dismiss) toast.dismiss(toastId.current);
    else toastMessage(message, type);
    setIsButtonDisabled(false);
    setHideLoaderBtn("");
    localStorage.removeItem("isBtnDisable");
  };

  // method which is called when the user clicks on add or buy now button
  async function handleCart(event, method, product, homepage) {
    try {
      if (!navigator.onLine)
        return toast.warn("Check your internet connection!");
    } catch (error) {
      console.log("NETWORK ERROR:" + error);
    }
    try {
      // to Disable all buttons on the current page
      const isBtnDisable = JSON.parse(localStorage.getItem("isBtnDisable"));
      if (isBtnDisable) return;
      else localStorage.setItem("isBtnDisable", true);

      // to add gokwik checkout scripts to head
      if (product?.id && gokwikCheckoutId.includes(product?.id))
        addScriptToHead("gokwik");

      toastLoading(); // to show loading indicator
      setIsButtonDisabled(true); // to disable button

      // to add circular loader only on selected button
      if (method === "ADD") setHideLoaderBtn("BUY");
      else setHideLoaderBtn("ADD");

      if (method === "ADD") handleCartBtn(event, "ADD", product, homepage);
      else handleCartBtn(event, "BUY", product, homepage);
    } catch (error) {
      console.log("Handle Cart Error:" + error);
      return enableButton(true);
    }
  }

  // to handle checkout upsell Logic
  async function handleCartBtn(event, method, product, homepage) {
    try {
      let isUpsell = false;
      const resp = await updateCartByMethod(event, method, product);
      if (resp && method === "BUY" && !homepage) {
        setUpsellProductCheck(true);
        isUpsell = await checkoutUpsell(product.id);
      }
      if (isUpsell) return;
      else if (method === "BUY") return buyNowByPrepaid(event, resp, product);
      else if (method === "ADD") {
        setToggleModal(true);
        return enableButton(false, "Item is added to cart", "success");
      }
    } catch (error) {
      console.log("Handle Cart Button Error:" + error);
      return enableButton(true);
    }
  }

  // method which is used to create or update the cart
  const updateCartByMethod = async (event, method, product) => {
    try {
      const resp = await cartCreateUpdate(method, product);
      if (resp === "request_timeout")
        return enableButton(false, "Check your internet connection!", "warn");
      viewContent(product);

      if (
        resp?.message === "already_confirmed" ||
        resp?.message === "already_cancelled"
      ) {
        enableButton(true);
        return await handleCart(event, method, product); // to make new CART
      } else if (resp?.message === "internal_error") return enableButton(true);

      setCart(resp);
      pixel(product);
      return resp;
    } catch (error) {
      console.log("Update Cart By Method Error:" + error);
      return enableButton(true);
    } finally {
      if (method === "ADD") return enableButton(true);
    }
  };

  // to handle gokwik or shiprocket requests
  const buyNowByPrepaid = async (event, resp, product) => {
    try {
      localStorage.removeItem("SHIPROCKET_SLUG"); // remove the old slug

      if (initiateCheckoutId.includes(product?.id))
        return initiateCheckout(event, resp);
      else if (shiprocketCheckoutId.includes(product?.id))
        return initiateCompleteCheckout(event, product);
      else if (gokwikCheckoutId.includes(product?.id))
        return initiateGokwikCheckout(event, product);
      else {
        if (resp === "request_timeout")
          return enableButton(false, "Check your internet connection!", "warn");

        evaluateOrderType(resp?.items);
        localStorage.removeItem("SHIPROCKET_CHECKOUT_ORDER");
        enableButton(true);
        return router.push("/checkout");
      }
    } catch (error) {
      console.log("Buy Now By Prepaid Error:" + error);
      return enableButton(true);
    } finally {
      return enableButton(true);
    }
  };

  // to handle SHIPROCKET CHECKOUT & to handle SCRIPTS of Shiprocket Checkout
  async function initiateCheckout(event, cartResponse) {
    if (config?.ENV === "prod")
      window.clarity("event", "begin_shiprocket_checkout");
    fetchCartByPaymentMethod(getOrderProductType("Prepaid"));
    evaluateOrderType(cartResponse?.items);

    const token = await getShiprocketInitiateCheckoutToken();
    setIsButtonDisabled(false);
    setHideLoaderBtn("");
    toastMessage("Item added to cart", "success", 500);
    if (cartResponse?.final_amount) {
      if (token?.message) router.push("/checkout"); // if no token
      else await initiateShipRocketCheckout(event, token, cartResponse); // if user does not exist
    }
  }

  // to initiate complete shiprocket checkout
  async function initiateCompleteCheckout(event, product) {
    if (config?.ENV === "prod")
      window.clarity("event", "begin_complete_shiprocket_checkout");
    localStorage.setItem("SHIPROCKET_SLUG", location); // to redirect to specific location

    const response = await generateTokenForCompleteCheckout({
      items: [{ variant_id: product.id, quantity: 1 }],
    });
    const token = response.token;
    setIsButtonDisabled(false);
    setHideLoaderBtn("");
    toastMessage("Item added to cart", "success", 500);
    if (token) {
      if (response?.message !== "success") router.push("/checkout");
      else {
        try {
          HeadlessCheckout.addToCart(event, token);
        } catch (error) {
          console.log("Error:" + error);
          window.location.href = window.location.origin + "/checkout";
        }
      } // will initiate the complete Shiprocket checkout
    }
  }

  // to initiate gokwik checkout
  async function initiateGokwikCheckout() {
    try {
      const data = {
        payment_method: "COD",
        cartId: localStorage.getItem("AYUVYA_CART_ID_8932_6754"),
      };
      await fetchCartByPaymentMethod(data);
      gokwikSdk.initCheckout({
        type: "merchantInfo",
        environment: config?.GOKWIK_MODE,
        mid: config?.GOKWIK_MERCHANT_ID,
        merchantParams: {
          merchantCheckoutId: localStorage.getItem("AYUVYA_CART_ID_8932_6754"),
        },
      });
      gokwikSdk.on("order-complete", function (orderDetails) {
        if (orderDetails?.status.toLowerCase() === "confirmed") {
          const user = orderDetails?.shipping_address;
          const updated_user = {
            city: user?.city ?? "",
            email: user?.email ?? "",
            state: user?.state ?? "",
            phone: orderDetails?.phone ?? "",
            gender: user?.gender ?? "",
            address: user?.address ?? "",
            pin_code: user?.pincode ?? "",
            landmark: user?.landmark ?? "",
            last_name: user?.last_name ?? "",
            country: user?.country ?? "India",
            first_name: user?.first_name ?? "",
            apartment: user?.address1 + " " + user?.address2 ?? "",
            payment_method:
              orderDetails?.payment_mode === "cod" ? "COD" : "Prepaid",
          };
          localStorage.removeItem("isBtnDisable");
          localStorage.setItem("ORDER_STATUS", "CONFIRMED");
          localStorage.setItem(
            "AYUVYA_ORDER_ID",
            orderDetails?.merchant_order_id
          );
          localStorage.setItem("AYUVYA_USERDATA", JSON.stringify(updated_user));
          gokwikSdk.close();
          router.push("/thank-you");
        } else {
          gokwikSdk.close();
          router.refresh();
        }
      });
      gokwikSdk.on("checkout-initiation-failure", function (response) {
        gokwikSdk.close();
        return router.push("/checkout");
      });
    } catch (error) {
      console.log("GOKWIK ERROR: " + error);
      router.push("/checkout");
    }
  }

  // to handle FACEBOOK Pixel & GOOGLE Tag CODE
  async function pixel(product) {
    fbq.gevent("add_to_cart", [{ ...product }]);
    fbq.event("AddToCart", { id: product?.id, ...product });
    if (JSON.parse(config?.snap_active))
      fbq.snapChat("ADD_CART", { product: product });
    if (JSON.parse(config?.twq_active))
      fbq.twitter("ADD_CART", { product: product });
    if (JSON.parse(config?.scq_active))
      window.scq("Add to cart", "pre_defined");
  }

  // to handle VIEW CONTENT EVENT
  async function viewContent(product) {
    fbq.event("ViewContent", { id: product?.id });
    if (JSON.parse(config?.snap_active))
      fbq.snapChat("VIEW_CONTENT", { product: product });
    if (JSON.parse(config?.twq_active))
      fbq.twitter("ViewContent", { product: product });
  }

  // to load Shiprocket Scripts into the head
  useEffect(() => {
    if (product?.id && initiateCheckoutId.includes(product?.id))
      addScriptToHead("partial");
    if (product?.id && shiprocketCheckoutId.includes(product?.id))
      addScriptToHead("complete");
  }, [product, initiateCheckoutId, shiprocketCheckoutId]);

  // to avoid scrolling when modal is opened
  useEffect(() => {
    if (upsellModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [upsellModal]);

  // to show qty and offerprice on checkout page
  useEffect(() => {
    if (qty && offerPrice)
      typeof window !== "undefined" &&
        localStorage.setItem(
          "AYUVYA_DEAL",
          JSON.stringify({ qty: qty, offerPrice: offerPrice })
        );
  }, [qty, offerPrice]);

  return (
    <>
      {toggleModal && cart.items.length > 0 && (
        <CartModal
          cart={cart}
          toggle={toggleModal}
          slug={product?.theme}
          theme={product?.theme}
          handleClose={() => setToggleModal(false)}
        />
      )}
      {upsellModal && (
        <CheckoutUpsellModal
          cart={cart}
          theme={product?.theme}
          products={upsellProduct}
          upsellModal={upsellModal}
          previousProduct={cart.items[0]}
          addedToCart={upsellProductCheck}
          handleClose={() => setUpsellModal(false)}
        />
      )}
      {page === "productCard" && (
        <div className="flex flex-col gap-1">
          <Button
            theme={theme}
            hideLoader={true}
            disabled={isButtonDisabled}
            handler={
              hot_deal
                ? (event) => handleCart(event, "BUY", product)
                : () => router.push(`${product?.get_product_url}`)
            }
            className={`bg-black text-white rounded-md justify-center mx-auto hover:bg-gray-500 ${
              isNotSwiperProduct
                ? "lg:hidden w-[90%] xsss:w-[70%] lg:w-[80%] h-8 lg:h-12 text-sm xsss:text-md lg:text-xl"
                : "w-full xs:w-3/4 md:w-2/3 lg:w-1/2 h-12"
            }`}
          >
            Buy Now
          </Button>
          <Button
            theme={theme}
            disabled={isButtonDisabled}
            handler={(event) => handleCart(event, "ADD", product)}
            className={`bg-black text-white rounded-md justify-center mx-auto hover:bg-gray-500 ${
              isNotSwiperProduct
                ? "w-[90%] xsss:w-[70%] lg:w-[80%] h-8 lg:h-12 text-sm xsss:text-md lg:text-xl"
                : "hidden w-1/2 h-12"
            }`}
          >
            Add To Cart
          </Button>
        </div>
      )}
      {page === "bottomtab" && (
        <>
          {igain && <CountdownTimer igain={igain} />}
          <div className={`flex ${!igain && "shadow-3xl"}`}>
            {!isStatic && (
              <Button
                disabled={isButtonDisabled}
                staticLoaderTheme={"e91e63"}
                hideLoader={hideLoaderBtn === "ADD"}
                handler={(event) => handleCart(event, "ADD", product)}
                className="w-1/2 mx-auto text-[#e91e63] xsss:py-2 xss:py-3 text-xl md:text-2xl font-semibold shadow-none bg-white"
              >
                Add To Cart
              </Button>
            )}
            <Button
              theme={"e91e63"}
              disabled={isButtonDisabled}
              hideLoader={hideLoaderBtn === "BUY"}
              handler={(event) => handleCart(event, "BUY", product)}
              className={`mx-auto xsss:py-2 xss:py-3 text-xl md:text-2xl font-semibold shadow-none text-white bg-[#e91e63] ${
                !isStatic ? "w-1/2" : "w-full"
              }`}
            >
              Buy Now
            </Button>
          </div>
        </>
      )}
      {page === "productDetail" && (
        <div className="flex mt-3 flex-col gap-5">
          <Button
            hideLoader={true}
            disabled={isButtonDisabled}
            className="lg:w-3/4 outline-none border-none"
            handler={(event) => handleCart(event, "ADD", product)}
          >
            <span
              style={{
                color: theme ? `#${theme}` : "black",
                border: theme ? `3px solid #${theme}` : "3px solid black",
              }}
              className="flex justify-center items-center gap-2 text-3xl w-full rounded-md py-3 border-3 hover:bg-slate-50 border-solid font-bold text-white text-center mx-auto"
            >
              Add To Cart{" "}
              {hideLoaderBtn === "BUY" && isButtonDisabled && (
                <CircularLoader
                  theme={theme}
                  classes="min-h-[24px] min-w-[24px] h-6 w-6"
                />
              )}
            </span>
          </Button>
          <Button
            hideLoader={true}
            disabled={isButtonDisabled}
            className="lg:w-3/4 outline-none border-none"
            handler={(event) => handleCart(event, "BUY", product)}
          >
            <span
              style={{
                backgroundColor: theme ? `#${theme}` : "black",
                border: theme ? `3px solid #${theme}` : "3px solid black",
              }}
              className="flex justify-center items-center gap-2 text-3xl w-full rounded-md py-3 font-bold hover:bg-current/80 text-white text-center mx-auto"
            >
              Buy Now{" "}
              {hideLoaderBtn === "ADD" && isButtonDisabled && (
                <CircularLoader
                  theme={theme}
                  classes="min-h-[24px] min-w-[24px] h-6 w-6"
                />
              )}
            </span>
          </Button>
        </div>
      )}
      {page === "staticBtn" && (
        <Button
          type="button"
          theme={theme}
          handler={(event) => handleCart(event, "ADD", product)}
          disabled={isButtonDisabled}
          className={
            "py-2 px-4 text-xss xss:text-sm lg:text-base text-white rounded-lg"
          }
        >
          {btnText}
        </Button>
      )}
      {page === "buynowBtn" && (
        <div className="flex flex-col gap-5">
          <Button
            handler={(event) => handleCart(event, "BUY", product)}
            disabled={isButtonDisabled}
            theme={theme}
            className={
              "mt-2 p-4 rounded-lg tracking-widest text-2xl w-full text-white flex justify-center"
            }
          >
            BUY NOW
          </Button>
        </div>
      )}
      {page === "newUI" && (
        <Button
          className={`w-[80%] mx-auto mt-4 mb-7 text-white font-semibold justify-center py-3 rounded-full`}
          theme={theme}
          handler={(event) => handleCart(event, "BUY", product)}
          disabled={isButtonDisabled}
        >
          BUY NOW |{" "}
          {product?.id && (
            <>
              <s>₹ {product?.cut_price}</s>₹ {product?.price}
            </>
          )}
        </Button>
      )}
      {page === "selectJar" && (
        <Button
          theme={theme}
          disabled={isButtonDisabled}
          handler={(event) => handleCart(event, "BUY", product)}
          className={`w-[80%] mx-auto mt-4 mb-5 text-white font-semibold justify-center py-3 rounded-full`}
        >
          BUY NOW | <s>{product?.diff_price && `₹ ${product.cut_price}`}</s>₹{" "}
          {product?.price ?? "--"}
        </Button>
      )}
      {page === "newUIUpdated" && (
        <Button
          theme={theme}
          disabled={isButtonDisabled}
          handler={(event) => handleCart(event, "BUY", product)}
          className={`w-[80%] mx-auto my-4 text-white font-semibold justify-center py-3 rounded-full`}
        >
          BUY NOW | ₹ {product?.price}
        </Button>
      )}
      {page === "betaBtn" && (
        <Button
          theme={theme}
          disabled={isButtonDisabled}
          handler={(event) => handleCart(event, "BUY", product)}
          className="w-full flex-auto justify-center items-center xsss:py-2 xss:py-3 text-xl rounded-full hover:bg-current/75 text-white"
        >
          <span className="pr-5">BUY NOW</span>
          <span className="border-l-2 pl-5 flex items-center">
            <span className="line-through pr-2 text-sm">₹{product?.price}</span>
            ₹ {product?.cut_price}
          </span>
        </Button>
      )}
      {page === "alpha" && (
        <Button
          disabled={isButtonDisabled}
          handler={(event) => handleCart(event, "BUY", product)}
          className="w-full flex relative justify-center items-center bg-black font-bold text-lg py-3 border-2 border-black text-[#FDDF5C] hover:text-black hover:bg-transparent tracking-widest"
        >
          <p>BUY NOW</p>
          <MdKeyboardArrowRight className="absolute right-0" size={25} />
        </Button>
      )}
      {page === "newHomeCard" && (
        <div className="flex w-full gap-1 text-sm sm:text-base">
          <Button
            disabled={isButtonDisabled}
            hideLoader={hideLoaderBtn === "ADD"}
            staticLoaderTheme={"D6D683"}
            handler={(event) => handleCart(event, "ADD", product)}
            className={"w-2/5 bg-[#D6D683] py-2 text-white rounded-lg "}
          >
            ADD<sup>+</sup>
          </Button>
          <Button
            disabled={isButtonDisabled}
            hideLoader={hideLoaderBtn === "BUY"}
            staticLoaderTheme={"1A2E05"}
            handler={(event) => handleCart(event, "BUY", product, true)}
            className={"w-3/5 bg-lime-950 py-2 text-white rounded-lg"}
          >
            BUY NOW
          </Button>
        </div>
      )}
      {page === "newHomeGridCard" && (
        <div className="flex w-full gap-1 text-sm sm:text-base">
          <Button
            disabled={isButtonDisabled}
            hideLoader={hideLoaderBtn === "ADD"}
            staticLoaderTheme={specialOffer ? "1D7F75" : "D6D683"}
            handler={(event) => handleCart(event, "ADD", product)}
            className={`${
              !specialOffer ? "w-2/5 bg-[#D6D683]" : "w-full bg-[#1D7F75]"
            } py-1 xsss:py-[6px] xss:py-2 text-white rounded-md xss:rounded-lg text-xss xss:text-base`}
          >
            ADD{specialOffer && " TO CART"}
            <sup>+</sup>
          </Button>
          {!specialOffer && (
            <Button
              disabled={isButtonDisabled}
              hideLoader={hideLoaderBtn === "BUY"}
              staticLoaderTheme={"1A2E05"}
              handler={(event) => handleCart(event, "BUY", product, true)}
              className={
                "w-3/5 bg-lime-950 py-1 xsss:py-[6px] xss:py-2 text-white rounded-md xss:rounded-lg text-xss xss:text-base"
              }
            >
              BUY NOW
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default UpdateCartBtn;
