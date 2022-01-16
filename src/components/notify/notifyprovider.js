/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ createContext, useContext, useMemo, useState } from "react";

export const nottifyContext = createContext();

export const Color = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};

export function useNotifty(){
  const context = useContext(nottifyContext);
  if (!context) {
    throw new Error(`useNotifty must be used within a nottifyContext`)
  }
  return context;
}

export function NottifyProvider(props){

  const [notify, setNotify] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const value = useMemo(()=>({
    notifications, setNotifications,
    notify, setNotify
  }),[
    notifications,
    notify
  ])

  return <nottifyContext.Provider value={value} {...props} />
}