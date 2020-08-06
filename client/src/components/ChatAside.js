import React from "react";
import "./ChatAside.css";
import LeaveRoom from "../components/LeaveRoom";
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
          <div>CHAT</div>
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