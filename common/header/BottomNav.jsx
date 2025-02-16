"use client";
import buyImg from "../../../../public/assets/images/other/buy-3-ezgif.com-gif-to-webp-converter.webp"
import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { BiSolidContact } from "react-icons/bi";
import { LuPackageSearch } from "react-icons/lu";
import Image from "next/image";
export default function BottomNav() {
  const pathname = usePathname();
  const list_item = [
    {
      id: 1,
      slug: "/",
      icon: IoHome,
      text: "Home",
    },
    {
      id: 2,
      slug: "/collection/ayurvedic-products",
      icon: LuPackageSearch,
      text: "All Products",
    },
    {
      id: 3,
      slug: "/track_order",
      icon: FaTruck,
      text: "Track Order",
    },
    {
      id: 4,
      slug: "/pages/special-offer",
      icon: null,
      imageUrl: buyImg,
      text: "At 1499/-",
    },
  ];
  return (
    <div
      className="fixed bottom-3 mx-3 rounded-full shadow-3xl left-0 right-0 z-[40] flex justify-around items-center py-2 bg-white xs:hidden"
      style={{
        backgroundColor: "#1D7F75",
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        // for transparent bg
        // background: "rgba(29, 127, 117, 0.8)",
        // boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        // backdropFilter: "blur(5px)",
        // webkitBackdropFilter: "blur(5px)",
        // border: "1px solid rgba(29, 127, 117, 0.3)",
      }}
    >
      {list_item.map((item) => {
        const Icon = item?.icon ? item?.icon : item?.imageUrl;
        return (
          <Link
            key={item?.id}
            href={item?.slug}
            className="flex flex-col justify-center items-center text-white cursor-none"
          >
            {item?.icon ? <Icon className="text-xl xss:text-2xl cursor-none p-[2px]" />
              : <Image src={item?.imageUrl} alt="buyLogo" loading="eager" className="w-8 h-6" />}
            <p
              className={`text-xss text-white ${(pathname === item?.slug ||
                (pathname.includes(item?.slug) && item?.slug !== "/")) &&
                "border-b-2 leading-3 font-extrabold"
                }`}
            >
              {item?.text}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
