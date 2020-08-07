import React, {useState } from "react";
import SearchListItem from "./SearchListItems";
import "./SearchList.css"


const SearchList = props => {
  function queueVideo(videoId){
    props.addVideoToQueue(videoId);
  }
  const searchListItems = props.videos.map(video => <SearchListItem queueVideo={queueVideo} video={video}/>);
  return (
    <ul className="search-list">
      {searchListItems}
    </ul>

  );
}

export default SearchList;