/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import { useTheme } from "./ThemeProvider.jsx";

export default function ThemeLink(){

  const {theme, setTheme} = useTheme();

  function clickTheme(event){
    event.preventDefault();
    //console.log('theme');
    let currentTheme = theme;
    let targetTheme = "light";

    if (currentTheme === "light") {
      targetTheme = "dark";
    }
    setTheme(targetTheme);

    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
  }

  return <a style={{cursor: 'pointer'}} onClick={clickTheme}>Theme {theme}</a>
}