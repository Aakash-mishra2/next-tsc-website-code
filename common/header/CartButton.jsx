"use client";

import { toast } from "react-toastify";
import { SlHandbag } from "react-icons/sl";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CartModal from "@/components/modals/CartModal";
import { fetchCartByPaymentMethod } from "@/api/cartAPI";

const CartButton = () => {
  const router = usePathname();
  const [start, setStart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartData, setCartData] = useState({ items: [] });
  const [toggleModal, setToggleModal] = useState(false); // show cart modal

  const updateCartCount = () => {
    let storageSupported = false;
    try {
      storageSupported = window.localStorage && true;
    } catch (e) {}
    if (storageSupported && start) {
      const cartCount = localStorage.getItem("AYUVYA_CART_COUNT");
      if (cartCount) {
        const count = JSON.parse(cartCount);
        setCartCount(count?.count);
      }
    }
  };

  useEffect(() => {
    if (start) setInterval(updateCartCount, 2000);
    else setStart(true);
    return () => clearInterval(updateCartCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  async function showCartModal() {
    if (router === "/thank-you") return;
    const count = JSON.parse(localStorage.getItem("AYUVYA_CART_COUNT"));
    if (count?.count === 0 || !count) {
      setCartCount(0);
      return toast.warn("Your cart is empty!");
    } else setCartCount(count?.count);
    if (localStorage.getItem("AYUVYA_CART_ID_8932_6754")) {
      const resp = await fetchCartByPaymentMethod();
      if (resp.message === "success" && resp?.items.length > 0) {
        setCartData(resp);
        setCartCount(resp?.items.length);
        setToggleModal(true); // to show cart Modal
      }
    } else {
      setCartCount(0);
      return toast.warn("Your cart is empty!");
    }
  }

  return (
    <>
      {toggleModal && cartData?.items?.length > 0 && (
        <CartModal
          toggle={toggleModal}
          cart={cartData}
          handleClose={() => setToggleModal(false)}
        />
      )}
      <div className="flex place-self-end mr-0 xs:mr-2 lg:mr-6 my-auto">
        <SlHandbag
          className="cursor-none lg:cursor-pointer"
          onClick={showCartModal}
          size={20}
        />
        <span className="text-xs font-medium bg-black text-white relative items-center flex justify-center min-w-[20px] min-h-[20px] w-5 h-5 rounded-full -bottom-2 right-1">
          {cartCount && router !== "/thank-you" ? cartCount : 0}
        </span>
      </div>
    </>
  );
};

export default CartButton;
