import React, { useState } from "react";
import "./VerticalNav.css"

// icons from material-ui
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';




export default function VerticalNav(props) {
  
  function handleClick(e) {
  const li = e.target.parentElement;
  li.classList.toggle('active');
  // props.toggleAside;
  }
  return (

   <ul class="v-nav">
     <li class="v-nav-icon"><ExitToAppIcon onClick={handleClick} fontSize="large"/></li>
     <li class="v-nav-icon"><ModeCommentOutlinedIcon onClick={handleClick} fontSize="large"/></li>
     <li class="v-nav-icon"><PeopleAltOutlinedIcon  onClick={handleClick} fontSize="large"/></li>
     <li class="v-nav-icon"><PersonAddOutlinedIcon onClick={handleClick} fontSize="large"/></li>
     <li class="v-nav-icon"><SubscriptionsOutlinedIcon onClick={handleClick} fontSize="large"/></li>
     <li class="v-nav-icon"><SearchOutlinedIcon onClick={handleClick} fontSize="large"/></li>
   </ul>

  )
}