import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import UsernameForm from "../components/UsernameForm"
import Chat from "../components/Chat"

const Page = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  background-color: rgb(41, 41, 41);
  flex-direction: column;
`;

const Room = (props) => {
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(true);
  const [isPublic, setIsPublic] = useState(true)
  const room = props.match.params.roomID;

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(props.location.state) {
      setUsername(props.location.state.username);
      setOpen(false);
    }
  }, []);

  function updateUsername(usernamePassed) {
    setUsername(usernamePassed)
  }

  return (
    <Page>
      <UsernameForm open={open} handleClose={handleClose} updateUsername={updateUsername}/>
      {username &&
        <Chat socketRef={props.socketRef} username={username} room={room}/>
      }
    </Page>
  )
};

export default Room;
