/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage(){

  return <>
    <label>Home Page!</label><br />
    <Link to="/signin">Sign In</Link> <br />
  </>
}

