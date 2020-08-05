import React, { useState, useEffect, useRef } from "react";
import './Controls.css'

export default function Controls(props) {
  const scrollBar = useRef()

  useEffect(() => {
    scrollBar.current.value = props.videoProgress
  }, [props.videoProgress])

  console.log("video progress: ", props.videoProgress)
  return (
    <>
      <input type="range" id="progress-bar" class="progress-bar" ref={scrollBar} onMouseUp={(e) => { 
        props.handleAction("scroll-video", {timePercentage: e.target.value})
      }}/>
      {/* value={videoProgress} */}
      <input type="range" class="volume-bar" onMouseUp={(e) => { props.handleAction("scroll-volume", {volumePercentage: e.target.value}) }}/>
      <button onClick={() => { props.handleAction("mute") }}>Mute</button>
      <button onClick={() => { props.handleAction("pause") }}>Stop Video</button>
      <button onClick={() => { props.handleAction("play") }}>Play Video</button>
    </>
  )
}
