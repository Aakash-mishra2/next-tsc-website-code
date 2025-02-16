"use client";

import Link from "next/link";
import Image from "next/image";
import NavbarIcons from "./NavbarIcons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { discount_titles } from "@/config/constants";

import dynamic from "next/dynamic";
const Categories = dynamic(() => import("./Categories"));
const Sidebar = dynamic(() => import("./Sidebar"), { ssr: false });
const SearchBar = dynamic(() => import("./SearchBar"), { ssr: false });

const Navbar = ({ categories, showOffer, specialOffer }) => {
  const router = useRouter();
  const [searchBar, openSearchBar] = useState(false); //Search Bar state
  const [sidebar, setSidebar] = useState(false); //Sidebar for mobile devices

  useEffect(() => {
    router.prefetch("/checkout");
    router.prefetch("/thank-you");
  }, [router]);

  return (
    <>
      <div className="flex justify-center items-center w-full py-2 bg-white text-black lg:bg-black lg:text-white">
        <p className="text-xs xsss:text-sm">
          Free Shipping | COD Available | 100% Herbal
        </p>
      </div>
      <nav
        className={`sticky top-0 z-50 items-center bg-black text-white lg:bg-white lg:text-black ${
          specialOffer ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="flex justify-between items-center py-1 px-4 lg:px-16">
          {!searchBar && (
            <div className="lg:hidden">
              <RxHamburgerMenu
                size={25}
                onClick={() => setSidebar(!sidebar)}
                className="cursor-pointer text-white"
              />
            </div>
          )}
          <div className="w-28 hidden lg:block">
            <Link href="/" key="home">
              <Image
                priority
                width={100}
                height={100}
                alt="Ayuvya Logo"
                className="w-fit cursor-pointer"
                src={
                  "https://storage.googleapis.com/ayuvya_images/product_image/ayuvyablack_logo_17april2024_2.webp"
                }
              />
            </Link>
          </div>
          {!searchBar && (
            <div className="w-24 ml-6 lg:hidden">
              <Link href="/" key="home">
                <Image
                  className="w-fit cursor-pointer"
                  src={
                    "https://storage.googleapis.com/ayuvya_images/product_image/ayuvyawhite_logo_17april2024_3.webp"
                  }
                  alt="Ayuvya Logo"
                  width={100}
                  height={100}
                  priority
                />
              </Link>
            </div>
          )}
          {searchBar ? (
            <SearchBar openSearchBar={openSearchBar} />
          ) : (
            <Categories categories={categories} />
          )}
          {!searchBar && (
            <NavbarIcons
              openSearchBar={openSearchBar}
              className={"flex lg:hidden items-baseline"}
            />
          )}
          <NavbarIcons
            openSearchBar={openSearchBar}
            className={"hidden lg:flex items-baseline"}
          />
          {categories.length > 0 && (
            <Sidebar
              sidebar={sidebar}
              setSidebar={setSidebar}
              categories={categories}
            />
          )}
        </div>
        {!specialOffer && (
          <div className="text-[#232323] bg-[#FFDE4B] w-full text-center py-1 xsss:py-2 xss:py-3 lg:py-2 px-2">
            <div className="font-thin uppercase text-xss xss:text-xs md:text-lg" dangerouslySetInnerHTML={{ __html: discount_titles.TOP_BANNER }}>
            </div>
          </div>
        )}
        {showOffer && (
          <div className="flex justify-center items-start h-9">
            <Link
              href={"/special-offer"}
              className="font-semibold font-serif px-4 py-[2px] bg-[#1D7F75] text-white cursor-pointer"
            >
              BUY ANY 5 @1499
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
