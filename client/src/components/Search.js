import React, { useState, useEffect, useRef } from "react";
import youtube from "../api/youtube";
import SearchList from "./SearchList";
import "./Search.css";

import SearchIcon from "@material-ui/icons/Search";

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);
  const inputRef = useRef();

  const searchByKeyword = async (e) => {
    e.preventDefault();
    const response = await youtube.get("/search", {
      params: {
        q: searchTerm,
      },
    });
    setVideos([...response.data.items]);
    setSearchTerm("");
  };

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div>
      <form className="search-form" onSubmit={searchByKeyword}>
        <input
          className="search-input"
          type="text"
          ref={inputRef}
          value={searchTerm}
          onChange={handleChange}
        ></input>
        <div className="search-button-icon" onClick={searchByKeyword}>
          <SearchIcon />
        </div>
      </form>
      <SearchList socketRef={props.socketRef} videos={videos} />
    </div>
  );
};

export default Search;
