/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://lostechies.com/derekgreer/2017/05/25/hello-react-a-beginners-setup-tutorial/

// console.log('react');

import React from 'react';
import ReactDOM from 'react-dom';
import MyApp from "./app.js";

/*
import Gun from 'gun/gun';
const gun = Gun({
  peers:['http://localhost:3000/gun']
  //file: 'data.json',
  //web: server
});
gun.on('hi', peer => {//peer connect
  //console.log('connect peer to',peer);
  console.log('peer connect!');
});
gun.on('bye', (peer)=>{// peer disconnect
  //console.log('disconnected from', peer);
  console.log('disconnected from peer!');
});
*/

ReactDOM.render(<MyApp />, document.getElementById('root'));
console.log('end react');