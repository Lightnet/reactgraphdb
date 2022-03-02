/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from "react";
import { useGun } from "../gun/GunProvider.jsx";

import { useNotifty, Color } from "../notify/NotifyProvider.jsx";

export default function PassphrasePage(){

  const {gun}=useGun();
  const {dispatchNotify} = useNotifty();

  const [passphrase, setPassphrase] = useState('12345678');
  const [newPassphrase, setNewPassphrase] = useState('12345678');

  function typingPassphrase(event){
    setPassphrase(event.target.value);
  }

  function typingNewPassphrase(event){
    setNewPassphrase(event.target.value);
  }

  async function clickChangePassphrase(){
    let user = gun.user();

    user.auth(user.is.alias, passphrase, (ack) => {//user auth call
      //console.log(ack);
      let status = ack.err || "Saved!";//check if there error else saved message.
      dispatchNotify({
        type: 'add'
        , color: Color.info
        , children: status
      })
      //console.log(status);
      //modalmessage(status);

    }, {change: newPassphrase});//set config to change password

  }

  return <>
    <label>PassphrasePage</label> <br />

    <label>Passphrase:<input value={passphrase} onChange={typingPassphrase}></input></label> <br />
    <label>New Passphrase:<input value={newPassphrase} onChange={typingNewPassphrase}></input></label> <br />
    <button onClick={clickChangePassphrase}> Change </button>
  </>
}