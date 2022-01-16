/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';
import { useNotifty } from "./notifyprovider.js"
import { nInfo } from './notifytype.js';

export default function NotiftyTest(){

  const {setNotify} = useNotifty();

  function clickInfo(){
    setNotify(nInfo( <label> Test </label>,true ))
  }


  return <>
    <button onClick={clickInfo}> Test Info </button>
  </>
}