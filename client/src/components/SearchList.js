import React, {useState } from "react";
import SearchListItem from "./SearchListItems";
import "./SearchList.css"


const SearchList = props => {
  function queueVideo(videoId){
    props.addVideoToQueue(videoId);
  }
 
  const searchListItems = [];
  
  props.videos.forEach(video => {
    if (video.id.videoId) {
      searchListItems.push(<SearchListItem queueVideo={queueVideo} video={video}/>);
    }
  });
  
  
  return (
    <ul className="search-list">
      {searchListItems.slice(0, 10)}
    </ul>

  );
}

export default SearchList;