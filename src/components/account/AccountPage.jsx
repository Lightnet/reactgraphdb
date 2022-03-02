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
import HintPage from "./HintPage.jsx";
import PassphrasePage from "./PassphrasePage.jsx";
import ProfilePage from "./ProfilePage.jsx";
import { useGun } from "../gun/GunProvider.jsx";

export default function AccountPage(){

  const { gunUser}=useGun();

  if(!gunUser){
    return <>
      <Link to="/signin">Sign In</Link>
    </>
  }

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