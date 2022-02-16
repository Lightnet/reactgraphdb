/*
  LICENSE: MIT
  Created by: Lightnet

  informaiton: 
    set hint

*/

import React, { useEffect, useState } from "react";
import { useGun } from "../gun/gunprovider.js";

import { useNotifty, Color } from "../notify/notifyprovider.js";

export default function HintPage(){

  const {dispatchNotify} = useNotifty();
  const {gun}=useGun();

  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [hint, setHint] = useState('');

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

      let ghint = await user.get('forgot').get('hint').then(); //get encrypt hint 
      ghint = await gun.SEA.decrypt(ghint, sec); //decrypt hint
      setHint(ghint);
    }
    
  },[])

  function typeQuestion1(event){
    setQuestion1(event.target.value);
  }
  function typeQuestion2(event){
    setQuestion2(event.target.value);
  }
  function typeHint(event){
    setHint(event.target.value);
  }

  async function clickApply(){
    let user = gun.user();
    let sec = await gun.SEA.secret(user.is.epub, user._.sea);//mix key to decrypt
    //console.log(Gun.SEA);

    //console.log(sec);
    let enc_q1 = await gun.SEA.encrypt(question1, sec); // encrypt q1
    user.get('forgot').get('q1').put(enc_q1); // set hash q1 to user data store
    let enc_q2 = await gun.SEA.encrypt(question2, sec); // encrypt q1
    user.get('forgot').get('q2').put(enc_q2); //set hash q2 to user data store
    sec = await gun.SEA.work(question1,question2); //encrypt key

    let enc = await Gun.SEA.encrypt(hint, sec);//encrypt hint

    user.get('forgot').get('hint').put(enc,ack=>{//set hash hint
      //console.log(ack);
      if(ack.err){
          //console.log("Error!");
          dispatchNotify({
            type: 'add'
            , color: Color.error
            , children: "Hint Error"
          })
          //modalmessage(ack.err);
          return;
      }
      if(ack.ok){
          //console.log('Hint Apply!');
          dispatchNotify({
            type: 'add'
            , color: Color.success
            , children: "Hint Apply"
          })
          //modalmessage('Hint Apply!');
      }
    });
  }

  return <>
    <label>HintPage</label> <br />
    <label>Question 1:</label> <input value={question1} onChange={typeQuestion1}/> <br />
    <label>Question 2:</label> <input value={question2} onChange={typeQuestion2}/> <br />
    <label>Hint:</label> <input value={hint} onChange={typeHint} /> <br />

    <button onClick={clickApply}> Apply </button>

  </>
}