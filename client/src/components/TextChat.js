import React, { useEffect, useRef } from "react";
import Message from "./Message";
import "./TextChat.css";

const TextChat = (props) => {
  const textRef = useRef();

  useEffect(() => {
    textRef.current.focus();
  });

  function handleChange(e) {
    props.setMessage(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      props.sendMessage(e);
    }
  }

  const chatMessages = props.messages.map((message, index) => (
    <Message key={index} message={message} yourID={props.yourID} />
  ));

  return (
    <div>
      <div className="text-chat" id="text-chat">
        {chatMessages}
      </div>

      <form className="message-form" onSubmit={props.sendMessage}>
        <textarea
          ref={textRef}
          value={props.message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Say something..."
        />
        <button className="chat-button">Send</button>
      </form>
    </div>
  );
};

export default TextChat;
