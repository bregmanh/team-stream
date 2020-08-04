import React, { useState, useEffect, useRef } from "react";

export default function Controls(props) {
  


  return (
    <>
      <button onClick={() => { props.handleAction("pause") }}>Stop Video</button>
      <button onClick={() => { props.handleAction("play") }}>Play Video</button>
    </>
  )
}
