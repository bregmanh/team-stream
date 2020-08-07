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

  useEffect(() => {
    socketRef.current = io.connect('ws://localhost:8080');
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={(props) => <CreateRoom socketRef={socketRef} />} />
          <Route path="/room/closed" component={SessionClosed} />
          <Route path="/rooms" render={(props) => <RoomList socketRef={socketRef} />} />
          <Route path="/room/:roomID" render={(props) => <Room match={props.match} socketRef={socketRef} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;