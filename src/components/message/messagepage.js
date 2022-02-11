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
import ComposeMessage from "./compose.js";
import InboxMessages from "./inbox.js";

export default function MessagePage(){

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
