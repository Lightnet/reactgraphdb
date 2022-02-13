/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { useGun } from '../gun/gunprovider.js';

export default function ToolSeaPanel({isopen,closeModal}){

  const {gun} = useGun();
  
  const [pair,setPair] = useState({});
  const [textPair,setTextPair] = useState('');
  const [isDisplayKeys,setIsDisplayKeys] = useState(false);

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
  //return  <></>

  async function clickGenPair(){
    let _pair = await gun.SEA.pair();
    setPair(_pair)
    setTextPair(JSON.stringify(_pair));
  }

  function togglePairKeys(){
    setIsDisplayKeys(state=>!state);
  }

  function clickCopyText(_text){
    if (!navigator.clipboard){
      console.log('clipboard NULL');
      //document.execCommand('copy');//out date function
    } else{
      navigator.clipboard.writeText(_text).then(
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

  function showPairKeys(){
    //pair
    return Object.keys(pair).reduce(function(obj, str) { 
      //console.log(str)
      //console.log(pair[str])
      let add = <tr key={str}><td> <label> {str} </label> <input value={pair[str]} readOnly /> <button onClick={()=>clickCopyText(pair[str])}> Copy </button></td></tr>
      return [...obj,add]
    }, []);
  }

  if(isDisplay==false){
    return <></>
  }
  
  return (
  <div style={{
    position:'absolute'
    , width:'200px'
    , height:'500px'
    , right:'0px'
    , top:'0px'
    }}>
    <div>
      <button onClick={clickClose}>Close</button>
      <table>
        <tbody>
          <tr>
            <td>
              <label>SEA Pair </label><button onClick={clickGenPair}> Gen </button><button onClick={togglePairKeys}> Keys {String(isDisplayKeys)} </button>
            </td>
          </tr>
          {isDisplayKeys?(
            <>
              {showPairKeys()}
            </>
          ):(
            <>
              <tr>
                <td>
                  <textarea value={textPair} readOnly rows="10" cols="22"/>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  </div>) 
}