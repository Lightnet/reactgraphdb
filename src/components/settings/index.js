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

import CookiePage from "./cookie.js";
import StoragePage from "./storage.js";
import ThemePage from "./theme.js";

export default function AccountPage(){

  return <>
    <div>
      <Link to="theme"> Theme </Link><span> | </span>
      <Link to="cookie"> Cookie </Link><span> | </span>
      <Link to="storage"> Storage </Link><span> | </span>
    </div>
    <Routes>
      <Route path="theme" element={<ThemePage />} />
      <Route path="cookie" element={<CookiePage />} />
      <Route path="storage" element={<StoragePage />} />
    </Routes>
  </>
}