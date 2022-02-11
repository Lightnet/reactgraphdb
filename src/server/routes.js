// 
// https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/

import { Router } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const router = Router();

//router.use('/helloworld', (req, res, next) => {
  //res.send('Hello, World!');
  //next();
//});

router.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log('header...');
  next();
});

//router.use('/', (req, res, next) => {
router.get('/', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  //res.send('Hello, World!');
  res.sendFile(path.join(__dirname, '../index.html'));
  //res.end();
  //next();
});

router.get('/ip', (req,res) => {
  console.log("req.headers['x-forwarded-for']: ",req.headers['x-forwarded-for'])
  console.log("req.socket.remoteAddress: ",req.socket.remoteAddress)
  console.log("req.headers.host: ",req.headers.host)
  //const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  //console.log(ip); // ip address of the user

  console.log("req.protocol: ",req.protocol)
  console.log("req.originalUrl: ",req.originalUrl)
  res.send('Hello, World!');
});

//router.get('/', function (req, res, next) {
  //next()
//})

export default router;