import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FaReddit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, loadSearchResults, setSelectedSubreddit } from "../../store/redditSlice";
import { loadPosts } from "../../store/redditSlice";
import styles from "./Header.module.css";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const selectedSubreddit = useSelector((state) => state.reddit.selectedSubreddit);

  const handleClick= (e) => { 
    dispatch(setSelectedSubreddit('/r/popular/best'));
    dispatch(loadPosts(selectedSubreddit));
  };

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();    
    dispatch(setSearchTerm(searchQuery));
    dispatch(loadSearchResults(searchQuery));
    setSearchQuery("");
  };

  /* Option 2 handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch((dispatch, getState) => {
      dispatch(setSearchTerm(searchQuery));
      const updatedQuery = selectSearchTerm(getState());
      dispatch(loadSearchResults(updatedQuery));
    });
  };  
  */

  return (
    <header>
      <div className={styles.logo}>
        <FaReddit onClick={handleClick} className={styles.logoIcon} />
        <p className={styles.logoText}>
        <span>mini&nbsp;</span>Reddit
        </p>
      </div>
      <form className={styles.search} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          name="search"
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
