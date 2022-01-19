/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';
import { useNotifty } from "./notifyprovider.js"
import { nError, nInfo, nSuccess, nWarning } from './notifytype.js';

export default function NotiftyTest(){

  const {setNotify} = useNotifty();

  function clickInfo(){
    //setNotify(nInfo( <label> Test </label>,true ))
    setNotify(nInfo( 'Test' ,true ))
  }

  function clickSuccess(){
    setNotify(nSuccess( <label> Test </label>,true ))
  }

  function clickWarning(){
    setNotify(nWarning( <label> Test </label>,true ))
  }

  function clickError(){
    setNotify(nError( <label> Test </label>,true ))
  }

  return <>
    <button onClick={clickInfo}> Test Info </button>
    <button onClick={clickSuccess}> Test Success </button>
    <button onClick={clickWarning}> Test Warning </button>
    <button onClick={clickError}> Test Error </button>
  </>
}