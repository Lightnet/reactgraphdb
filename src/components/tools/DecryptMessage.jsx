/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { isEmpty } from '../../lib/helper.mjs';
import { useGun } from '../gun/GunProvider.jsx';

export default function DecryptMessage(){

  const {gun} = useGun();

  const [pair1, setPair1] = useState(null); //object
  const [textJson1, setTextJson1] = useState('');
  //const [pair2, setPair2] = useState(null); //object
  //const [textJson2, setTextJson2] = useState('');

  const [message, setMessage] = useState('');
  const [verifyMessage, setVerifyMessage] = useState('');
  const [decryptMessage, setDecryptMessage] = useState('');

  const [pub, setPublic] = useState('');

  async function typeVerifyMessage(event){
    setVerifyMessage(event.target.value);
    var msg = await gun.SEA.verify(JSON.parse(event.target.value), pair1.pub);
    console.log(msg)
    setDecryptMessage(JSON.stringify(msg))
    var dec = await gun.SEA.decrypt(msg, pair1);
    console.log(dec)
    setMessage(dec);
  }

  async function typeDecryptMessage(event){
    setDecryptMessage(event.target.value);
  }

  function typePulbic(event){
    setPublic(event.target.value);
  }

  async function typeMessage(event){
    setMessage(event.target.value);
  }

  function typeTextJson1(event){
    setTextJson1(event.target.value);
    let pair = JSON.parse(event.target.value);
    setPair1(pair)
    setPublic(pair.pub);
  }

  //function typeTextJson2(event){
    //setTextJson2(event.target.value);
    //let pair = JSON.parse(event.target.value);
    //setPair2(pair)
    //setPublic(pair.pub);
  //}

  async function clickGenPair1(){
    let _pair = await gun.SEA.pair();
    setPair1(_pair);
    setTextJson1(JSON.stringify(_pair));
  }

  //async function clickGenPair2(){
    //let _pair = await gun.SEA.pair();
    //setPair2(_pair);
    //setTextJson2(JSON.stringify(_pair));
    //setPublic(_pair.pub);
  //}

  function viewMode(){
    return (<div>
      <label> Type: </label>
      <button> TextArea </button><br />
      <label> Pair 1: </label><button onClick={clickGenPair1}> Gen Pair 1</button><br />
      <textarea value={textJson1} onChange={typeTextJson1}></textarea><br />

      <label> Public: </label> <input type={"text"} value={pub} onChange={typePulbic}/><br />
      <br />
      <label> Message: </label> <br />
      <textarea value={message} onChange={typeMessage}></textarea><br />

      <label> Verify: </label> <br />
      <textarea value={verifyMessage} onChange={typeVerifyMessage} rows={10}></textarea><br />

      <label> Decrypt: </label> <br />
      <textarea value={decryptMessage} onChange={typeDecryptMessage} rows={10}></textarea><br />
    </div>)
  }

  return (<div>
    {viewMode()}
  </div>)
}
/*
<label> Pair 2: </label><button onClick={clickGenPair2}> Gen Pair 2</button><br />
      <textarea value={textJson2} onChange={typeTextJson2}></textarea><br />
*/