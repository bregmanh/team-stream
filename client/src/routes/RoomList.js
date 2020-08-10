import React, { useState, useEffect } from 'react';
import RoomListItem from '../components/RoomListItem';
import { Redirect } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './RoomList.css';

export default function RoomList (props) {

  const [redirect, setRedirect] = useState(null);

  // const roomList = (rooms) => {
  //   const roomsArray = []
  //   for (let i = 0; i < 6; i++) {
  //     if (rooms[i]) {
  //       roomsArray.push(
  //         <RoomListItem
  //           id={rooms[i].id}
  //           title={rooms[i].title}
  //         />
  //       )
  //     } else {
  //       roomsArray.push(<div className="empty-room"></div>)
  //     }
  //   }
  //   return roomsArray
  // }
  const roomList = props.rooms.map((room, index) => (
    // [{key: session.id, title: "", thumbnail: "", viewers: 10}]
    <RoomListItem
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
      <h1 class="logo">TeamStream</h1>
      <ul className="rooms-list">{roomList}</ul>
      <ArrowBackIcon size="large" onClick={() => setRedirect("/")}>Back</ArrowBackIcon>
      <p>Only public rooms are displayed here. To join a private room, please request the link from the host</p>
    </div>
  )
}