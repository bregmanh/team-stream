import React, { useState, useEffect } from 'react';
import RoomListItem from '../components/RoomListItem';
import { Redirect } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './RoomList.css';

export default function RoomList (props) {

  const [redirect, setRedirect] = useState(null);

  const roomList = props.rooms.map(room => (
    <RoomListItem
      id={room.key}
      key={room.key}
      title={room.title}
      thumbnail={room.thumbnail}
      viewers={room.viewers}
    />
  ))

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div className="rooms-body">
      <h1 class="teamstream-back-home" onClick={() => setRedirect("/")}>TeamStream</h1>
      <ul className="rooms-list">{roomList}</ul>
      <p class="info">Only public rooms are displayed here. To join a private room, please request the link from the host</p>
    </div>
  )
}