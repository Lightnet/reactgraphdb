/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGun } from "../gun/gunprovider.js";

export default function AccessNavBarTop(){

  const {gun,gunUser} = useGun();
  const [isUser,setIsUser] = useState(false);

  if(!gunUser){
    return <div>
    <Link to="/">Home</Link> <span> | </span>
    <Link to="/signin">Sign In</Link> <span> | </span>
    <Link to="/signup">Sign Up</Link>
  </div>
  }

  return <div>
    <Link to="/">Home</Link> <span> | </span>
    <Link to="account">Account</Link> <span> | </span>
    <Link to="message">Message</Link> <span> | </span>
    <Link to="chat">Chat</Link> <span> | </span>
    <Link to="settings">Settings</Link> <span> | </span>
    <Link to="signout">Sign Out</Link>
  </div>
}