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

  By using gun.js graph database and peer to peer (not work on it) that used websocket or http in server side. Server will not used secret keys, cookies, sessions as the database is public and private keys. As for the client will use web socket. To query data information. Learn more about the in https://gun.eco/docs/API or https://github.com/amark/gun.

  Using the react.js to build UI and components to handle get and put data with SEA checks to prevent override in case of user edit graph without permission as well the user interface.

# dev:
 - web browser reload for files changes. (removed)
 - navigator.clipboard
  - copy
  - paste (required permission browser to do paste)
 - To build simple webpack and server to deal with the gun websocket and peer to peer network.

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

## Tools:
  To create tools for easy to access to deal with messages to have user have some control to add more encryption.
  - SEA pair UI
  - Crypto Message types

# Layout:
```
src
  -client ( browser ) 
  -components ( react.js / gun.js / browser )
  -lib ( helper / database / browser / server )
  -server ( web server )
  -style ( browser)
.babelrc ( babel.js )
app.mjs ( init web server )
serverbrowsersync.js ( reload browser watch / not used )
watchlivereload.js ( reload browser watch / not used )
webpack.config.mjs ( watch babel react browser client build bundle.js )
```

# Guide:

```
install nodejs 16.x
```
  Install nodejs program to able to install packages.
```
npm install
```
  Install the package by cmd in current project folder.

```
npm run dev
```
  Run web server, webpack 5.x complie and watch file change.

# Project:
  The project is in strict mode that require ./index.js and not ./index as it need ext file checks. reason is filename ext may different in filename.js, filename.mjs, filename.jsx, and etc.

  Package.json is set to module by "type":"module" for import to work for babel.js.

  Note that require() does not work when used type module. Need to use import to get the server and client working correctly.

## Links:
 - https://gun.eco/docs/API
 - https://gun.eco/docs/SEA
 - https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 - https://reactrouter.com
 - https://reactjs.org/
   - https://reactjs.org/docs/hooks-reference.html
   - https://reactjs.org/docs/hooks-reference.html#usecontext  Ref. GunProvider

App.js entry point
```js
import React from 'react';
import { GunProvider } from './components/gun/GunProvider.jsx';
import { BrowserRouter } from "react-router-dom";
import RoutePage from './components/RoutePage.jsx';

export default function MyApp(){
  return <BrowserRouter> 
    <GunProvider>
      <RoutePage />
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

GunProvider.jsx for gun.js setup for global access
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
      let gunp = Gun({
        peers:['http://localhost:3000/gun']
      });
      gunp.on('hi', peer => {//peer connect
        console.log('peer connect!');
      });
      gunp.on('bye', (peer)=>{// peer disconnect
        console.log('disconnected from peer!');
      });
      gunp.SEA = Gun.SEA;
      setGun(gunp);
  },[])

  const value = useMemo(()=>({ // deal with reused call
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
import { useGun } from './gun/GunProvider.jsx';

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