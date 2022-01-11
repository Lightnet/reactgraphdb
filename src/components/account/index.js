/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";

import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import HintPage from "./hint.js";
import PassphrasePage from "./passphrase.js";
import ProfilePage from "./profile.js";

export default function AccountPage(){

  return <>
    <div>
      <Link to="/account"> Profile </Link><span> | </span>
      <Link to="passphrase"> Passphrase </Link><span> | </span>
      <Link to="hint"> Hint </Link>
    </div>
    <Routes>
      <Route path="/" element={<ProfilePage />} />
      <Route path="/passphrase" element={<PassphrasePage />} />
      <Route path="/hint" element={<HintPage />} />
    </Routes>
  </>
}