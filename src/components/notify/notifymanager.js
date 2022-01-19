/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useEffect } from "react";
import { nanoid16 } from "../../lib/helper.js";
import Notification from "./notification.js";
import NotifyContainer from "./notifycontainer.js";
import { useNotifty } from "./notifyprovider.js";

export default function NotifyManager(){

  const {
    notifications
    , setNotifications
    , notify
  } = useNotifty();

  useEffect(()=>{
    if(notify){//check if variable chanage
      //console.log('notifty...a');
      //console.log(notify);
      let { color, autoClose, children } = notify;
      createNotification({ color, autoClose, children });
    }
  },[notify])

  let createNotification = ({ color, autoClose, children }) => {
    setNotifications((prevNotifications) => {
      return [
        ...prevNotifications,
        {
          children,
          color,
          autoClose,
          //id: prevNotifications.length,
          id:nanoid16()
        },
      ];
    });
  };

  let deleteNotification = (id) => {
    const filteredNotifications = notifications.filter(
      (_, index) => id !== index,
      []
    );
    setNotifications(filteredNotifications);
  };

  return <NotifyContainer>
    {notifications.map(({ id, ...props }, index) => {
      //console.log(id);
      //console.log(index);
      //console.log(props);
      //return (<label key={id}>Hello</label>);
      return (
      <Notification
        key={id}
        onDelete={() => deleteNotification(index)}
        //props={...props}//not used this will error in the logs //message is string will not work need html
        color={props.color}
        autoClose={props.autoClose}
        children={props.children}
      />);
    })}
  
  </NotifyContainer>;
}

