import React, {useEffect, useRef} from "react";
import Message from "./Message";
import "./TextChat.css";




const TextChat = props => {
  const textRef = useRef();

  useEffect(() => {
    textRef.current.focus();
  })

  function handleChange(e) {
    props.setMessage(e.target.value);
  }

  const chatMessages = props.messages.map(message => <Message message={message} yourID={props.yourID} />)
  
  return (
    <div>

      <div className="text-chat" id="text-chat">
        {chatMessages}
      </div>
      
      <form class="message-form" onSubmit={props.sendMessage}>
        <textarea ref={textRef} value={props.message} onChange={handleChange} placeholder="Say something..." />
        <button class="chat-button">Send</button>
      </form>
    </div>
  );
}

export default TextChat;