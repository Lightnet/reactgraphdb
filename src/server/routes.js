// 
// https://www.freecodecamp.org/news/how-to-enable-es6-and-beyond-syntax-with-node-and-express-68d3e11fe1ab/

import { Router } from 'express';
const router = Router();

router.use('/helloworld', (req, res, next) => {
  res.send('Hello, World!');
  //next();
});

//router.get('/', function (req, res, next) {
  //next()
//})

export default router;