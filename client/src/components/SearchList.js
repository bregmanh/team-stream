import React, {useState } from "react";
import SearchListItem from "./SearchListItems";
import "./SearchList.css"


const SearchList = props => {
  const searchListItems = props.videos.map(video => <SearchListItem video={video}/>);
  return (
    <ul className="search-list">
      {searchListItems}
    </ul>

  );
}

export default SearchList;