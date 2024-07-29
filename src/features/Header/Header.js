import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FaReddit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../store/redditSlice";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    // dispatch(setSearchTerm(searchQuery));
  };

  return (
    <header>
      <div>
        <FaReddit />
        <p>
          Reddit<span>Minimal</span>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleOnChange}
          aria-label="Search posts"
        />
        <button type="submit" aria-label="Search" onClick={handleSubmit}>
          <HiOutlineSearch />
        </button>
      </form>
    </header>
  );
}

export default Header;
