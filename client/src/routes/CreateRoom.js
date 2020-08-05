import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { v1 as uuid } from "uuid";
import './CreateRoom.css';

const CreateRoom = (props) => {
    const [redirect, setRedirect] = useState(null);

    function create() {
        const id = uuid();
        // props.history.push(`/room/${id}`);
        setRedirect(`/room/${id}`);
    }
    if (redirect) {
        return <Redirect to={redirect} />
    }
    return (
        <div class="home-container">
            <h1><span class="heading-white">Watch streams together</span> <span class="heading-green">with people you care about</span></h1>
            <div class="room-container">
                <button onClick={create}>Create Room</button>
                <button>Private Room</button>
            </div>
        </div>
    );
}

export default CreateRoom;