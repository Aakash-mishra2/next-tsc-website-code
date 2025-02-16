"use client";

import Link from "next/link";
import Image from "next/image";

const ConcernCard = ({ slug, isConcern, product, marginVertical }) => {
  const sub_url = `/${
    product?.category_slug === "nutrition"
      ? "category/natural-health-care"
      : product?.category_slug === "skin-care"
      ? "category/ayurvedic-skin-care"
      : product?.type + "/" + product?.category_slug
  }`;
  return (
    <div
      className={`lg:px-3 ${
        !isConcern && "w-[125px] md:w-[180px]"
      } bg-slate-50 ${marginVertical ? marginVertical : "p-2"}`}
    >
      <Link href={sub_url} className="cursor-none w-full lg:cursor-pointer">
        <div className="shadow-md lg:shadow-xl rounded-sm">
          <figure>
            <Image
              className="rounded-t-md w-full aspect-square object-cover"
              src={product?.category_image}
              alt={product?.category_name}
              width={200}
              height={100}
              loading="lazy"
            />
          </figure>
          <figcaption>
            <p
              className={`rounded-b-md text-center items-center flex justify-center bg-white ${
                `/collection/${slug}` === sub_url ||
                `/category/${slug}` === sub_url
                  ? "font-black text-lg lg:text-xl h-10 leading-[16px]"
                  : "h-10 text-sm lg:text-lg"
              }`}
            >
              {product?.category_name}
            </p>
          </figcaption>
        </div>
      </Link>
    </div>
  );
};

export default ConcernCard;
