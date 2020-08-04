import React from "react";

const LeaveRoom = props => {
    function leave() {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

    return (
        <button onClick={create}>Create Room</button>
    );
}

export default CreateRoom;