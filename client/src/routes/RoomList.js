import React, { useState, useEffect } from 'react';
import RoomListItem from '../components/RoomListItem';
import { Redirect } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function RoomList (props) {
  const socketRef = props.socketRef

  useEffect(() => {
    socketRef.current.emit("query-public-rooms")
    socketRef.current.on("show-public-rooms", publicRooms => {
      console.log(publicRooms)
      setRooms(...rooms, publicRooms)
    })
  }, [])

  const [rooms, setRooms] = useState([])
  // const [redirect, setRedirect] = useState(null);

  console.log('props.room:',  props.room)
  console.log('props.rooms: ', props.rooms)
  
  
  const roomsList = rooms.map(room => (
    <RoomListItem
      title={room.title}
      // selectRoom={props.onClick(room.id)}
    />
  ))

  // function leave () {
  //   setRedirect('/');
  // }

  // if (redirect) {
  //   return <Redirect to={redirect} />
  // }

  return (
    <>
      {/* <ArrowBackIcon onClick={leave}></ArrowBackIcon> */}
      <h1 class="logo">TeamStream</h1>
      <ul>{roomsList}</ul>
      <p>Only public rooms are displayed here. To join a private room, please request the link from the host</p>
    </>
  )
}