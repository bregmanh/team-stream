import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { v1 as uuid } from "uuid";
import './CreateRoom.css';

const CreateRoom = (props) => {
    const publicOrPrivate = useRef()

    const [redirect, setRedirect] = useState(null);

    function create() {
        const id = uuid();
        // props.history.push(`/room/${id}`);
        if (publicOrPrivate.current.value === 'public' || 'private') {
            console.log(publicOrPrivate.current.value)
            setRedirect(`/room/${id}`);
        }
        // In the list of rooms component, I can access this value using props
        // if (publicOrPrivate.current.value === 'private') {

        // }
    }
    if (redirect) {
        return <Redirect to={redirect} />
    }
    return (
        <div className="home-container">
            <h1><span className="heading-white">Watch streams together</span> <span className="heading-green">with people you care about</span></h1>
            <div className="room-container">
                <div className="room-buttons">
                    <div className="create-room">
                        <select ref={publicOrPrivate}>
                            <option selected disabled>Select a Room</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                        <button onClick={create}>Create Room</button>
                    </div>
                    <button>Join Room</button>
                </div>
            </div>
        </div>
    );
}

export default CreateRoom;