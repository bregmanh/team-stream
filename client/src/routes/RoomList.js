import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import { Redirect } from "react-router-dom";
import RoomListItem from '../components/RoomListItem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './RoomList.css';

export default function RoomList (props) {
  const [redirect, setRedirect] = useState(null);
  const [currentRooms, setCurrentRooms] = useState([]);

  useEffect(() => {
    const socket = io.connect('ws://localhost:8080');
    if (socket) {
      console.log('===========================>I am emitting')
      socket.emit("query-public-rooms")
      socket.on("show-public-rooms", publicRooms => {
        console.log('I GOTS DA PUBLIC ROOMS YO');
        setCurrentRooms(publicRooms)
      })
    }
  }, [])


  const roomList = currentRooms.map(room => (
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
      <h1 class="teamstream">TeamStream</h1>
      <ul className="rooms-list">{roomList}</ul>
      <ExitToAppIcon className="back-icon" style={{fontSize: '5rem'}} onClick={() => setRedirect("/")}></ExitToAppIcon>
      <p class="info">Only public rooms are displayed here. To join a private room, please request the link from the host</p>
    </div>
  )
}