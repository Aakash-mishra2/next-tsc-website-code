"use client";

import { toast } from "react-toastify";
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CartModal from "@/components/modals/CartModal";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { fetchCartByPaymentMethod } from "@/api/cartAPI";

const NavbarIcons = ({ theme, className, openSearchBar }) => {
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
      const resp = await fetchCartByPaymentMethod({ payment_method: "COD" });
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
    <div className={`gap-2 relative ${className}`}>
      {toggleModal && cartData?.items?.length > 0 && (
        <CartModal
          toggle={toggleModal}
          cart={cartData}
          handleClose={() => setToggleModal(false)}
        />
      )}
      <div>
        <BiSearch
          size={20}
          className="cursor-none lg:cursor-pointer"
          onClick={() => openSearchBar(true)}
        />
      </div>
      <div className="flex">
        <HiOutlineShoppingBag
          className="cursor-none lg:cursor-pointer"
          onClick={showCartModal}
          size={20}
        />
        <span
          style={{ backgroundColor: theme ? `#${theme}` : "black" }}
          className="text-xss font-medium text-white relative items-center flex justify-center w-3 h-3 rounded-full bottom-1"
        >
          {cartCount && router !== "/thank-you" ? cartCount : 0}
        </span>
      </div>
    </div>
  );
};
export default NavbarIcons;
