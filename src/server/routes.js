// 
// https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/

import { Router } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const router = Router();

//middleware
//router.use( (req, res, next) => {
  //res.setHeader('Access-Control-Allow-Origin', '*');
  //console.log('header...');
  //next();
//});

//router.use('/helloworld', (req, res, next) => {
  //res.send('Hello, World!');
  //next();
//});
// url index
router.get('/', (req, res, next) => {
  //res.setHeader('Access-Control-Allow-Origin', '*');
  //res.send('Hello, World!');
  res.sendFile(path.join(__dirname, '../index.html'));
  //next();
});

router.get('/ip', (req,res) => {
  //const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  //console.log(ip); // ip address of the user
  console.log("// IP //");
  console.log("req.headers['x-forwarded-for']: ",req.headers['x-forwarded-for'])
  console.log("req.socket.remoteAddress: ",req.socket.remoteAddress)
  console.log("req.headers.host: ",req.headers.host)
  console.log("req.protocol: ",req.protocol)
  console.log("req.hostname: ",req.hostname)
  console.log("req.ip: ",req.ip)
  console.log("req.ips: ",req.ips)
  console.log("req.originalUrl: ",req.originalUrl)
  res.send('Hello, World!');
});

//router.get('/', function (req, res, next) {
  //next()
//})
// https://stackoverflow.com/questions/6528876/how-to-redirect-404-errors-to-a-page-in-expressjs
// added last
// error url if there does not exist
// redirect here
router.get('*', (req, res, next) => {
  res.status(404);
  
  // respond with html page
  if (req.accepts('html')) {
    res.redirect(301, '/');
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

export default router;