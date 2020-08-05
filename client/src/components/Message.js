import React, { useState, useEffect, useRef } from "react";
import "./Message.css";

export default function Message(props) {

let styleText={
marginTop: "2px",
marginBottom: "2px",
}


  return (
    <div className="message">
      <p className="meta" style={styleText}>{props.message.username} <span>{"timeStamp"}</span></p>
      <p className="text" style={styleText}>
        {props.message.message}
      </p>
    </div>
  )
}
