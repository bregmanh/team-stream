import React from 'react';
import App from '../App';

export default function RoomListItem (props) {
  return (
    <li>
      <p>Video thumbnail</p>
      <p>Room Name</p>
      <p>Number of viewers: {props.viewers}</p>
      {/* <button onClick={}>Join</button> */}
    </li>
  )
}