import React, { useState, useEffect, useRef } from "react";

export default function QueueForm(props) {
  const [videoId, setVideoId] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    props.addVideoToQueue(videoId);
    setVideoId("");
  }
  function handleChange(event) {
    setVideoId(event.target.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Youtube URL:
        <input
          type="text"
          id="videoIdInput"
          value={videoId}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Video</button>
    </form>
  );
}
