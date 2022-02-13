/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/3888902/detect-browser-or-tab-closing

import React,{ createContext, useContext, useEffect, useMemo, useState } from "react";
import Gun from 'gun/gun.js';
import SEA from 'gun/sea.js';

import 'gun/lib/radix.js';
import 'gun/lib/radisk.js';
import 'gun/lib/store.js';
import 'gun/lib/rindexed.js';

//import 'gun/lib/path.js';
//import 'gun/lib/list.js';
import 'gun/lib/promise.js';

export const gunContext = createContext();

export function useGun(){
  const context = useContext(gunContext);
  if (!context) {
    throw new Error(`useGun must be used within a gunContext`)
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
      console.log(location)
      let host = location.origin;
      if(location.host=='localhost'){
        host='http://localhost/gun';
      }else{
        host=host+"/gun";
      }
      const gunp = Gun({
        peers:[host]
        , localStorage: false
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
      //testing blient online
      gunp.get('status').get('online').put('on')

      setGun(gunp);

      //tab close event
      window.addEventListener("beforeunload", function (e) {
        var confirmationMessage = "\o/";
        gunp.get('status').get('online').put('off')
        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage;                            //Webkit, Safari, Chrome
      });

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