import React, { useState, useEffect } from 'react';
import RoomListItem from '../components/RoomListItem';
import { Redirect } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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

  const roomList = props.rooms.map(room => (
    <RoomListItem
      key={room.key}
      title={room.title}
      thumbnail={room.thumbnail}
      viewers={room.viewers}
    />
  ))
  // const list = [
  //     {key: 1, title: "Chaim", thumbnail: "", viewers: 10},
  //     {key: 1, title: "Chaim", thumbnail: "", viewers: 10},
  //     {key: 1, title: "Chaim", thumbnail: "", viewers: 10},
  //     {key: 1, title: "Chaim", thumbnail: "", viewers: 10},
  //     {key: 1, title: "Chaim", thumbnail: "", viewers: 10},
  //     {key: 1, title: "Chaim", thumbnail: "", viewers: 10},
  //     {key: 1, title: "Chaim", thumbnail: "", viewers: 10},
  //   ]
  // const roomList = list.map((room) => (

  //   <RoomListItem
  //     key={room.key}
  //     title={room.title}
  //     thumbnail={room.thumbnail}
  //     viewers={room.viewers}
  //   />
  // ))

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