/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { isEmpty } from '../../lib/helper.mjs';
import { useGun } from '../gun/GunProvider.jsx';

export default function WorkEncryptMessage(){

  const {gun} = useGun();

  const [textJson1, setTextJson1] = useState('hello');
  const [textJson2, setTextJson2] = useState('world');
  const [message, setMessage] = useState('');
  const [encryptMessage, setEncryptMessage] = useState('');

  function typeEncryptMessage(event){
    setEncryptMessage(event.target.value);
  }

  async function typeMessage(event){
    setMessage(event.target.value);
    if(event.target.value){
      if(isEmpty(textJson1) || isEmpty(textJson2)){
        console.log("EMPTY!");
        return;
      }
      let sec = await gun.SEA.work(textJson1, textJson2);
      let enc0 = await gun.SEA.encrypt(event.target.value,sec)
      setEncryptMessage(JSON.stringify(enc0));
    }
  }

  function typeTextJson1(event){
    setTextJson1(event.target.value);
  }

  function typeTextJson2(event){
    setTextJson2(event.target.value);
  }

  function viewMode(){

    return (<div>
      <label> Worker Param 1: </label><br />
      <textarea value={textJson1} onChange={typeTextJson1}></textarea><br />
      <label> Worker Param 2: </label><br />
      <textarea value={textJson2} onChange={typeTextJson2}></textarea><br />
      <br />
      <label> Message: </label> <br />
      <textarea value={message} onChange={typeMessage}></textarea><br />
      <label> Encrypt: </label> <br />
      <textarea value={encryptMessage} onChange={typeEncryptMessage} rows="10"></textarea><br />
    </div>)
  }

  return (<div>
    {viewMode()}
  </div>)
}