/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.section.io/engineering-education/how-to-setup-nodejs-express-for-react/
// https://www.twilio.com/blog/react-app-with-node-js-server-proxy

import express from 'express';
import bodyParser from 'body-parser';
import Gun from 'gun';
import routes from './routes.js'

export default function App(){

  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));

  app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
  });

  //app.get('/', (req, res) => {
    //res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
  //});

  app.use(Gun.serve).use(express.static('public'));

  //Hot reload!
  //app.use((req, res, next) => {
    //route(req, res, next);
  //});
  //app.use("*",routes);

  app.use(routes);

  const server = app.listen(3000, () =>
    console.log('Express server is running on localhost:3000')
  );

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