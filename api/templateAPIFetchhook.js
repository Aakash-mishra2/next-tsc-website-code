import config from "@/config/config";
import { clearData } from "@/lib/utils";
import { fetchWithTimeout } from "./request";
import { makeGetRequest } from "./request";
import { postAllAPIErrors } from "./commonAPI";
import { getErrorDetails } from "./commonFunc";

const BASE_URL = config.BASE_URL;

const CART_URL = "api/cart/item/";
const GET_UPSELL_PRODUCTS_URL = "api/products/v1/upsell/";
const POST_CHECKOUT_UPSELL_URL = "api/cart/upsell/";
const BLOCK_COD_URL = "api/checkout/verify/cod/";
const CHECK_PINCODE_URL = "api/country/pincode/";
const FETCH_PRODUCT_DETAILS_URL = "api/products/v1/";

/**
 * @param {string} payment_method
 * @returns {PromiseLike<any>}
 * */
export const fetchCartByPaymentMethod = async (payment_method) => {
  const cartId = localStorage.getItem("GOODFEEL_CART");
  if (!cartId) return;

  const baseurl = `${BASE_URL}${CART_URL}${cartId}/`;
  const params = payment_method ? { payment_method: payment_method } : {};

  const urlParams = new URLSearchParams(params).toString();
  let search = params?.payment_method ? `?${urlParams}` : "";

  const response = await fetch(`${baseurl}${search}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const updatedData = await response.json();
  if (response?.status === 200 && response?.statusText === "OK") {
    if (updatedData?.cart)
      localStorage.setItem("GOODFEEL_CART", updatedData?.cart);
      localStorage.setItem("GOODFEEL_FINAL_AMOUNT", updatedData?.final_amount);

    const user = JSON.parse(localStorage.getItem("GOODFEEL_USERDATA"));
    if (payment_method && user) {
      localStorage.setItem(
        "GOODFEEL_USERDATA",
        JSON.stringify({ ...user, payment_method: payment_method })
      );
    }
    return { message: "success", ...updatedData };
  } else {
    postAllAPIErrors(response, updatedData, {payment_method: payment_method}); // to send error logs to the backend
    return { message: "something_went_wrong" }
  };
};

/**
 * @param {string} method - accepts ADD | BUY
 * @param {object} product
 * @param {string} product.id - must contain the product identifier
 * @returns {PromiseLike<any>}
 * */
export const createCart = async (method, product, items) => {
  const cartId = localStorage.getItem("GOODFEEL_CART");
  if (items) {
    items = items?.map((item) => {
      return {
        product: item?.id,
        quantity: item?.quantity,
      }
    })
  }
  let cartData = {
    cart: cartId === "undefined" || null ? null : cartId,
    items: items?.length > 0 ? items : [{ product: product.id, quantity: 1 }],
  };
  if (method === "BUY")
    cartData.items[0] = { product: product.id, quantity: 1, clear: true };

  const resp = await fetch(`${BASE_URL}${CART_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartData),
  });
  const cartInfo = await resp.json();
  if (resp.ok && (resp?.status === 200 || resp?.status === 201)) {
    if (cartInfo?.cart) localStorage.setItem("GOODFEEL_CART", cartInfo?.cart);
    return cartInfo;
  } else if (resp?.status === 400 && cartInfo?.detail === "already_confirmed") {
    clearData();
    return { message: cartInfo.detail }; // return message from server
  } else if (resp?.status === 400 && cartInfo?.detail === "already_cancelled") {
    clearData();
    return { message: cartInfo.detail };
  } else {
    postAllAPIErrors(resp, cartInfo, cartData); // to send error logs to the backend
    localStorage.removeItem("GOODFEEL_CART"); // remove cart info from local storage
    return { message: "internal_error" }; // return message from server
  }
};


/**
 * @param {object} id
 * @returns {PromiseLike<any>}
 * */
export const getUpsellProducts = async () => {
  try {
    const cartId = localStorage.getItem("GOODFEEL_CART");
    const response = await fetch(
      `${BASE_URL}${GET_UPSELL_PRODUCTS_URL}${cartId}/?type=checkout`,
      {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    );
    const jsonresponse = await response.json();
    if (response?.status >= 200 && response?.status < 400) return jsonresponse;
    else postAllAPIErrors(response, jsonresponse, id); // to send error logs to the backend
  } catch (error) {
    console.error("Error: " + error);
    const errorDetails = getErrorDetails(error);
    postAllAPIErrors({url: `${BASE_URL}${GET_UPSELL_PRODUCTS_URL}${cartId}/?type=checkout`}, errorDetails, {cartId: cartId});
    return { message: "Internal Server Error" };
  }
};


/**
 * @param {string} method - accepts ADD | BUY
 * @param {object} product
 * @param {string} product.id - must contain the product identifier
 * @returns {PromiseLike<any>}
 * */
export const postCheckoutUpsell = async (product) => {
  let cartData = {
    product: product.id,
    upsell_type: "checkout",
    cart: localStorage.getItem("GOODFEEL_CART"),
  };

  const resp = await fetchWithTimeout(`${BASE_URL}${POST_CHECKOUT_UPSELL_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartData),
  });
  if (resp === "request_timeout") return resp;
  const cartInfo = await resp.json();
  if (resp.ok && resp?.status === 200) {
    // setCartData(cartInfo);
    return cartInfo;
  } else return { message: "internal_error" }; // return message from server
};


/**
 * @param {number} pincode - accepts 6 digit pincode
 * @returns {PromiseLike<any>}
 * */
export async function checkPincode(pincode) {
  try {
    const resp = await fetch(
      `${BASE_URL}${CHECK_PINCODE_URL}${pincode}/`
    );
    const jsonResponse = await resp.json();
    if (resp.ok) {
      return jsonResponse;
    } else postAllAPIErrors(resp, jsonResponse, { data: pincode }); // to send error logs to the backend
  } catch (error) {
    console.error("Error: " + error);
    const errorDetails = getErrorDetails(error);
    postAllAPIErrors({url: `${BASE_URL}${CHECK_PINCODE_URL}${pincode}/`}, errorDetails, { data: pincode });
    return { message: "Internal Server Error" };
  }
}

/**
 * @param {object} data
 * @param {string} data.phone
 * @param {string} data.cartId
 * @returns {PromiseLike<any>}
 * */
export async function getBlockCOD(data) {
  try {
    const url = `${BASE_URL}${BLOCK_COD_URL}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const updatedData = await response.json();
    if (response.ok)
      return updatedData;
    else {
      postAllAPIErrors(response, updatedData, data); // to send error logs to the backend
      throw new Error("something went wrong");
    }
  } catch (error) {
    console.log(error);
    const errorDetails = getErrorDetails(error);
    postAllAPIErrors({url: `${BASE_URL}${BLOCK_COD_URL}`}, errorDetails, data);
    return { message: "something went wrong" };
  }
};

export const fetchProductDetails = async (prodId) => {
  try {
    const url = `${FETCH_PRODUCT_DETAILS_URL}${prodId}/?get_details=true`;
    return await makeGetRequest(url);
  }  catch (error) {
    return { message: "Invalid" };
  }
};
