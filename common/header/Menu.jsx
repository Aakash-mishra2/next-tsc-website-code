"use client";

import Sidebar from "./Sidebar";
import WhatsappIcon from "../WhatsappIcon";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";

const Menu = ({ categories, params }) => {
  const router = useRouter();
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    router.prefetch("/checkout");
    router.prefetch("/thank-you");
  }, [router]);

  useEffect(() => {
    if (sidebar) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [sidebar]);

  return (
    <>
      <RxHamburgerMenu
        onClick={() => setSidebar(true)}
        size={20}
        className="cursor-none lg:cursor-pointer"
      />
      {!sidebar && params === "/" && <WhatsappIcon show={true} />}
      {sidebar && (
        <div className={`w-full bg-black/70 h-screen fixed top-0 left-0 z-10`}>
          <Sidebar
            sidebar={sidebar}
            setSidebar={setSidebar}
            categories={categories}
          />
        </div>
      )}
    </>
  );
};

export default Menu;
