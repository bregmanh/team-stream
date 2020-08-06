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
        if (publicOrPrivate.current.value === 'Select a Room') {
            return
        }
        const roomObj = {thumbnail: "", id, viewers: 1}
        props.setRoom(roomObj)
        console.log(props.room)
        props.setRooms(...props.rooms, props.room)
        console.log(props.rooms)
        setRedirect(`/room/${id}`);
        // In the list of rooms component, I can access this value using props
        // if (publicOrPrivate.current.value === 'private') {

        // }
    }

    function join () {
        setRedirect('/rooms')
    }

    if (redirect) {
        return <Redirect to={redirect} />
    }
    return (
        <div className="home-container">
            <h1 className="logo">TeamStream</h1>
            <h2><span className="heading-white">Watch streams together</span> <span className="heading-green">with people you care about</span></h2>
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
                    <button onClick={join}>Join Room</button>
                </div>
            </div>
        </div>
    );
}

export default CreateRoom;