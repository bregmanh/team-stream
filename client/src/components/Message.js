import React, { useState, useEffect, useRef } from "react";
import "./Message.css";

export default function Message(props) {
  
  let position;
  if (props.message.id === props.yourID) {
    // BOTH ARE UNDEFINED
    position = 'right';
  } else if (props.message.username === 'TeamStreamBot') {
    position = 'middle'
  } else {
    position = 'left';
  }

  return (
    <div className={`message ${position}`}>
      <div className="message-header">
        <p>{props.message.username}</p> 
        <p>{props.message.time}</p>
      </div>
      <p className="message-text">
        {props.message.message}
      </p>
    </div>
  )
}
