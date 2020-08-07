import React from "react";
import "./SearchListItem.css";

const SearchListItem = props => {
  const thumbnail = props.video.snippet.thumbnails.default.url;
  const title = props.video.snippet.title;
  const channel = props.video.snippet.channelTitle;
  const id = props.video.id.videoId;

  function handleClick(id) {
   props.queueVideo(id);
  }

  return (
    <li className="search-list-item">
      <img className="thumbnail-img" src={thumbnail}></img>
      <div className="info">
        <p className="title">{title}</p>
        <button className="add-to-playlist-btn" onClick={()=>handleClick(id)}>Add To Playlist</button>
      </div>
    </li>
  );
}

export default SearchListItem;