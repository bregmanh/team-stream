import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import SessionClosed from "./routes/SessionClosed";
import Room from "./routes/Room";
import RoomList from "./routes/RoomList";
import Home from "./routes/Home";
import io from "socket.io-client";
import './App.css';

function App() {
  const socketRef = useRef();
  const [rooms, setRooms] = useState([])
  
  // useEffect(() => {
  //   if (socketRef.current) {
  //     socketRef.current.emit("query-public-rooms")
  //     socketRef.current.on("show-public-rooms", publicRooms => {
  //       setRooms(...rooms, publicRooms)
  //     })
  //   }
  // }, [])

  useEffect(() => {
    socketRef.current = io.connect('ws://localhost:8080');
    if (socketRef.current) {
      socketRef.current.emit("query-public-rooms")
      socketRef.current.on("show-public-rooms", publicRooms => {
        setRooms(...rooms, publicRooms)
      })
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={(props) => <Home socketRef={socketRef} />} />
          <Route path="/rooms" exact render={(props) => <RoomList rooms={rooms} socketRef={socketRef} />} />
          <Route path="/rooms/closed" component={SessionClosed} />
          <Route path="/rooms/:roomID" render={(props) => <Room {...props} match={props.match} socketRef={socketRef} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;