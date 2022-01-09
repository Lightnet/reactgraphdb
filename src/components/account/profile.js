/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import { useGun } from "../gun/gunprovider.js";

export default function ProfilePage(){

  const {gun}=useGun();

  return <>
    <label>Profile</label>
  </>
}