import React, {useState } from "react";
import youtube from "../api/youtube";
import SearchList from "./SearchList";
import "./Search.css";

import SearchIcon from '@material-ui/icons/Search';



const Search = props => {
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);
  
 
  const searchByKeyword = async (e) => {
    e.preventDefault();
    const response = await youtube.get('/search', {
      params: {
          q: searchTerm
        }
    })
    setVideos([...response.data.items]);
    setSearchTerm("");
  };

  function handleChange(e) {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <form className="search-form">
        <input className="search-input" type="text" value={searchTerm} onChange={handleChange}></input>
        <div className="search-button-icon" onClick={searchByKeyword}><SearchIcon/></div>
      </form>
      <SearchList socketRef={props.socketRef} videos={videos}/>
    </div>
  );
}

export default Search;