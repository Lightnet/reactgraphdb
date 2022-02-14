/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';
import { Link } from 'react-router-dom';
import ModalTest from '../modal/modeltest.js';
import NotiftyTest from '../notify/notiftytest.js';
//import { useNotifty } from '../notify/notifyprovider.js';
//import { nInfo } from '../notify/notifytype.js';

export default function HomePage(){


  return <>
    <label>HomePage!</label><br />
    <Link to="/signin">Sign In</Link> <br />

    <ModalTest /><br />
    
    <NotiftyTest />
  </>
}
/*
  <button onClick={clickInfo}> Test Info </button>
*/
