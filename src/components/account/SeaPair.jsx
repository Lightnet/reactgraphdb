/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/2887101/apply-style-to-range-of-text-with-javascript-in-uiwebview
// https://stackoverflow.com/questions/60217202/copy-text-to-clipboard-now-that-execcommandcopy-is-obsolete
// https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
import React, { useEffect, useRef, useState } from "react";
import {useGun} from "../gun/GunProvider.jsx";

export default function SeaPair({_isVisible}){

  const {gun, gunUser} = useGun();

  const [seaPair, setSeaOair] = useState({});
  const [textPair, setTextPair] = useState('');
  const [isTextArea, setIsTextArea] = useState('');
  const [isVisible,setIsVisible] = useState(false);

  const [pub, setPub] = useState('');
  const [ePub, setEPub] = useState('');
  const [priv, setPriv] = useState('');
  const [ePriv, setEPriv] = useState('');
  //const refPub = useRef(null);

  useEffect(()=>{
    console.log(_isVisible)
    if(_isVisible!=null){
      setIsVisible(true)
    }
  },[_isVisible])

  useEffect(()=>{
    if(isVisible){
      let user= gun.user();

      setPub(user._.sea.pub)
      setEPub(user._.sea.epub)
      setPriv(user._.sea.priv)
      setEPriv(user._.sea.epriv)

      //console.log(user);
      //setPub(user.is.pub)
      //setEPub(user.is.epub)
    }else{
      //setPub(user.is.pub)
      //setEPub(user.is.epub)
    }
  },[isVisible])

  useEffect(()=>{
    if(isTextArea){
      let user= gun.user();
      console.log(user);
      setSeaOair(user._.sea)
      setTextPair(JSON.stringify(user._.sea))
    }else{
      setSeaOair("")
      setTextPair({})
    }
  },[isTextArea])

  function copyPubKey(e){
    //console.log(refPub)
    //refPub.focus();
    if (!navigator.clipboard){
      console.log('clipboard NULL');
      document.execCommand('copy');//out date function
    } else{
      navigator.clipboard.writeText(pub).then(
        function(){
          //alert("yeah!"); // success 
          console.log('success copy');
        })
      .catch(
        function() {
          console.log('error copy');
          //alert("err"); // error
      });
    }
  }

  function copyEPubKey(e){
    //console.log(refPub)
    //refPub.focus();
    if (!navigator.clipboard){
      console.log('clipboard NULL');
      document.execCommand('copy');//out date function
    } else{
      navigator.clipboard.writeText(ePub).then(
        function(){
          //alert("yeah!"); // success 
          console.log('success copy');
        })
      .catch(
        function() {
          console.log('error copy');
          //alert("err"); // error
      });
    }
  }

  function copyPrivKey(e){
    //console.log(refPub)
    //refPub.focus();
    if (!navigator.clipboard){
      console.log('clipboard NULL');
      document.execCommand('copy');//out date function
    } else{
      navigator.clipboard.writeText(priv).then(
        function(){
          //alert("yeah!"); // success 
          console.log('success copy');
        })
      .catch(
        function() {
          console.log('error copy');
          //alert("err"); // error
      });
    }
  }

  function copyEPrivKey(e){
    //console.log(refPub)
    //refPub.focus();
    if (!navigator.clipboard){
      console.log('clipboard NULL');
      document.execCommand('copy');//out date function
    } else{
      navigator.clipboard.writeText(ePriv).then(
        function(){
          //alert("yeah!"); // success 
          console.log('success copy');
        })
      .catch(
        function() {
          console.log('error copy');
          //alert("err"); // error
      });
    }
  }

  function copyPairs(e){
    //console.log(refPub)
    //refPub.focus();
    if (!navigator.clipboard){
      console.log('clipboard NULL');
      document.execCommand('copy');//out date function
    } else{
      navigator.clipboard.writeText(textPair).then(
        function(){
          //alert("yeah!"); // success 
          console.log('success copy');
        })
      .catch(
        function() {
          console.log('error copy');
          //alert("err"); // error
      });
    }
  }

  function clickIsVisible(){
    setIsVisible(state=>!state)
  }
  
  function clickTextArea(){
    setIsTextArea(state=>!state)
  }

  function clickDownload(){
    //const url = window.URL.createObjectURL(textPair);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(textPair));
    //a.href = url;
    // the filename you want
    //a.download = 'seapair.txt';
    let filename = 'seapair.txt';
    a.setAttribute('download', filename);
    //a.id = 'seapair';
    document.body.appendChild(a);
    a.click();
    //window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  
  return <>
    <button onClick={clickIsVisible}> Sea Pair </button> <button onClick={clickTextArea}> TextArea {String(isTextArea)} </button><br />
    {isTextArea? (
      <>
      <textarea value={textPair} readOnly /> <button onClick={copyPairs}> Copy </button><button onClick={clickDownload}> Download </button> <br />
      </>
    ):(
      <></>
    )}

    {isVisible? (
      <>
      <button onClick={copyPubKey}> Copy pub </button><input  value={pub} readOnly size="100" /> <br />
      <button onClick={copyEPubKey}> Copy epub </button><input  value={ePub} readOnly size="100" /> <br />
      <button onClick={copyPrivKey}> Copy priv </button><input  value={priv} readOnly size="50" /> <br />
      <button onClick={copyEPrivKey}> Copy epriv </button><input  value={ePriv} readOnly size="50" /> <br />
      </>
    ):(
      <></>
    )}
  </>
}