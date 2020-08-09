import React, { useState, useEffect } from 'react';
import RoomListItem from '../components/RoomListItem';
import { Redirect } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './RoomList.css';

export default function RoomList (props) {
  const socketRef = props.socketRef
  
  const [rooms, setRooms] = useState([])
  
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit("query-public-rooms")
      socketRef.current.on("show-public-rooms", publicRooms => {
        setRooms(...rooms, publicRooms)
      })
    }
  }, [])

  const [redirect, setRedirect] = useState(null);

  const roomList = (rooms) => {
    const roomsArray = []
    for (let i = 0; i < 6; i++) {
      if (rooms[i]) {
        roomsArray.push(
          <RoomListItem
            id={rooms[i].id}
            title={rooms[i].title}
          />
        )
      } else {
        roomsArray.push(<div className="empty-room"></div>)
      }
    }
    return roomsArray
  }
  // const roomsList = rooms.map(room => (
  //   <RoomListItem
  //     id={room.id}
  //     title={room.title}
  //   />
  // ))

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div className="rooms-body">
      <h1 class="logo">TeamStream</h1>
      <ul className="rooms-list">{roomList(rooms)}</ul>
      <ArrowBackIcon size="large" onClick={() => setRedirect("/")}>Back</ArrowBackIcon>
      <p>Only public rooms are displayed here. To join a private room, please request the link from the host</p>
    </div>
  )
}