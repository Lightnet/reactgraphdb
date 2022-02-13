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

  function viewMode(){
    if(mode=="encrypt"){
      return (<div>
        <label> Type: </label>
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