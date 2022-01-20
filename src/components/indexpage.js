/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import AccountPage from './account/index.js';
import SignIn from './auth/signin.js';
import SignUp from './auth/signup.js';
import SignOut from './auth/signout.js';
import ChatPage from './chat/index.js';
import { useGun } from './gun/gunprovider.js';
import HomePage from './home/index.js';
import AccessNavBarTop from './layout/accessnavbar.js';
import MessagePage from './message/index.js';
import GetHintPage from './account/gethint.js';
import NotifyManager from './notify/notifymanager.js';

export default function IndexPage(){

  const {gunUser} = useGun(); // gun.js

    function renderPage(){
      if(!gunUser){
        return <>
        <AccessNavBarTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/recovery" element={<GetHintPage />} />
        </Routes>
      </>
      }else{
        return <>
        <AccessNavBarTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account/*" element={<AccountPage />} />
          <Route path="/message/*" element={<MessagePage />} />
          <Route path="/chat/*" element={<ChatPage />} />
          <Route path="/signout" element={<SignOut />} />
        </Routes>
      </>
      }
    }

  return <>
    {renderPage()}
    <NotifyManager />
  </>
  
}
/*
<label>Hello World! React!</label>
*/