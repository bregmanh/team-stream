import React, { useState } from "react";
import SearchListItem from "./SearchListItems";
import "./SearchList.css";

const SearchList = (props) => {
  const searchListItems = [];

  props.videos.forEach((video) => {
    if (video.id.videoId) {
      searchListItems.push(
        <SearchListItem key={video.id.videoId} socketRef={props.socketRef} video={video} />
      );
    }
  });

  return (
    <div className="list-container">
      <ul className="search-list">{searchListItems.slice(0, 10)}</ul>
    </div>
  );
};

export default SearchList;
