import React from "react";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const LeaveRoom = props => {

    return (
        <ArrowBackIcon onClick={props.leaveRoom}>Leave Room</ArrowBackIcon>
    );
}

export default LeaveRoom;