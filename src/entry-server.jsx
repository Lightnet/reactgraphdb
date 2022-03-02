/*
  LICENSE: MIT
  Created by: Lightnet
*/

import ReactDOMServer from 'react-dom/server'
//import { StaticRouter } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import { App } from './App'
import { ThemeProvider } from './components/theme/ThemeProvider.jsx'

export function render(url) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url} >
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StaticRouter>
  )
}