/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';
import ModalTest from '../modal/modeltest.js';
import NotiftyTest from '../notify/notiftytest.js';
//import { useNotifty } from '../notify/notifyprovider.js';
//import { nInfo } from '../notify/notifytype.js';

export default function HomePage(){


  return <>
    <label>HomePage!</label>
    <ModalTest />
    
    <NotiftyTest />
  </>
}
/*
  <button onClick={clickInfo}> Test Info </button>
*/
