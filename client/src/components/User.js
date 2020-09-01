import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./User.css";

const User = (props) => {
  return (
    <li className="user-li">
      <AccountCircleIcon fontSize="large" />
      <p className="user-name">{props.user}</p>
    </li>
  );
};

export default User;
