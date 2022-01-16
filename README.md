# react graph db


# Information:
  To build stand alone client by using the react.js, babel, webpack, express, gun.js and other packages to develop web application. For test build for game stand alone, testing logic and other things.

  By using gun.js graph database format. To query data information. By using the node graph to link to each other nodes.

  It does suppoert peer to peer graph when snyc when link to url address by web socket format.

# guide:
```
npm run devp
```


# Project:
  The project is in strict mode that require ./index.js and not ./index as it need ext file checks.

  Package.json is set to module by "type":"module" for import to work for babel.js.

  Note that require() does not work when used type module.

# React:
  By using the react to handle html render elements and events.


# dev:
  To build simple webpack and server to deal with the gun websocket.

  Added web browser reload for files changes.

## Links:
 - https://reactrouter.com
 - https://reactjs.org/
   - https://reactjs.org/docs/hooks-reference.html
   - https://reactjs.org/docs/hooks-reference.html#usecontext  Ref. GunProvider



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
