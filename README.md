# react graph db

# Packages:
 * express (web server / cors)
 * gun (graph database)
 * react (browser client render ui and components)
 * nanoid (random string id)
 * dayjs (time stamp)
 * @babel/core (use import )
 * nodemon (auto detect file changes)
 * npm-run-all (deal with npm cmd run )
 * webpack 5.x (compile babel and react js to browser js to understand it)

# Information:
  To build stand alone client by using the react.js, babel, webpack, express, gun.js and other packages to develop web application. For test build for application, game stand alone, testing logic and other things.

  By using gun.js graph database format. To query data information.

  It does suppoert peer to peer graph when snyc when link to url address by web socket format.

  By using the gun.js and react.js to handle get and put data with SEA checks to prevent override in case of user edit graph without permission as well the user interface.

# Features:
  - Account used by SEA.js from gun package.
    - user login (added)
    - sea login (added)
    - qr login (not added)
    - hint get/set
    - change passphrase
    - Text file login base64?
    - user edit their data when sign in.
  - simple public chat (added)
  - group chat (grant, revoke public key id, create, delete?) (added)
  - gun graph (current access from local storage or peer to peer update by network sync)
  - message (added)( inbox type / wip)
  - private message (not added )
  - sea tools (fully custom format for export to import for chat message)
  - theme light and dark ( added)
  - notify (added)
  - modal (added / wip)
  - post (not added )

# Layout:
```
src
  -client ( browser ) 
  -components (react.js / gun.js / browser)
  -lib (helper / database / browser / server)
  -server (web server)
  -style (browser)
.babelrc (babel.js)
app.js (init web server)
serverbrowsersync.js ( reload browser watch / not used / package threat)
watchlivereload.js ( reload browser watch / not used)
webpack.config.js (watch babel react browser client build bundle.js)
```

# guide:

```
install nodejs 16.x
```


```
npm install
```
  Install the package by cmd in current project folder.

```
npm run dev
```
  Run web server, webpack 5.x complie and watch file change.

# Project:
  The project is in strict mode that require ./index.js and not ./index as it need ext file checks.

  Package.json is set to module by "type":"module" for import to work for babel.js.

  Note that require() does not work when used type module. Need to use import to get the server and client working correctly.

# React:
  By using the react to handle html render elements and events.

# dev:
  To build simple webpack and server to deal with the gun websocket.

  Added web browser reload for files changes. (removed)

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
    return ()=>{ //unmount event and clean up

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
# Dev local network:
 - The firewall or other program monitor the network will block the local address access.
 - Two that http:// will redirect to https:// it depend on the broswer will force to change the secure one.