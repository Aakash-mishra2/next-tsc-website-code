"use client";
import { useState } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

const Pagination = ({ data, limit, setCurrentPageData }) => {
  const newArr = [];
  const [page, setPage] = useState(1);
  const noOfPages = new Array(Math.round(data.length / limit)).fill(null);
  noOfPages.map((page, index) => {
    if (page === null) newArr.push({ pageNo: index });
    return "";
  });

  const handlePage = (index) => {
    setPage(index);
    const offset = index * limit;
    const previousReviews = data;
    setCurrentPageData(previousReviews.slice(offset - limit, offset));
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.log("Error:" + error);
    }
  };

  return (
    <div className="lg:mx-6">
      {data.length >= limit && (
        <div className="flex gap-2 items-center justify-center my-5">
          {page - 1 !== 0 ? (
            <BsArrowLeftShort
              onClick={() => handlePage(page - 1)}
              size={35}
              className="hover:bg-black/5 hover:rounded hover:text-black/20"
            />
          ) : (
            <BsArrowLeftShort
              size={35}
              className="cursor-not-allowed text-black/20"
            />
          )}
          {(newArr.length > 4
            ? newArr.slice(page < 3 ? 0 : page - 3, page < 3 ? 4 : page + 1)
            : newArr.slice(0)
          ).map((item) => {
            return (
              <div
                onClick={() => handlePage(item.pageNo + 1)}
                key={item.pageNo}
                className={`text-xl w-8 h-8 items-center flex justify-center transition-all duration-200 cursor-none lg:cursor-pointer rounded-full ${
                  item.pageNo + 1 === page
                    ? "text-white bg-black"
                    : "text-black hover:text-white hover:bg-black"
                }`}
              >
                {item.pageNo + 1}
              </div>
            );
          })}
          {noOfPages.length > 4 && noOfPages.length !== page && "....."}
          {page !== noOfPages.length ? (
            <BsArrowRightShort
              onClick={() => handlePage(page + 1)}
              size={35}
              className="hover:bg-black/5 hover:rounded hover:text-black/20"
            />
          ) : (
            <BsArrowRightShort
              size={35}
              className="cursor-not-allowed text-black/20"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Pagination;
