/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import { useGun } from "../gun/gunprovider.js";

export default function GetHintPage(){

  const {gun}=useGun();

  const [alias, setAlias] = useState('');
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [hint, setHint] = useState('');

  /*
  useEffect(async()=>{
    if(gun){
      console.log("MOUNT....")
      let user = gun.user();
      let sec = await gun.SEA.secret(user.is.epub, user._.sea);//mix key to decrypt

      let q1 = await user.get('forgot').get('q1').then();
      q1 = await gun.SEA.decrypt(q1, sec);//decrypt question1

      let q2 = await user.get('forgot').get('q2').then();
      q2 = await gun.SEA.decrypt(q2, sec);//decrypt question1

      setQuestion1(q1);
      setQuestion2(q2);

      sec = await gun.SEA.work(q1,q2); //encrypt key

      let ghint = await user.get('hint').then(); //get encrypt hint 
      ghint = await gun.SEA.decrypt(ghint, sec); //decrypt hint
      setHint(ghint);
    }
  },[])
  */

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
        return;
      }
      let publickey;
      for(let obj in user){//object 
        //console.log(obj);
        publickey = obj;//property name for public key
      }

      console.log(publickey)
      publickey = gun.SEA.opt.pub(publickey);//check and convert to key or null?
      console.log(publickey)
      let to = gun.user(publickey);//get user alias graph

      let hint = await to.get('forgot').get('hint').then();
      console.log(hint);
      console.log(gun.SEA);

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