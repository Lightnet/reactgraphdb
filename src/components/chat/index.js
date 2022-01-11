/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useRef, useState } from "react";
import { unixTime } from "../../lib/helper.js";
import { useGun } from "../gun/gunprovider.js";

export default function ChatPage(){

  const{gun} = useGun();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessage] = useState([]);
  const [chat, setChat] = useState(null);

  const divRref = useRef(null);

  function qcallback(data,key){
    console.log('incoming messages...')
    console.log("data",data);
    if(data == null)return;
    if(data.message != null){
      console.log("add ",data);
      //let dec = data.message;
      let element = {id:key,alias:data.alias,message:data.message};
      setMessage(messages =>[...messages,element])
    }
  }

  useEffect(() => {
    if(divRref){
      divRref.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  useEffect(()=>{
    let chatv = gun.get('chat');
    chatv.map().once(qcallback);
    setChat(chatv)
    return ()=>{
      if(chat){
        chat.off();
      }
    }
  },[])

  function typingInputMessage(event){
    if(event.keyCode == 13){
      console.log('ENTER CHAT')
      //console.log(Gun);
      //console.log(unixTime())
      let timestamp = unixTime();

      let who = "test";
      let msg = inputMessage;

      gun.get('chat').get(timestamp).put({
        alias:who,
        message:msg //enc
      });

    }
    setInputMessage(event.target.value)
  }

  function changeInputMessage(event){
    setInputMessage(event.target.value)
  }

  return <>
    <div style={{height:'200px',width:'200px',borderStyle:'solid',overflow:'scroll'}}>
      {messages.map(item=>{
        return <div key={item.id}> 
          <label> Alias:{item.alias} </label>
          <label> {item.message} </label>
        </div>
      })}
      <div ref={divRref} />
    </div>
    <div>
      <input value={inputMessage} onChange={changeInputMessage} onKeyUp={typingInputMessage} ></input>
    </div>
  </>
}