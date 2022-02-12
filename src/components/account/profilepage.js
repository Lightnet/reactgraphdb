/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useState, useEffect, useRef } from "react";
import { useGun } from "../gun/gunprovider.js";

import { useNotifty } from "../notify/notifyprovider.js";
import { nSuccess, nWarning } from "../notify/notifytype.js";
import SearchPublicKey from "./searchpublickey.js";

export default function ProfilePage(){

  const {gun, gunUser}=useGun();
  const {setNotify} = useNotifty();

  const refPub = useRef(null);

  const [pub,setPub] = useState('');

  const [alias,setAlias] = useState('');
  const [information,setInformation] = useState('');
  const [skills,setSkills] = useState('');
  const [born,setBorn] = useState('');
  const [location,setLocation] = useState('');

  useEffect( async() => {
    if(gun){
      let user = gun.user().is.alias;
      //setAlias(user);
      let pkey = gun.user().is.pub;
      if(pkey){
        setPub(pkey);
      }
      
      user = gun.user();
      let alias = await user.get('alias').then();
      if(alias){
        setAlias(alias);
      }
      
      let info = await user.get('profile').get('information').then();
      if(info){
        setInformation(info);
      }

      info = await user.get('profile').get('skills').then();
      if(info){
        setSkills(info);
      }

      info = await user.get('profile').get('born').then();
      if(info){
        setBorn(info);
      }

      info = await user.get('profile').get('location').then();
      if(info){
        setLocation(info);
      }

    }
    return () => {      
    }
  }, [])

  function changeAlias(event){
    setAlias(event.target.value)
  }

  function updateInfo(event){
    setInformation(event.target.value);
    let user = gun.user();
    user.get('profile').get('information').put(event.target.value)
  }

  function updateSkills(event){
    setSkills(event.target.value);
    let user = gun.user();
    user.get('profile').get('skills').put(event.target.value)
  }

  function updateBorn(event){
    setBorn(event.target.value);
    let user = gun.user();
    user.get('profile').get('born').put(event.target.value)
  }

  function updateLocation(event){
    setLocation(event.target.value);
    let user = gun.user();
    user.get('profile').get('location').put(event.target.value)
  }

  function clickRename(){
    if(gun){
      let user = gun.user();
      console.log(user);
      user.get('alias').put(alias,ack=>{
        console.log(ack);
      });
    }
  }
  //https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
  function copyPubKey(e){
    if(refPub){
      console.log(refPub)
      //refPub.focus();
      refPub.current.focus();
      refPub.current.select();
      document.execCommand('copy');
    }
  }

  return <>
    <label>Profile</label> <br />
    <label>[Public Key:]</label> <input ref={refPub} value={pub} readOnly /> <button onClick={copyPubKey}>Copy</button>  <br />    
    <label>Alias:</label> <input value={alias} onChange={changeAlias}/>  <button onClick={clickRename}> Rename </button><br />
    <label>Information:</label> <input value={information} onChange={updateInfo}/> <br />
    <label>Skills:</label> <input value={skills} onChange={updateSkills}/> <br />

    <label>Born:</label> <input value={born} onChange={updateBorn}/> <br />
    <label>Location:</label> <input value={location} onChange={updateLocation}/> <br />
    <br />
    <SearchPublicKey></SearchPublicKey>
  </>
}
/*

<
*/