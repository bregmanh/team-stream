import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import SessionClosed from "./routes/SessionClosed";
import Room from "./routes/Room";
import RoomList from "./routes/RoomList";
import io from "socket.io-client";
import './App.css';

function App() {
  const socketRef = useRef();
  const [rooms, setRooms] = useState([])
  const [room, setRoom] = useState({})

  useEffect(() => {
  socketRef.current = io.connect('/');
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={(props) => <CreateRoom room={room} rooms={rooms} setRoom={setRoom} setRooms={setRooms} />} />
          <Route path="/room/closed" component={SessionClosed} />
          <Route path="/rooms" render={(props) => <RoomList room={room} rooms={rooms} />} />
          <Route path="/room/:roomID" render={(props) => <Room match={props.match} socket={socketRef} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;