/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import { useGun } from "../gun/gunprovider.js";
import { useNotifty } from "../notify/notifyprovider.js";
import { nSuccess, nWarning } from "../notify/notifytype.js";

export default function GetHintPage(){

  const {setNotify} = useNotifty();
  const {gun}=useGun();

  const [alias, setAlias] = useState('');
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [hint, setHint] = useState('');

  function typeAlias(event){
    setAlias(event.target.value);
  }
  function typeQuestion1(event){
    setQuestion1(event.target.value);
  }
  function typeQuestion2(event){
    setQuestion2(event.target.value);
  }
  function typeHint(event){
    setHint(event.target.value);
  }

  async function clickGetHint(){
    if(gun){
      let user = await gun.get('~@'+alias).then();
      if(!user){
        //console.log("publickey");
        setNotify(nWarning("Does not Exist!",true ))
        return;
      }
      let publickey;
      for(let obj in user){//object 
        //console.log(obj);
        publickey = obj;//property name for public key
      }
      if(!publickey){
        //console.log(publickey)
        return;
      }

      //console.log(publickey)
      publickey = gun.SEA.opt.pub(publickey);//check and convert to key or null?
      //console.log(publickey)
      let to = gun.user(publickey);//get user alias graph
      let dec = await Gun.SEA.work(question1,question2);//get fquestion1 and fquestion2 string to mix key
      let ehint = await to.get('forgot').get('hint').then();
      //console.log(hint);
      ehint = await Gun.SEA.decrypt(ehint,dec);//get hint and key decrypt message
      if(ehint !=null){//check if hint is string or null
        //$('#fhint').val(hint);
        setHint(ehint);
        setNotify(nSuccess("Pass Decrypt!",true ))
      }else{
        //modalmessage("Fail Decrypt!");
        setNotify(nWarning("Fail Decrypt!",true ))
      }
      //console.log(gun.SEA);
    }
  }

  return <>
    <label>Get Hint Page</label> <br />
    <label>Alias:</label> <input value={alias} onChange={typeAlias}/> <br />
    <label>Question 1:</label> <input value={question1} onChange={typeQuestion1}/> <br />
    <label>Question 2:</label> <input value={question2} onChange={typeQuestion2}/> <br />
    <label>Hint:</label> <input value={hint} onChange={typeHint} /> <br />

    <button onClick={clickGetHint}> Get </button>
  </>
}