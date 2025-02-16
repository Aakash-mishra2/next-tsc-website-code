import * as fbq from "@/api/events.js";
import config from "../../../config/config";
import { VscChromeClose } from "react-icons/vsc";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { getGoogleAnalyticsId } from "@/api/generalFunc";
import useComponentVisible from "@/api/useComponentVisible";

const SearchBar = ({ searchBar, openSearchBar }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const { ref, isComponentVisible } = useComponentVisible(true);

  useEffect(() => {
    if (!isComponentVisible && searchBar) openSearchBar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComponentVisible, searchBar]);

  const handleSearch = useCallback(async () => {
    try {
      const data = { keyword: search };
      fbq.gevent("search", {
        search_term: search,
        send_to: getGoogleAnalyticsId(),
      });
      const response = await fetch(`${config.BASE_URL}api/search/products/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const products = await response.json();
      setProduct(products);
    } catch (err) {
      setProduct([{ product_nick_name: "No Result.", get_product_url: "/" }]);
      console.log(err);
    }
  }, [search]);

  useEffect(() => {
    if (search.trim().length > 0) {
      setTimeout(() => {
        handleSearch();
      }, 2000);
    }
    if (search.trim().length === 0) setProduct([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.length]);

  const handleSearchClick = (url) => {
    if (pathname === url) {
      setProduct([]);
      setSearch("");
      openSearchBar(false);
    } else router.push(url);
  };

  return (
    <div className="absolute w-[98%] top-1 left-[6px] bg-white z-10" ref={ref}>
      <div className="flex justify-between bg-white relative items-center w-full border-2 rounded-md cursor-none lg:cursor-pointer max-w-5xl mx-auto">
        <input
          type="text"
          name="search"
          id="search"
          value={search}
          placeholder="Search Here"
          autoFocus
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="w-full text-black outline-none bg-white focus:bg-white peer-focus:bg-white py-[6px] lg:py-1 px-2"
        />
        <div>
          <VscChromeClose
            onClick={() => {
              setSearch("");
              openSearchBar(false);
            }}
            size={20}
            color="black"
            className="mr-2 bg-white focus:bg-white"
          />
        </div>
      </div>
      <div
        className={`absolute left-0 right-0 max-h-[350px] shadow-lg overflow-auto z-50 items-center w-full border border-t-0 rounded-md max-w-5xl mx-auto
                    ${product?.length > 0 ? "block" : "hidden"}`}
      >
        {product?.length > 0 &&
          product?.map((pro) => {
            return (
              <div
                key={pro.id}
                onClick={() => handleSearchClick(pro.get_product_url)}
                className="p-4 hover:bg-slate-200 transition-all duration-200 cursor-none lg:cursor-pointer bg-white"
              >
                <h2 className="text-gray-600">{pro.product_nick_name}</h2>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchBar;
