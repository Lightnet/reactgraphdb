/*
  LICENSE: MIT
  Created by: Lightnet
*/

import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { GunProvider } from './components/gun/GunProvider.jsx'
import { ThemeProvider } from './components/theme/ThemeProvider.jsx'
import './style/globals.css'

ReactDOM.hydrate(
  <ThemeProvider>
    <BrowserRouter>
      <GunProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </GunProvider>
    </BrowserRouter>
  </ThemeProvider>
  ,
  document.getElementById('app')
)