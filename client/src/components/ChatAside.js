import React from "react";
import "./ChatAside.css";
import LeaveRoom from "../components/LeaveRoom";
import TextChat from "../components/TextChat";
import Users from "../components/Users";
import Queue from "../components/Queue";
import Search from "../components/Search";
import NewUser from "../components/NewUser";

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
          <NewUser copyLink={props.copyLink} />
        }
         {props.selection === "queue" && 
          <Queue />
        }
         {props.selection === "addqueue" && 
          <Search addVideoToQueue={props.addVideoToQueue}/>
        }
     </div>
   </div>
  );
}