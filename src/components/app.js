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
import { NotifyProvider } from './notify/notifyprovider.js';
import { ThemeProvider } from './theme/themeprovider.js';

export default function MyApp(){
  
  return (
  <ThemeProvider>
    <BrowserRouter> 
      <GunProvider>
        <NotifyProvider>
          <IndexPage />
        </NotifyProvider>
      </GunProvider>
    </BrowserRouter>
  </ThemeProvider>
  )
}