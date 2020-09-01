import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Redirect } from "react-router-dom";
import RoomListItem from "../components/RoomListItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./RoomList.css";

export default function RoomList(props) {
  const [redirect, setRedirect] = useState(null);
  const [currentRooms, setCurrentRooms] = useState([]);

  useEffect(() => {
    const socket = io.connect("ws://localhost:8080");
    if (socket) {
      socket.emit("query-public-rooms");
      socket.on("show-public-rooms", (publicRooms) => {
        
        setCurrentRooms(publicRooms);
      });
    }
  }, []);

  const roomList = currentRooms.map((room) => (
    <RoomListItem
      id={room.id}
      key={room.id}
      title={room.title}
      thumbnail={room.thumbnail}
    />
  ));

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className="rooms-body">
      <h1 className="teamstream-back-home" onClick={() => setRedirect("/")}>
        TeamStream
      </h1>
      <ul className="rooms-list">{roomList}</ul>
      <p className="footer-info">
        Only public rooms are displayed here. To join a private room, please
        request the link from the host
      </p>
    </div>
  );
}
