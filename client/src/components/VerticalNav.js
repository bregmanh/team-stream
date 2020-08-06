import React, { useState } from "react";
import "./VerticalNav.css"

// icons from material-ui
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function VerticalNav(props) {

  function handleClick(selection) {
    props.selectAside(selection);
  }
  return (

   <ul class="v-nav">
     <li class="v-nav-icon"><ExitToAppIcon onClick={() => handleClick('leave')} fontSize="large"/></li>
     <li class="v-nav-icon"><ModeCommentOutlinedIcon onClick={() => handleClick('chat')} fontSize="large"/></li>
     <li class="v-nav-icon"><PeopleAltOutlinedIcon  onClick={() => handleClick('users')} fontSize="large"/></li>
     <li class="v-nav-icon"><PersonAddOutlinedIcon onClick={() => handleClick('newuser')} fontSize="large"/></li>
     <li class="v-nav-icon"><SubscriptionsOutlinedIcon onClick={() => handleClick('queue')} fontSize="large"/></li>
     <li class="v-nav-icon"><SearchOutlinedIcon onClick={() => handleClick('addqueue')} fontSize="large"/></li>
   </ul>

  )
}