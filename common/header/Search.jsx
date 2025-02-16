"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  const [searchBar, openSearchBar] = useState(false); //Search Bar state

  return (
    <>
      <IoSearchOutline
        size={20}
        className="text-gray-500 cursor-none lg:cursor-pointer"
        onClick={() => openSearchBar(true)}
      />
      {searchBar && (
        <SearchBar openSearchBar={openSearchBar} searchBar={searchBar} />
      )}
    </>
  );
};

export default Search;
