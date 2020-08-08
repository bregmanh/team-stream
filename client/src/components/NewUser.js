import React from "react";
import CopyLink from "./CopyLink";



const NewUser = props => {
    return (
        <div className="new-user">
            <p>Click the icon below to copy the room url to your clipboard and share it with friends!</p>
            <CopyLink copyLink={props.copyLink}/>
        </div>
    );
}

export default NewUser;