import React, { useState, useEffect, useRef } from "react";
import './Controls.css'

export default function Controls(props) {
  
  // const [range, setRange] = useState(0)


  return (
    <>
      <input type="range" id="progress-bar" class="progress-bar" onMouseUp={(e) => { props.handleAction("scroll-video", {timePercentage: e.target.value}) }}/>
      <button onClick={() => { props.handleAction("mute") }}>Mute</button>
      <button onClick={() => { props.handleAction("pause") }}>Stop Video</button>
      <button onClick={() => { props.handleAction("play") }}>Play Video</button>
    </>
  )
}
