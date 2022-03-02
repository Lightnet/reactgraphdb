/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect } from "react"

export default function CookiePage(){

  useEffect(()=>{
    let cookie = document.cookie;
    console.log(cookie);
  },[])

  return <>
    <p> There is no Cookie set on server side. Since it used local stroage limit to 5 MB and websocket.</p>
  </>
}