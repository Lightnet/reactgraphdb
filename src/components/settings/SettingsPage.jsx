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

import CookiePage from "./CookiePage.jsx";
import StoragePage from "./StoragePage.jsx";
import ThemePage from "./ThemePage.jsx";

export default function SettingsPage(){

  return <>
    <div>
      <Link to="theme"> Theme </Link><span> | </span>
      <Link to="cookie"> Cookie </Link><span> | </span>
      <Link to="storage"> Storage </Link><span> | </span>
    </div>
    <Routes>
      <Route path="/" element={<ThemePage />} />
      <Route path="theme" element={<ThemePage />} />
      <Route path="cookie" element={<CookiePage />} />
      <Route path="storage" element={<StoragePage />} />
    </Routes>
  </>
}