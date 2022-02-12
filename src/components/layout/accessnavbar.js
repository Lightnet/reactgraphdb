/*
  LICENSE: MIT
  Created by: Lightnet
*/

/*
  top nav bar for menu access 
*/

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGun } from "../gun/gunprovider.js";
import ThemeLink from "../theme/themelink.js";

export default function AccessNavBarTop(){
  const [isLog, setIsLog] = useState(<></>);
  const { gunUser} = useGun();

  useEffect(()=>{
    if(!gunUser){
      setIsLog(
        <>
          <Link to="/signin">Sign In</Link> <span> | </span>
          <Link to="/signup">Sign Up</Link> <span> | </span>
        </>
      )
    }else{
      setIsLog(
        <>
          <Link to="signout">Sign Out</Link>
        </>
      )
    }
  },[gunUser])
  
  return <div>
    <Link to="/">Home</Link> <span> | </span>
    <Link to="account">Account</Link> <span> | </span>
    <Link to="message">Message</Link> <span> | </span>
    <Link to="chat">Chat</Link> <span> | </span>
    <Link to="groupchat">Group Chat</Link> <span> | </span>
    <Link to="graph"> Graph </Link> <span> | </span>
    <ThemeLink /> <span> | </span>
    <Link to="settings">Settings</Link> <span> | </span>
    {isLog}
    
  </div>
}