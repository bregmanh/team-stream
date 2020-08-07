import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { v1 as uuid } from "uuid";
import './CreateRoom.css';
// const knex = require('knex');

// const knexFile = require('../../..knexfile').development;

// const db = knex(knexFile);

// const insertData = (tableName, data) => {

//     return db(tableName)
//             .insert(data)
//             .then(resp => resp)
//             .finally(() => db.destroy());
// }


import VerticalNav from "../components/VerticalNav";

const CreateRoom = (props) => {
    const socketRef = props.socketRef
    const publicOrPrivate = useRef()

    const [redirect, setRedirect] = useState(null);

    function createSession() {
        const id = uuid();
        // props.history.push(`/room/${id}`);
        if (publicOrPrivate.current.value === 'Select a Room') {
            return
        }
        socketRef.current.emit('create-session')
        // props.setRoom(roomObj)
        console.log(props.room)
        // props.setRooms(...props.rooms, props.room)
        console.log(props.rooms)
        setRedirect(`/room/${id}`);
        // In the list of rooms component, I can access this value using props
        // if (publicOrPrivate.current.value === 'private') {

        // }
    }

    function joinSession () {
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
                        <button onClick={createSession}>Create Room</button>
                    </div>
                    <button onClick={joinSession}>Join Room</button>
                </div>
            </div>
        </div>
    );
}

export default CreateRoom;