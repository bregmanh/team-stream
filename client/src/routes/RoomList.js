import React from 'react';
import RoomListItem from '../components/RoomListItem'

export default function RoomList (props) {
  console.log('props.room:',  props.room)
  console.log('props.rooms: ', props.rooms)
  const rooms = props.rooms.map(room => (
    <RoomListItem
      key={room.id}
      id={room.id}
      viwers={props.room.viewers}
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