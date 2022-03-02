/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { isEmpty } from '../../lib/helper.mjs';
import { useGun } from '../gun/GunProvider.jsx';

export default function WorkDecryptMessage(){

  const {gun} = useGun();

  const [textJson1, setTextJson1] = useState('hello');
  const [textJson2, setTextJson2] = useState('world');
  const [message, setMessage] = useState('');
  const [decryptMessage, setDecryptMessage] = useState('');

  async function typeDecryptMessage(event){
    setDecryptMessage(event.target.value);
    if(event.target.value){
      if(isEmpty(textJson1) || isEmpty(textJson2)){
        console.log("EMPTY!");
        return;
      }
      let sec = await gun.SEA.work(textJson1, textJson2);
      //console.log(JSON.parse(event.target.value))
      let enc0 = await gun.SEA.decrypt(JSON.parse(event.target.value),sec)
      //console.log(enc0)
      setMessage(enc0);
    }
  }

  async function typeMessage(event){
    setMessage(event.target.value);
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
      <textarea value={decryptMessage} onChange={typeDecryptMessage} rows="10"></textarea><br />
    </div>)
  }

  return (<div>
    {viewMode()}
  </div>)
}