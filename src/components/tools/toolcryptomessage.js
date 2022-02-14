/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { useGun } from '../gun/gunprovider.js';

export default function ToolCryptoMessage({isopen,closeModal}){

  const {gun} = useGun();

  const [mode,setMode] = useState('encrypt');

  //const [textBase64,setBase64] = useState('');
  //const [work1,setWork1] = useState('');
  //const [work2,setWork2] = useState('');
  //const [isPair,setIsPair] = useState(false);
  //const [enc,setEnc] = useState('');
  //const [dec,setDec] = useState('');
  //const [sign,setSign] = useState('');
  //const [verify ,setVerify] = useState('');

  const [pair1, setPair1] = useState(null); //object
  const [textJson1, setTextJson1] = useState('');
  const [pair2, setPair2] = useState(null); //object
  const [textJson2, setTextJson2] = useState('');


  const [message, setMessage] = useState('');

  const [isDisplay,setIsDisplay] = useState(true);

  useEffect(()=>{
    if(typeof isopen != 'undefined'){
      if(isopen){
        setIsDisplay(true);
      }else{
        setIsDisplay(false);
      }
    }
  },[isopen])

  function typeMessage(event){
    setMessage(event.target.value);
  }

  function typeTextJson1(event){
    setTextJson1(event.target.value);
  }

  function typeTextJson2(event){
    setTextJson2(event.target.value);
  }

  function clickClose(){
    if(typeof closeModal == 'function'){
      closeModal();
    }
  }

  function changeMode(event){
    console.log(event.target.value);
    setMode(event.target.value);
  }

  if(isDisplay==false){
    return <></>
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
  }

  function viewMode(){
    if(mode=="encrypt"){
      return (<div>
        <label> Type: </label>
        <button> TextArea </button><br />
        <button onClick={clickGenPair1}> Gen Pair 1</button><br />
        <textarea value={textJson1} onChange={typeTextJson1}></textarea><br />

        <button onClick={clickGenPair2}> Gen Pair 2</button><br />
        <textarea value={textJson2} onChange={typeTextJson2}></textarea><br />
        <label> Worker: </label> <br />
        <label> Secret: </label> <br />
        <br />
        <label> Key: </label> <br />
        <textarea value={message} onChange={typeMessage}></textarea><br />
        <label> Message: </label> <br />
        <textarea value={message} onChange={typeMessage}></textarea><br />
      </div>)
    }
    if(mode=="decrypt"){
      return (<div>
        <label> Type: </label>
      </div>)
    }
  }

  return (<div style={{
    position:'absolute'
    , width:'200px'
    , height:'500px'
    , right:'0px'
    , top:'0px'
  }}>
    <button onClick={clickClose}>Close</button><label>Type</label>
    <select value={mode} onChange={changeMode}>
      <option value="encrypt"> Encrypt </option>
      <option value="decrypt"> Decrypt  </option>
    </select>
    {viewMode()}
  </div>)
}