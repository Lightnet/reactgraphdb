/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { Link, Route, Routes } from 'react-router-dom'

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.globEager('./pages/*.jsx')

const pageroutes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1]
  return {
    name,
    path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
    component: pages[path].default
  }
})

export function App() {
  return (
    <>
      <nav>
        <ul>
          {pageroutes.map(({ name, path }) => {
            return (
              <li key={path}>
                <Link to={path}>{name}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <Routes>
        {pageroutes.map(({ path, component: RouteComp }) => {
          return (
            <Route key={path} path={path}  element={<RouteComp />  } />
          )
        })}
      </Routes>
    </>
  )
}