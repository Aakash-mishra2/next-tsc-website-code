"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "../Button";
import { useState } from "react";
import { TbDiscount2 } from "react-icons/tb";
import { cartCreateUpdate } from "@/api/cartAPI";

const RecommendationCard = ({
  cart,
  theme,
  product,
  marginVertical,
  setUpdatedCart,
}) => {
  const [btnTheme, setBtnTheme] = useState({
    backgroundColor: "white",
    color: "black",
    border: "1px solid black",
  });
  const handleMouseOver = () => {
    setBtnTheme({
      backgroundColor: theme ? `#${theme}` : "black",
      border: theme ? `1px solid #${theme}` : "1px solid black",
    });
  };
  const handleMouseLeave = () => {
    setBtnTheme({
      backgroundColor: "white",
      color: "black",
      border: "1px solid black",
    });
  };

  // Add Item to cart NEW
  async function handleAddToCart(product) {
    const resp = await cartCreateUpdate("ADD", product);
    if (resp) {
      const updated_cart_items = [];
      cart?.items.map((i) => updated_cart_items.push(i));
      const added_product = resp?.items?.filter(
        (item) => item?.id === product?.id
      )[0];
      updated_cart_items.push(added_product);
      setUpdatedCart({ ...resp, items: updated_cart_items });
    }
  }

  return (
    <div className={`flex flex-col gap-2 cursor-pointer ${marginVertical}`}>
      <figure className="flex justify-center">
        <Link href={`${product?.get_product_url}`}>
          <Image
            width={200}
            height={200}
            priority
            className="object-contain"
            src={product?.primary_image}
            alt={product?.product_name}
          />
        </Link>
      </figure>
      <figcaption className="flex flex-col gap-1 p-2 text-center">
        <Link href={`${product?.get_product_url}`}>
          <h2 className="line-clamp-2 text-base hover:text-gray-700">
            {product?.product_name}
          </h2>
        </Link>
        <div className="flex gap-2 text-center text-base mx-auto mt-1">
          <span className="">₹ {product?.price}</span>
          <span className="line-through text-gray-500">
            ₹ {product?.cut_price}
          </span>
        </div>
        <span
          style={{ color: theme ? `#${theme}` : "black" }}
          className="text-sm items-center flex gap-1 justify-center"
        >
          <TbDiscount2 size={20} />
          {100 - Math.round((product?.price / product?.cut_price) * 100)}% OFF
        </span>
        <div className="text-center mx-auto">
          <Button
            handler={() => handleAddToCart(product)}
            className="w-fit border-none outline-none"
          >
            <span
              style={btnTheme}
              onMouseEnter={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              className="text-sm px-3 my-1 cursor-none border border-black lg:cursor-pointer w-full rounded-full py-2 hover:text-white hover:bg-black text-center mx-auto"
            >
              Add To Cart
            </span>
          </Button>
        </div>
      </figcaption>
    </div>
  );
};

export default RecommendationCard;
