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
import AccountPage from './account/AccountPage.jsx';
import SignIn from './auth/SignIn.jsx';
import SignUp from './auth/SignUp.jsx';
import SignOut from './auth/SignOut.jsx';
import ChatPage from './chat/ChatPage.jsx';
import HomePage from './home/HomePage.jsx';
import AccessNavBarTop from './layout/AccessNavBarTop.jsx';
import MessagePage from './message/MessagePage.jsx';
import GetHintPage from './account/GetHintPage.jsx';
import GroupChat from './groupchat/GroupChat.jsx';
import GraphPage from './graph/GunGraph.jsx';

import { useGun } from './gun/GunProvider.jsx';
import NotifyManager from './notify/NotifyManager.jsx';
import SettingsPage from './settings/SettingsPage.jsx';
import AccessNavBarBottom from './layout/AccessNavBarBottom.jsx';
import ToolSeaPanel from './tools/ToolSeaPanel.jsx';
import useEvent from './hook/useEvent.jsx';
import CryptoMessageView from './tools/CryptoMessageView.jsx';
import NotFoundPage from './utility/NotFoundPage.jsx';

export default function IndexPage(){

  const {gunUser} = useGun(); // gun.js
  const [isToolPair, setIsToolPair] = useState(false);
  const [isToolCryptoMessage, setIsToolCryptoMessage] = useState(true);
  const [isToolCryptoMessage2, setIsToolCryptoMessage2] = useState(true);

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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <AccessNavBarBottom />
      <ToolSeaPanel isopen={isToolPair} closeModal={closeToolSeaPair}/>
      <CryptoMessageView isopen={isToolCryptoMessage} closeModal={closeToolCryptoMessage} />
      <CryptoMessageView isopen={isToolCryptoMessage} closeModal={closeToolCryptoMessage} posx={200} view={"decryptshare"}/>
    </>
  }
    
  return <>
    {renderPage()}
    <NotifyManager />
  </>
}