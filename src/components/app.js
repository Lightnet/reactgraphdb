/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    This sectoin handle the context provider varaibles and functions.
    Top layer for passing to children components.
*/

// https://reactrouter.com/docs/en/v6/getting-started/tutorial

import React from 'react';
import { GunProvider } from './gun/gunprovider.js';
import { BrowserRouter } from "react-router-dom";
import IndexPage from './indexpage.js';
import { NottifyProvider } from './notify/notifyprovider.js';

export default function MyApp(){
  return <BrowserRouter> 
    <GunProvider>
      <NottifyProvider>
        <IndexPage />
      </NottifyProvider>
    </GunProvider>
  </BrowserRouter>
}