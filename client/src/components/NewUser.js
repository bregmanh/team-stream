import React from "react";
import CopyLink from "./CopyLink";
import "./NewUser.css";

const NewUser = (props) => {
  return (
    <div className="new-user">
      <p>
        Click the icon below to copy the room url to your clipboard and share it
        with your friends!
      </p>
      <CopyLink icon={true} copyLink={props.copyLink} />
    </div>
  );
};

export default NewUser;
