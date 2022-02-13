/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    Index Page, Main entry.
*/

import React, { useState } from 'react';

import {
  Routes,
  Route
} from "react-router-dom";
import AccountPage from './account/index.js';
import SignIn from './auth/signin.js';
import SignUp from './auth/signup.js';
import SignOut from './auth/signout.js';
import ChatPage from './chat/index.js';
import HomePage from './home/index.js';
import AccessNavBarTop from './layout/accessnavbartop.js';
import MessagePage from './message/messagepage.js';
import GetHintPage from './account/gethint.js';
import GroupChat from './groupchat/index.js';
import GraphPage from './graph/graphpage.js';

import { useGun } from './gun/gunprovider.js';
import NotifyManager from './notify/notifymanager.js';
import SettingsPage from './settings/settingspage.js';
import AccessNavBarBottom from './layout/accessnavbarbottom.js';
import ToolSeaPanel from './tools/toolseapanel.js';
import useEvent from './hook/useevent.js';
import ToolCryptoMessage from './tools/toolcryptomessage.js';

export default function IndexPage(){

  const {gunUser} = useGun(); // gun.js
  const [isToolPair, setIsToolPair] = useState(false);
  const [isToolCryptoMessage, setIsToolCryptoMessage] = useState(false);

  function toggleToolSeaPair(){
    setIsToolPair(state=>!state);
  }
  useEvent('toggleToolSeaPair',toggleToolSeaPair);
  function closeToolSeaPair(){
    setIsToolPair(false);
  }

  function toggleToolCryptoMessage(){
    setIsToolCryptoMessage(state=>!state);
  }
  useEvent('toggleToolCryptoMessage',toggleToolCryptoMessage);
  function closeToolCryptoMessage(){
    setIsToolCryptoMessage(false);
  }
  
  function renderPage(){
    return <>
      <AccessNavBarTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recovery" element={<GetHintPage />} />
        <Route path="/account/*" element={<AccountPage />} />
        <Route path="/message/*" element={<MessagePage />} />
        <Route path="/groupchat/*" element={<GroupChat />} />
        <Route path="/chat/*" element={<ChatPage />} />
        <Route path="/graph/*" element={<GraphPage />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/settings/*" element={<SettingsPage />} />
      </Routes>
      <AccessNavBarBottom />
      <ToolSeaPanel isopen={isToolPair} closeModal={closeToolSeaPair}/>
      <ToolCryptoMessage isopen={isToolCryptoMessage} closeModal={closeToolCryptoMessage} />
    </>
  }
    
  return <>
    {renderPage()}
    <NotifyManager />
  </>
}