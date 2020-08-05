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
        <div className="home-container">
            <h1><span className="heading-white">Watch streams together</span> <span className="heading-green">with people you care about</span></h1>
            <div className="room-container">
                <div className="room-buttons">
                    <button onClick={create}>Create Room</button>
                    <button>Private Room</button>
                </div>
            </div>
        </div>
    );
}

export default CreateRoom;