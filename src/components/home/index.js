/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';
import { useNotifty } from '../notify/notifyprovider.js';
import { nInfo } from '../notify/notifytype.js';

export default function HomePage(){


  const { setNotify } = useNotifty();

  function clickInfo(){
    //NotifyInfo(<label> Test </label>,true);
    //console.log(NotifyInfo);
    //NotifyInfo(setNotify,"test",true);

    //setNotify({})

    setNotify(nInfo( <label> Test </label>,true ))
  }

  return <>
    <label>HomePage!</label>
    <button onClick={clickInfo}> Test Info </button>
  </>
}