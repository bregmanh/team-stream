import React, {useState} from "react";
import styled from "styled-components";
import Message from "./Message";
import "./TextChat.css";


const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

// const Button = styled.button`
//   background-color: #10959D;
//   width: 100%;
//   border: none;
//   height: 50px;
//   border-radius: 10px;
//   color: #3F444B;
//   font-size: 17px;
// `;


const TextChat = props => {
  function handleChange(e) {
    props.setMessage(e.target.value);
  }

  const chatMessages = props.messages.map(message => <Message message={message} yourID={props.yourID}/>)
  return (
    <div>
      
      <div className="text-chat">
        {chatMessages}
            {/* {props.messages.map((message, index) => {
              if (message.id === props.yourID) {
                return (
                  <MyRow key={index}>
                    <Message message={message} />
                  </MyRow>
                )
              }
              return (
                <PartnerRow key={index}>
                  <Message message={message} />
                </PartnerRow>
              )
            })} */}
      </div>
      
      
      
      
      <form class="message-form" onSubmit={props.sendMessage}>
        <textarea value={props.message} onChange={handleChange} placeholder="Say something..." />
        <button class="chat-button">Send</button>
      </form>
    </div>
  );
}

export default TextChat;