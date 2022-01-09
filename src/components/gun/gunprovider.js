/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ createContext, useContext, useEffect, useMemo, useState } from "react";
import Gun from 'gun/gun.js';
import SEA from 'gun/sea.js';

export const gunContext = createContext();

export function useGun(){
  const context = useContext(gunContext);
  if (!context) {
    throw new Error(`useGun must be used within a UserContext`)
  }
  return context;
}

export function GunProvider(props){
  const [gun, setGun] = useState(null);
  const [gunUser, setGunUser] = useState(null);

  useEffect(()=>{
    //fetch('/api/gun').finally(() => {
      //await fetch('/api/gun');
      //gun = Gun('http://localhost:3000/gun');
      
      //let gunp = Gun();
      let gunp = Gun({
        peers:['http://localhost:3000/gun']
      });
      //gun = Gun();
      gunp.on('hi', peer => {//peer connect
        //console.log('connect peer to',peer);
        console.log('peer connect!');
      });
      gunp.on('bye', (peer)=>{// peer disconnect
        //console.log('disconnected from', peer);
        console.log('disconnected from peer!');
      });
      
      gunp.SEA = Gun.SEA;

      setGun(gunp);
      //setGun(gun);
    //})
  },[])

  const value = useMemo(()=>({
    gun, setGun,
    gunUser, setGunUser
  }),[
    gun,
    gunUser
  ])

  return <gunContext.Provider value={value} {...props} />
}