import React, { useState, useEffect, useRef } from "react";
import './Controls.css'

export default function Controls(props) {
  
  const [videoProgress, setVideoProgress] = useState(0)

  // Update the value of our progress bar accordingly.
  // function updateProgressBar(){
  //   $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
  // }


  return (
    <>
      <input type="range" id="progress-bar" class="progress-bar" onMouseUp={(e) => { 
        setVideoProgress(e.target.value)
        props.handleAction("scroll-video", {timePercentage: videoProgress})
      }}/>
      {/* value={videoProgress} */}
      <input type="range" class="volume-bar" onMouseUp={(e) => { props.handleAction("scroll-volume", {volumePercentage: e.target.value}) }}/>
      <button onClick={() => { props.handleAction("mute") }}>Mute</button>
      <button onClick={() => { props.handleAction("pause") }}>Stop Video</button>
      <button onClick={() => { props.handleAction("play") }}>Play Video</button>
    </>
  )
}
