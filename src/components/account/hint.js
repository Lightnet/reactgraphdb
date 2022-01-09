/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import { useGun } from "../gun/gunprovider.js";

export default function HintPage(){

  const {gun}=useGun();

  return <>
    <label>HintPage</label>
  </>
}