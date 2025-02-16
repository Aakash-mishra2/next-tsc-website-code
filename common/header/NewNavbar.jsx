import Menu from "./Menu";
import Link from "next/link";
import Search from "./Search";
import Image from "next/image";
import { Fragment } from "react";
import BottomNav from "./BottomNav";
import CartButton from "./CartButton";
import { discount_titles } from "@/config/constants";

export default function Navbar({ params, categories, hideBottomNav }) {
  const newCategories = [
    {
      show_on_header: true,
      category_name: "Home",
      category_slug: "/",
    },
    {
      type: "collection",
      show_on_header: true,
      category_name: "All Products",
      category_slug: "ayurvedic-products",
    },
    ...categories,
    {
      type: "blog",
      show_on_header: true,
      category_name: "Blogs",
      category_slug: "",
    },
  ];
  return (
    <>
      <Link href="/pages/special-offer">
        <div className="w-full text-center bg-black text-white text-sm py-2">
          Buy any 3 Ayuvya Products at ₹1499 only
        </div>
      </Link>
      <div className="w-full sticky top-0 bg-white z-50 shadow-md">
        <nav className="grid items-center place-items-center grid-cols-3 lg:max-w-7xl lg:mx-auto">
          <div className="flex gap-4 place-self-start ml-3 xs:ml-6 lg:ml-10 my-auto">
            <Menu categories={categories} params={params} />
            <Search />
          </div>
          <Link href="/" key="home" className="place-self-center">
            <Image
              priority
              width={100}
              height={80}
              alt="Ayuvya Logo"
              className="w-fit cursor-pointer "
              src={"/assets/logo/ayuvya-350x114-black.webp"}
            />
          </Link>
          <CartButton />
        </nav>
        <div className="mx-auto overflow-x-hidden max-w-7xl lg:w-fit">
          <div className="flex justify-start items-center overflow-x-auto shadow-md example">
            {...newCategories.map((item, idx) => {
              const sub_url = `/${item?.category_slug === "nutrition"
                ? "category/natural-health-care"
                : item?.category_slug === "skin-care"
                  ? "category/ayurvedic-skin-care"
                  : item?.type
                    ? item?.type + "/" + item?.category_slug
                    : ""
                }`;
              return (
                <Fragment key={idx}>
                  {item?.show_on_header && (
                    <Link
                      href={sub_url}
                      className={`${params === sub_url
                        ? "text-rosegold font-black text-base"
                        : "text-sm"
                        }`}
                    >
                      <p className="w-max px-4 py-2 tracking-wide font-semibold">
                        {item?.category_name}
                      </p>
                    </Link>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
        <div className="text-[#232323] bg-[#FFDE4B] w-full text-center py-[2px] xsss:py-1 xss:py-2 lg:py-1 px-2">
          <div className="font-thin uppercase text-xss xss:text-xs md:text-lg" dangerouslySetInnerHTML={{ __html: discount_titles.TOP_BANNER }}>
          </div>
        </div>
      </div>
      {/*params && [
        "/",
        "/track-order",
        "/contact",
        "/about-us",
        "/collection",
        "/category",
      ].some((e) => params.includes(e)) ? <BottomNav /> : <></>*/}
      {params === "/" && <BottomNav />}
    </>
  );
}
