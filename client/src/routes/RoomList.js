import React from 'react';
import RoomListItem from '../components/RoomListItem'
import CreateRoom from './CreateRoom'

export default function RoomList (props) {

  const rooms = props.rooms.map(room => (
    <RoomListItem
      key={room.id}
      id={room.id}
      // selectRoom={props.onClick(room.id)}
    />
  ))
  return (
    <>
      <ul>{rooms}</ul>
      <p>Only public rooms are displayed here. To join a private room, please request the link from the host</p>
    </>
  )
}