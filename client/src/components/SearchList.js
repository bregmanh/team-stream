import React, {useState } from "react";
import SearchListItem from "./SearchListItems";
import "./SearchList.css"


const SearchList = props => {
  const searchListItems = [];
  
  props.videos.forEach(video => {
    if (video.id.videoId) {
      searchListItems.push(<SearchListItem socketRef={props.socketRef} video={video}/>);
    }
  });
  
  return (
    <ul className="search-list">
      {searchListItems.slice(0, 10)}
    </ul>

  );
}

export default SearchList;