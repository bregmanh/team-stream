import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { v1 as uuid } from "uuid";
import CreateRoom from "./CreateRoom";

import "./Home.css";



const Home = (props) => {
    const socketRef = props.socketRef;
    const [redirect, setRedirect] = useState(null);
    const [open, setOpen] = React.useState(false);
   
    // Triggered when user clicks create room in modal
    function createSession(roomTitle, userName, publicBool) {
      // unique identifyer for the room(session)
      const id = uuid();
      // emit room creation to socket on server side

      // socketRef.current.emit('create-session', { room: id, title: roomTitle, public: publicBool});

      // Create the redirect object that will be passed in to the redirect component with the new route and username 
      const redirectObj = {
        pathname: `/rooms/${id}`,
        state: {username: userName}
      }
      // set redirect the the room/:id
      setRedirect(redirectObj);
    }

    function joinSession() {
      setRedirect('/rooms')
    }

    function showCreateRoom(){
      setOpen(true);
    }

    const handleClose = () => {
      setOpen(false);
    };

    if (redirect) {
        return <Redirect to={redirect} />
    }

    return (
      <div className="home-page">
        <div className="content">
          <p>Watch streams together with people you care about</p>
          <h1 className="teamstream">Team Stream</h1>
          <p>Connected, from a distance</p>
          <br></br>
          <button onClick={showCreateRoom}>Create Room</button>
          <button onClick={joinSession}>Browse Public Rooms</button>
        </div>
        <CreateRoom open={open} handleClose={handleClose} createSession={createSession}/>
      </div>
    );
}

export default Home;