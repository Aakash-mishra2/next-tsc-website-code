"use client";

import dynamic from "next/dynamic";
const LeftSide = dynamic(() => import("./LeftSide"), { ssr: false });
const RightSide = dynamic(() => import("./RightSide"), { ssr: false });
const Categories = dynamic(() => import("./Categories"), { ssr: false });

const Footer = ({ categories }) => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <div className="py-12">
        <p className="text-sm text-center w-3/4 mx-auto leading-6 text-gray-400">
          The information available on this website is not intended as a
          substitute for advice from your doctor, health care professional,
          physician, or any licensed herbalist. You should always consult with a
          doctor, healthcare professional before taking any nutritional,
          dietary, or herbal supplement. Products offered on this website are
          not intended to diagnose, cure, treat, or prevent any disease.
        </p>
      </div>
      <div className="relative bottom-0">
        <div className="bg-[url('/assets/images/other/footer_background.webp')] bg-no-repeat bg-center bg-cover pt-8">
          <div className="flex flex-col lg:flex-row max-w-7xl py-10 mx-auto border-t border-white text-white">
            <LeftSide />
            <RightSide />
          </div>
        </div>
        <Categories categories={categories} />
        <div className="bg-[#242424] flex justify-center items-center p-3">
          <p className="text-white text-md lg:text-lg text-center lg:text-left">
            © {year} AYURVEDA HOUSE PRIVATE LIMITED All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
