import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import './RoomListItem.css'

export default function RoomListItem (props) {

  const [redirect, setRedirect] = useState(null);

  if (redirect) {
    return <Redirect to={redirect} />
  }
  return (
    <div className="room">
      <img src={props.thumbnail} className="thumbnail" />
      <div className="room-info">
        <h2>{props.title}</h2>
        <h5>Viewers: {props.viewers}</h5>
        <button className="join-room" onClick={() => setRedirect(`/rooms/${props.key}`)}>Join</button>
      </div>
    </div>
  )
}