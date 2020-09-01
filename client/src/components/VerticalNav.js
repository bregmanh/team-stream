import React, { useState } from "react";
import "./VerticalNav.css";

// icons from material-ui
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";

export default function VerticalNav(props) {
  function handleClick(selection) {
    props.selectAside(selection);
  }
  return (
    <ul className="v-nav">
      <li
        className={`${
          props.selection === "leave" ? "v-nav-icon active" : "v-nav-icon"
        }`}
      >
        <HomeRoundedIcon onClick={() => handleClick("leave")} />
      </li>
      <li
        className={`${
          props.selection === "chat" ? "v-nav-icon active" : "v-nav-icon"
        }`}
      >
        <ModeCommentOutlinedIcon onClick={() => handleClick("chat")} />
      </li>
      <li
        className={`${
          props.selection === "users" ? "v-nav-icon active" : "v-nav-icon"
        }`}
      >
        <PeopleAltOutlinedIcon onClick={() => handleClick("users")} />
      </li>
      <li
        className={`${
          props.selection === "newuser" ? "v-nav-icon active" : "v-nav-icon"
        }`}
      >
        <PersonAddOutlinedIcon onClick={() => handleClick("newuser")} />
      </li>
      <li
        className={`${
          props.selection === "queue" ? "v-nav-icon active" : "v-nav-icon"
        }`}
      >
        <SubscriptionsOutlinedIcon onClick={() => handleClick("queue")} />
      </li>
      <li
        className={`${
          props.selection === "addqueue" ? "v-nav-icon active" : "v-nav-icon"
        }`}
      >
        <SearchOutlinedIcon onClick={() => handleClick("addqueue")} />
      </li>
    </ul>
  );
}
