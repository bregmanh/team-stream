import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import './RoomListItem.css'
import io from "socket.io-client";


export default function RoomListItem(props) {

  const [redirect, setRedirect] = useState(null);
  const [viewers, setViewers] = useState(0)

  
  useEffect(() => {
    const socket = io.connect('ws://localhost:8080');
    socket.emit('fetch-users-from-session', props.id);
    socket.on('provide-userlist', usersPerSession => {
      console.log("users per session", usersPerSession)
      setViewers(usersPerSession.length)
      console.log("props.id", props.id)
    })
    
  }, [])
  if (redirect) {
    return <Redirect to={redirect} />
  }
  return (
    <div className="room">
      <img src={props.thumbnail} className="thumbnail" />
      <div className="room-info">
        <h2>{props.title}</h2>
        <h5>Viewers: {viewers}</h5>
        <button className="join-room" onClick={() => setRedirect(`/rooms/${props.id}`)}>Join</button>

      </div>
    </div>
  )
}