import React from "react";
import "./ChatAside.css";
import LeaveRoom from "../components/LeaveRoom";
import TextChat from "../components/TextChat";
import Users from "../components/Users";

export default function ChatAside(props) {
  return (
   <div className={`chat-aside ${props.toggleState}`}>
     <header class="logo">TeamStream</header>
     <div className="contents">
        {props.selection === "leave" && 
          <LeaveRoom leaveRoom={props.leaveRoom}/>
        }
        {props.selection === "chat" && 
          <TextChat message={props.message} setMessage={props.setMessage} yourID={props.yourID} messages={props.messages} sendMessage={props.sendMessage}/>
        }
         {props.selection === "users" && 
          <Users/>
        }
         {props.selection === "newuser" && 
          <div>NEW USER</div>
        }
         {props.selection === "queue" && 
          <div>QUEUE</div>
        }
         {props.selection === "addqueue" && 
          <div>ADD TO QUEUE</div>
        }
     </div>
   </div>
  );
}