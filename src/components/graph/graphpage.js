/*
  LICENSE: MIT
  Created by: Lightnet

  Information: 
    Look into the gun._.graph
*/

import React from "react";
import { useGun } from "../gun/gunprovider.js";

export default function GraphPage(){

  const {gun} = useGun();

  function clickGetGraph(){
    console.log(gun);
    console.log(gun._.graph);
  }
  return <>
    <button onClick={clickGetGraph}> Graph </button>
  </>
}