import React from "react";
import "./LeaveRoom.css";


const LeaveRoom = props => {
    return (
        <div className="leave-room">
            <h1>Chaim's Quarters</h1>
            <p>username: bob</p>
            <button className="leave-button" onClick={props.leaveRoom}>Leave Room</button>
            <p className="alert"><b>Caution!</b> If you are the host, this action will terminate the session for all other participants.</p>
        </div>
    );
}

export default LeaveRoom;