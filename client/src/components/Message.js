import React, { useState, useEffect, useRef } from "react";
import "./Message.css";

export default function Message(props) {
  
  let position;
  if (props.message.id === props.yourID) {
    // BOTH ARE UNDEFINED
    console.log('message going to the right');
    console.log('props.message.id', props.message.id);
    console.log('props.yourID', props.yourID);
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
        <p>{"10:00PM"}</p>
      </div>
      <p className="message-text">
        {props.message.message}
      </p>
    </div>
  )
}
