# react graph db


# Information:
  To develop stand alone client by using the react.js, babel, webpack, express, gun.js and other packages to develop web application access local. For test build for game stand alone, testing logic and other things.


# Project:
  The project is in strict mode that require ./index.js and not ./index as it need ext file checks.

  Package.json is set to module by "type":"module" for import to work for babel.js.

# dev:
  To build simple webpack and server to deal with the gun websocket.


App.js entry point
```js
import React from 'react';
import { GunProvider } from './components/gun/gunprovider.js';
import { BrowserRouter } from "react-router-dom";
import IndexPage from './components/indexpage.js';

export default function MyApp(){
  return <BrowserRouter> 
    <GunProvider>
      <IndexPage />
    </GunProvider>
  </BrowserRouter>
}
```
  This top level root for app to use context variables. It need to pass to child to access top layer or parent node.
```js
<BrowserRouter> // url
  <GunProvider> // gun.js
    <IndexPage /> // page, route
  </GunProvider>
</BrowserRouter>
```

gunprovider.js for gun.js setup for global access
```js
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
      //gun = Gun('http://localhost:3000/gun');
      //let gunp = Gun();
      let gunp = Gun({
        peers:['http://localhost:3000/gun']
      });
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
```

blank.js To access gun instance.
```js
import { useGun } from './gun/gunprovider.js';

export default function BlankPage(){
  const {gun, gunUser} = useGun(); // gun.js for react format

  //mount event once
  useEffect(()=>{
    if(gun){

    }
    return ()=>{ //unmount event

    }
  },[]);

  // listen to gun var changes, not recommended 
  useEffect(()=>{
    if(gun){
    }
    return ()=>{ //unmount event
    }
  },[gun]);

  function clickTestGun(){
    if(gun){
      console.log(gun);
    }
  }

  return <>
    <button onClick={clickTestGun}> Test</button>
  </>
}
```










  
