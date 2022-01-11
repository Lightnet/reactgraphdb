/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useState, useEffect } from "react";
import { useGun } from "../gun/gunprovider.js";

export default function ProfilePage(){

  const {
    gun
  }=useGun();

  const [alias,setAlias] = useState('');
  const [pub,setPub] = useState('');

  useEffect( async() => {
    if(gun){
      let user = gun.user().is.alias;
      setAlias(user);
      setPub(gun.user().is.pub);
    }
    return () => {      
    }
  }, [])

  function changeAlias(event){
    setAlias(event.target.value)
  }

  return <>
    <label>Profile</label> <br />
    <label>[Public Key:]</label> <label>{pub} </label>  <br />
    <label>Alias:</label> <input value={alias} onChange={changeAlias}/>  <button> Rename </button><br />
    
  </>
}