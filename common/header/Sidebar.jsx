import Link from "next/link";
import Image from "next/image";
import SocialMedia from "../SocialMedia";
import { Fragment, useEffect } from "react";
import { VscChromeClose } from "react-icons/vsc";

const Sidebar = ({ sidebar, setSidebar, categories }) => {
  const handleClick = () => {
    setSidebar(!sidebar);
  };
  const data = [
    {
      id: "100",
      type: "collection",
      category_slug: "ayurvedic-products",
      show_on_header: true,
      category_name: "All Products",
    },
    ...categories.filter((category) => category?.show_on_header),
  ];
  const otherLinks = [
    {
      links_name: "About Us",
      links_slug: "/about-us",
      id: "1",
    },
    {
      links_name: "Blogs",
      links_slug: "/blog",
      id: "2",
    },
    {
      links_name: "Contact Us",
      links_slug: "/contact",
      id: "3",
    },
    {
      links_name: "Terms And Condition",
      links_slug: "/terms-and-conditions",
      id: "4",
    },
    {
      links_name: "Privacy Policy",
      links_slug: "/privacy_policy",
      id: "5",
    },
    {
      links_name: "Track Order",
      links_slug: "/track_order",
      id: "6",
    },
    {
      links_name: "Reviews",
      links_slug: "/reviews",
      id: "7",
    },
  ];

  return (
    <>
      <div
        className={`w-full example overflow-auto xs:w-3/4 h-full bg-white fixed text-black top-0 left-0 z-[1000] ease-linear duration-300 xs:max-w-[400px]
                    ${
                      sidebar
                        ? "-translate-x-0 opacity-100"
                        : "-translate-x-full opacity-0"
                    }`}
      >
        <div className="p-4">
          <div className="flex justify-between pb-6">
            <Link href="/" className="cursor-pointer">
              <Image
                className="w-24"
                src={
                  "https://storage.googleapis.com/ayuvya_images/product_image/ayuvyablack_logo_17april2024_2.webp"
                }
                alt="AYuvya logo"
                width={100}
                height={100}
                priority
              />
            </Link>
            <VscChromeClose
              size={25}
              onClick={handleClick}
              className="font-bold cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-3 text-2xl font-semibold pb-6">
            {data.map((category, index) => {
              const sub_url = `/${
                category?.category_slug === "nutrition"
                  ? "category/natural-health-care"
                  : category?.category_slug === "skin-care"
                  ? "category/ayurvedic-skin-care"
                  : category?.type + "/" + category?.category_slug
              }`;
              return (
                <Fragment key={category.id}>
                  {category?.show_on_header && (
                    <Link href={sub_url} onClick={handleClick} className="">
                      <div
                        style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                        className={`transition transform inline ease-in duration-500 overflow-hidden -translate-x-full ${
                          sidebar ? `opacity-100 -translate-x-0` : "opacity-0"
                        }`}
                      >
                        {category.category_name}
                      </div>
                    </Link>
                  )}
                </Fragment>
              );
            })}
            {/*<motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: data.length * 0.075,
                }}
              >
                {categories.length > 0 && (
                  <Link onClick={handleClick} to={"/dosha-quiz"}>
                    Play our Quiz
                  </Link>
                )}
                </motion.div>*/}
          </div>
          <div className="flex flex-col gap-3 text-sm pb-6">
            {otherLinks.map((links, index) => {
              return (
                <Link
                  key={links.id}
                  onClick={handleClick}
                  href={links?.links_slug}
                >
                  <div
                    style={{
                      transitionDelay: `${(data.length + index + 1) * 100}ms`,
                    }}
                    className={`text-base transition transform inline ease-in duration-500 overflow-hidden -translate-x-full ${
                      sidebar ? `opacity-100 -translate-x-0` : "opacity-0"
                    }`}
                  >
                    {links.links_name}
                  </div>
                </Link>
              );
            })}
            <div
              style={{
                transitionDelay: `${
                  (data.length + otherLinks.length + 1) * 100
                }ms`,
              }}
              className={`text-base transition transform inline ease-in duration-500 -translate-x-full ${
                sidebar ? `w-0 opacity-100 -translate-x-0` : "opacity-0"
              }`}
            >
              <SocialMedia />
            </div>
          </div>
        </div>
        {/*          <div className="absolute bottom-0 flex w-full border-t border-t-slate-500">
            <Link
              to={"/my-account"}
              onClick={handleClick}
              className="w-1/2 py-3 text-xl flex gap-2 cursor-none lg:cursor-pointer items-center justify-center"
            >
              {isLoggedIn ? <FaUser size={20} /> : <FaUserPlus size={25} />}
              <span>Account</span>
            </Link>
            <Link
              to={"/rewards"}
              onClick={handleClick}
              className="w-1/2 py-3 text-xl flex gap-2 cursor-none lg:cursor-pointer items-center justify-center"
            >
              <AiFillGift size={25} />
              <span>Rewards</span>
            </Link>
              </div>*/}
      </div>
    </>
  );
};

export default Sidebar;
