/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/2887101/apply-style-to-range-of-text-with-javascript-in-uiwebview
// https://stackoverflow.com/questions/60217202/copy-text-to-clipboard-now-that-execcommandcopy-is-obsolete
// //https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
import React, { useEffect, useRef, useState } from "react";
import {useGun} from "../gun/GunProvider.jsx";

export default function PublicKey({_isVisible}){

  const {gun, gunUser} = useGun();

  const [pub, setPub] = useState('');
  const [isVisible,setIsVisible] = useState(false);
  const refPub = useRef(null);

  useEffect(()=>{
    //console.log(_isVisible)
    if(_isVisible!=null){
      setIsVisible(true)
    }
  },[_isVisible])

  function clickIsVisible(){
    let b = !isVisible;
    setIsVisible(b)
  }

  useEffect(()=>{
    //console.log(isVisible)
    if(isVisible){
      if(gunUser){
        //console.log("gunUser",gunUser)
        setPub(gunUser.pub);
      }
      //setPub();
    }else{
      setPub('')
    }
  },[isVisible])

  function copyPubKey(e){
    if(refPub){
      //console.log(refPub)
      //refPub.focus();
      //refPub.current.focus();
      //refPub.current.select();
      if (!navigator.clipboard){
        console.log('clipboard NULL');
        //document.execCommand('copy');//out date function
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
  }
  
  return <>
    <button onClick={clickIsVisible}> Public Key </button>
    {isVisible? (
      <>
      <input ref={refPub} value={pub} readOnly /> <button onClick={copyPubKey}> Copy </button>
      </>
    ):(
      <></>
    )}
  </>
}