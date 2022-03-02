/*
  LICENSE: MIT
  Created by: Lightnet

  By using user > message > pub > timestamp

  normal mail but require contact to be working and added to friend list

*/

import React from "react";

import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import ComposeMessage from "./ComposeMessage.jsx";
import InboxMessages from "./InboxMessages.jsx";
import { useGun } from "../gun/GunProvider.jsx";

export default function MessagePage(){

  const {gunUser} = useGun();

  if(!gunUser){
    return <>
      <Link to="/signin">Sign In</Link>
    </>
  }

  return <>
    <div>
      <Link to="/message"> Inbox </Link><span> | </span>
      <Link to="compose"> Compose </Link><span> | </span>
      <Link to="settings"> Settings </Link>
    </div>
    <Routes>
      <Route path="/" element={<InboxMessages />} />
      <Route path="/compose" element={<ComposeMessage />} />
    </Routes>
  </>
}
/*

*/
