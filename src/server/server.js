/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.section.io/engineering-education/how-to-setup-nodejs-express-for-react/
// https://www.twilio.com/blog/react-app-with-node-js-server-proxy
// https://www.youtube.com/watch?v=PNtFSVU-YTI
// https://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
// https://expressjs.com/en/guide/behind-proxies.html
// https://stackoverflow.com/questions/41056104/express-how-do-you-get-the-hostname-and-port-that-an-express-server-is-listenin/41056494
// https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
// https://www.grouparoo.com/blog/node-js-and-ipv6
// https://www.pluralsight.com/guides/exposing-your-local-node-js-app-to-the-world

import express from 'express';
import bodyParser from 'body-parser';
import Gun from 'gun';
import routes from './routes.js'
import cors from 'cors';
import http from 'http';
import { networkInterfaces } from 'os';
//import publicIp from 'public-ip';
//console.log(await publicIp.v4());
//console.log(await publicIp.v6());

console.log("process.env.PORT: ", process.env.PORT)
console.log("process.env.HOST: ", process.env.HOST)

function getIPAddress() {
  // import { networkInterfaces } from 'os';
  var interfaces = networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }
  return '0.0.0.0';
}

let PORT = process.env.PORT || 3000;
let HOST = process.env.HOST || getIPAddress();

//PORT = 80;
HOST = "0.0.0.0"; //allow all
//HOST = await publicIp.v6();
//HOST = "127.0.0.1"; //not working script cors
// https://stackoverflow.com/questions/23413401/what-does-trust-proxy-actually-do-in-express-js-and-do-i-need-to-use-it
export default function App(){
  console.log("PC ip address:",getIPAddress());
  const app = express();
  //app.enable('trust proxy');
  //app.set('trust proxy', true)
  //app.set('trust proxy', 'loopback') // specify a single subnet
  //app.set('trust proxy', '127.0.0.1');
  app.set('trust proxy', function (ip) {
    console.log("trust proxy: ",ip);
    if (ip === '127.0.0.1' || ip === '123.123.123.123' || getIPAddress()) return true // trusted IPs
    else return false
  })

  app.set('PORT', PORT)
  app.set('HOST', HOST)
  
  //app.options('*', cors()) // include before other routes 
  app.use(cors({
    //origin:'*',
    //origin:'http://127.0.0.1:3000/',
    //origin:'http://localhost:3000',
    //methods:['GET','POST']
  }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(Gun.serve).use(express.static('public'));//src=path/gun.js
  app.use(routes);

  console.log("APP PORT: ", app.get('PORT'))
  console.log("APP HOST: ", app.get('HOST'))

  //const server = app.listen(app.get('PORT'), () =>
    //console.log(`Express server is running on http://localhost:${PORT}`)
  //);

  var server = http.createServer(app);
  //server.listen(app.get('PORT'),'127.0.0.1',()=>{
  server.listen(app.get('PORT'),app.get('HOST'),()=>{
  //server.listen(app.get('PORT'),()=>{
    console.log('init listen...')
    //console.log("SERVER:: ",server.address())
  });

  server.on('listening', function() {
    let localhost = getIPAddress();
    console.log(`IP address 0 on http://${localhost}:${PORT} <- PC IP`);
    console.log(`IP address 1 on http://${HOST}:${PORT}`)
    console.log(`IP address 2 on http://127.0.0.1:${PORT} `);
    console.log(`IP address 3 on http://localhost:${PORT} <- Default for dev testing...`);
    console.log(`IP address 4 on http://localhost:${PORT}/ip <- IP Test`);
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
    //console.log("SERVER:: ",server.address())
  });
  
  const gun = Gun({
    //file: 'data.json',
    web: server
  });

  //gun.get('test').put({hello:'world'});

  gun.on('hi', peer => {//peer connect
    //console.log('connect peer to',peer);
    console.log('peer connect!');
  });

  gun.on('bye', (peer)=>{// peer disconnect
    //console.log('disconnected from', peer);
    console.log('disconnected from peer!');
  });
}