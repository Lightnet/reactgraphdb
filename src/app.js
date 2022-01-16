/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://reactrouter.com/docs/en/v6/getting-started/tutorial

import React from 'react';
import { GunProvider } from './components/gun/gunprovider.js';
import { BrowserRouter } from "react-router-dom";
import IndexPage from './components/indexpage.js';
import { NottifyProvider } from './components/notify/notifyprovider.js';

export default function MyApp(){
  return <BrowserRouter> 
    <GunProvider>
      <NottifyProvider>
        <IndexPage />
      </NottifyProvider>
    </GunProvider>
  </BrowserRouter>
}
/*
<label>Hello World! React!</label>
*/