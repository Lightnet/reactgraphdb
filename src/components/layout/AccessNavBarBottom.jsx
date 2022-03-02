/*
  LICENSE: MIT
  Created by: Lightnet
*/

/*
  top nav bar for menu access 
*/

import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import { useGun } from "../gun/GunProvider.jsx";
import ClockTime from "../utility/ClockTime.jsx";

export default function AccessNavBarBottom(){
  const [isLog, setIsLog] = useState(<></>);
  const { gunUser} = useGun();

  useEffect(()=>{
    
  },[])

  function clickToolSeaPair(event){
    event.preventDefault();
    //console.log('hello?')
    window.dispatchEvent(new Event('toggleToolSeaPair'));
  }

  function clickToolCryptoMessage(event){
    event.preventDefault();
    //console.log('hello?')
    window.dispatchEvent(new Event('toggleToolCryptoMessage'));
  }
  
  return (
    <div style={{
      position:'fixed'
      , width:'100%'
      , height:'28px'
      , bottom:'0px'
    }}>
    <a href="#"> Tool </a> <span> | </span>
    <a href="#" onClick={clickToolSeaPair}> Tool Sea Pair </a> <span> | </span>
    <a href="#" onClick={clickToolCryptoMessage}> Tool Crypto Message </a> <span> | </span>
    <ClockTime />
  </div>
  )
}
/*

*/
