/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { isEmpty } from '../../lib/helper.mjs';
import { useGun } from '../gun/GunProvider.jsx';
import DecryptMessage from './DecryptMessage.jsx';
import DecryptMessageShareData from './DecryptMessageShareData.jsx';
import EncryptMessage from './EncryptMessage.jsx';
import EncryptMessageShareData from './EncryptMessageShareData.jsx';
import WorkDecryptMessage from './WorkDecryptMessage.jsx';
import WorkEncryptMessage from './WorkEncryptMessage.jsx';

export default function CryptoMessageView({isopen,closeModal,view,posx}){

  const {gun} = useGun();
  const [mode,setMode] = useState('encryptshare');
  const [isDisplay,setIsDisplay] = useState(true);
  const [posX,setPosX] = useState(0);

  useEffect(()=>{
    if(typeof view == "string"){
      setMode(view);
    }
  },[view])

  useEffect(()=>{
    if(typeof isopen != 'undefined'){
      if(isopen){
        setIsDisplay(true);
      }else{
        setIsDisplay(false);
      }
    }
  },[isopen])

  useEffect(()=>{
    if(typeof posx != 'undefined'){
      setPosX(posx)
    }
  },[posx])

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
      return <EncryptMessage/>
    }
    if(mode=="encryptshare"){
      return <EncryptMessageShareData/>
    }
    if(mode=="encryptwork"){
      return <WorkEncryptMessage/>
    }
    if(mode=="decryptwork"){
      return <WorkDecryptMessage/>
    }
    if(mode=="decrypt"){
      return <DecryptMessage/>
    }
    if(mode=="decryptshare"){
      return <DecryptMessageShareData/>
    }
  }

  return (<div style={{
    position:'absolute'
    , width:'200px'
    , height:'500px'
    , right:posX+'px'
    , top:'0px'
  }}>
    <button onClick={clickClose}>Close</button><label>Type</label>
    <select value={mode} onChange={changeMode}>
      <option value="encrypt"> Encrypt </option>
      <option value="encryptshare"> Encrypt Share</option>
      <option value="encryptwork"> Encrypt Work</option>
      <option value="decrypt"> Decrypt  </option>
      <option value="decryptwork"> Decrypt Work</option>
      <option value="decryptshare"> Decrypt Share</option>
    </select>
    {viewMode()}
  </div>)
}