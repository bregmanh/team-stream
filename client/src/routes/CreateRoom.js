import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { v1 as uuid } from "uuid";

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
        <button onClick={create}>Create Room</button>
    );
}

export default CreateRoom;