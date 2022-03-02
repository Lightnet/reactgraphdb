/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { isEmpty } from '../../lib/helper.mjs';
import { useGun } from '../gun/GunProvider.jsx';

export default function EncryptMessage(){

  const {gun} = useGun();

  const [pair1, setPair1] = useState(null); //object
  const [textJson1, setTextJson1] = useState('');
  const [pair2, setPair2] = useState(null); //object
  const [textJson2, setTextJson2] = useState('');

  const [message, setMessage] = useState('');
  const [signMessage, setSignMessage] = useState('');
  const [encryptMessage, setEncryptMessage] = useState('');

  const [pub, setpublic] = useState('');

  function typeSignMessage(event){
    setSignMessage(event.target.value);
  }

  function typeEncryptMessage(event){
    setEncryptMessage(event.target.value);
  }

  function typePulbic(event){
    setpublic(event.target.value);
  }

  async function typeMessage(event){
    setMessage(event.target.value);

    if(event.target.value){
      if(isEmpty(textJson1) || isEmpty(textJson2)){
        console.log("EMPTY!");
        return;
      }
      var enc = await SEA.encrypt(event.target.value, pair1);
      var data = await SEA.sign(enc, pair1);

      setEncryptMessage(JSON.stringify(enc));
      setSignMessage(JSON.stringify(data));
    }
  }

  function typeTextJson1(event){
    setTextJson1(event.target.value);
  }

  function typeTextJson2(event){
    setTextJson2(event.target.value);
  }

  async function clickGenPair1(){
    let _pair = await gun.SEA.pair();
    setPair1(_pair);
    setTextJson1(JSON.stringify(_pair));
  }

  async function clickGenPair2(){
    let _pair = await gun.SEA.pair();
    setPair2(_pair);
    setTextJson2(JSON.stringify(_pair));
    setpublic(_pair.pub);
  }

  function viewMode(){
    return (<div>
      <label> Type: </label>
      <button> TextArea </button><br />
      <label> Pair 1: </label><button onClick={clickGenPair1}> Gen Pair 1</button><br />
      <textarea value={textJson1} onChange={typeTextJson1}></textarea><br />

      <label> Pair 2: </label><button onClick={clickGenPair2}> Gen Pair 2</button><br />
      <textarea value={textJson2} onChange={typeTextJson2}></textarea><br />
      <label> Public: </label> <input type={"text"} value={pub} onChange={typePulbic}/><br />
      <br />
      <label> Message: </label> <br />
      <textarea value={message} onChange={typeMessage}></textarea><br />

      <label> Sign: </label> <br />
      <textarea value={signMessage} onChange={typeSignMessage} rows={10}></textarea><br />

      <label> Encrypt: </label> <br />
      <textarea value={encryptMessage} onChange={typeEncryptMessage} rows={10}></textarea><br />
    </div>)
  }

  return (<div>
    {viewMode()}
  </div>)
}