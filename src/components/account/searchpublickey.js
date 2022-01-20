/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useLayoutEffect, useState } from "react";
import { useGun } from "../gun/gunprovider.js";

import { useNotifty } from "../notify/notifyprovider.js";
import { nSuccess, nWarning } from "../notify/notifytype.js";
import {isEmpty} from '../../lib/helper.js';

export default function SearchPublicKey(){

  const {gun}=useGun();
  const {setNotify} = useNotifty();

  const [pub, setPub] = useState('');
  const [status, setStatus] = useState('');

  const [alias,setAlias] = useState('');
  const [information,setInformation] = useState('');
  const [skills,setSkills] = useState('');
  const [born,setBorn] = useState('');
  const [location,setLocation] = useState('');

  useEffect(()=>{
    publicKeyID();
  },[pub])

  async function searchPubKey(event){
    let pubkey = event.target.value;
    setPub(pubkey);
  }

  async function pressPubKey(event){
    //console.log('key...',event.code);
    if(event.code  == 'Enter'){
      //console.log('enter...');
      let pubkey = event.target.value;
      setPub(pubkey);
    }
  }

  async function publicKeyID(){

    if(isEmpty(pub)){
      console.log('empty')
      return;
    }
    if(gun){
      let user = gun.user(pub);
      console.log(user);
      let pkey = await user.get('pub').then();
      console.log(pkey);
      let val = await user.get('alias').then();
      if(val){
        setAlias(val);
      }

      val = await user.get('profile').get('information').then();
      if(val){
        setInformation(val);
      }

      val = await user.get('profile').get('skills').then();
      if(val){
        setSkills(val);
      }

      val = await user.get('profile').get('born').then();
      if(val){
        setBorn(val);
      }

      val = await user.get('profile').get('location').then();
      if(val){
        setLocation(val);
      }
    }
  }



  return <>
  <label>Search:</label> <br />
  <label>[Public Key:]</label> <input value={pub} onChange={searchPubKey} onKeyUp={pressPubKey}/>  <br />
  <label>[status]:</label> <label>{status} </label>  <br />

  <label>Alias:</label> <input value={alias} readOnly /> <br />
  <label>Information:</label> <input value={information} readOnly/> <br />
  <label>Skills:</label> <input value={skills} readOnly /> <br />

  <label>Born:</label> <input value={born} readOnly/> <br />
  <label>Location:</label> <input value={location} readOnly /> <br />
  
</>
}