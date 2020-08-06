import React, { useState } from 'react';
import RoomListItem from '../components/RoomListItem';
import { Redirect } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function RoomList (props) {

  // const [redirect, setRedirect] = useState(null);

  console.log('props.room:',  props.room)
  console.log('props.rooms: ', props.rooms)
  // const rooms = props.rooms.map(room => (
  //   <RoomListItem
  //     key={room.id}
  //     id={room.id}
  //     viewers={props.room.viewers}
  //     // selectRoom={props.onClick(room.id)}
  //   />
  // ))

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
      {/* <ul>{rooms}</ul> */}
      <p>Only public rooms are displayed here. To join a private room, please request the link from the host</p>
    </>
  )
}