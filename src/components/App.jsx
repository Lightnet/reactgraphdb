/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    This sectoin handle the context provider varaibles and functions.
    Top layer for passing to children components.
*/

// https://reactrouter.com/docs/en/v6/getting-started/tutorial

import React from 'react';
import { GunProvider } from './gun/GunProvider.jsx';
import { BrowserRouter } from "react-router-dom";
import RoutePage from './RoutePage.jsx';
import { NotifyProvider } from './notify/NotifyProvider.jsx';
import { ThemeProvider } from './theme/ThemeProvider.jsx';

export default function MyApp(){
  
  return (
  <ThemeProvider>
    <BrowserRouter> 
      <GunProvider>
        <NotifyProvider>
          <RoutePage />
        </NotifyProvider>
      </GunProvider>
    </BrowserRouter>
  </ThemeProvider>
  )
}