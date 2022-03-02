/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { isEmpty } from '../../lib/helper.mjs';
import { useGun } from '../gun/GunProvider.jsx';

export default function EncryptMessageShareData(){

  const {gun} = useGun();

  const [pair1, setPair1] = useState(null); //object
  const [textJson1, setTextJson1] = useState('');
  const [pair2, setPair2] = useState(null); //object
  const [textJson2, setTextJson2] = useState('');
  const [shareData, setShareData] = useState('');
  const [epub, setEPub] = useState('');
  const [encryptMessage, setEncryptMessage] = useState('');

  async function typeShareData(event){
    setShareData(event.target.value);
    if(event.target.value){
      if(isEmpty(textJson1) || isEmpty(textJson2)){
        console.log("EMPTY!");
        return;
      }

      var enc = await SEA.encrypt(event.target.value, await SEA.secret(pair2.epub, pair1));
      setEncryptMessage(JSON.stringify(enc))
    }
  }
  function typeEncryptMessage(event){
    setEncryptMessage(event.target.value);
  }
  function typeEPub(event){
    setEPub(event.target.value);
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
    setEPub(_pair.epub);
  }

  function viewMode(){
    return (<div>
      <label> Type: </label>
      <button> TextArea </button><br />
      <label> Pair 1: </label><button onClick={clickGenPair1}> Gen Pair 1</button><br />
      <textarea value={textJson1} onChange={typeTextJson1}></textarea><br />

      <label> Pair 2: </label><button onClick={clickGenPair2}> Gen Pair 2</button><br />
      <textarea value={textJson2} onChange={typeTextJson2}></textarea><br />
      <label> EPublic: </label> <input type={"text"} value={epub} onChange={typeEPub}/><br />
      <br />
      <label> Share Data: </label> <br />
      <textarea value={shareData} onChange={typeShareData}></textarea><br />
      <label> Encrypt: </label> <br />
      <textarea value={encryptMessage} onChange={typeEncryptMessage} rows={10}></textarea><br />
    </div>)
  }

  return (<div>
    {viewMode()}
  </div>)
}