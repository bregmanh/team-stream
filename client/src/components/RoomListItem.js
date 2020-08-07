import React from 'react';
import App from '../App';

export default function RoomListItem (props) {
  return (
    <li>
      <p>Video thumbnail</p>
      <p>{props.title}</p>
      <p>Room Name</p>
      {/* <button onClick={}>Join</button> */}
    </li>
  )
}