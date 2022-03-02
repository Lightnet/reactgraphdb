/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { isEmpty, unixTime } from "../../lib/helper.mjs";
import { useGun } from "../gun/GunProvider.jsx";

export default function ChatPage(){

  const{gun, gunUser} = useGun();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessage] = useState([]);
  const [chat, setChat] = useState(null);
  const [secret, setSecret] = useState('');
  const [secret0, setSecret0] = useState('');

  let sec = '';

  const divRref = useRef(null);

  if(!gunUser){
    return <>
      <Link to="/signin">Sign In</Link>
    </>
  }

  useEffect(async()=>{
    let enc = await SEA.work("public","chat"); //encrypttion key default?
    setSecret(enc);
  },[])

  useEffect(()=>{
    //console.log("secret");
    console.log("secret::",secret);
    if(!isEmpty(secret)){
      console.log("secret:.................:",secret);
      sec = secret;
      //setSecret0(secret);
      let chatv = gun.get('chat');
      chatv.map().once(qcallback);
      setChat(chatv)
    }
    //console.log("secret");
    return ()=>{
      if(chat){
        chat.off();
      }
    }
    
  },[secret])

  async function qcallback(data,key){
    //console.log('incoming messages...')
    //console.log("data",data);
    if(data == null)return;
    if(data.message != null){
      //console.log("add ",data);
      //let dec = data.message;
      //console.log("secret:>>>>>>>>>>",secret);

      //let enc = await SEA.work("public","chat");
      let enc = secret;
      //console.log(sec);

      //console.log("secret");
      //console.log(enc);
      //console.log(data.message);
      let msg = await gun.SEA.decrypt(data.message,enc);
      //console.log(msg);
      if(!msg){// if fail decode skip
        return;
      }

      let element = {id:key,alias:data.alias, message:msg};
      setMessage(messages =>[...messages,element])
    }
  }

  // update message to scroll down
  useEffect(() => {
    if(divRref){
      divRref.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  //once set up
  useEffect(()=>{
    //let chatv = gun.get('chat');
    //chatv.map().once(qcallback);
    //setChat(chatv)
    //return ()=>{
      //if(chat){
        //chat.off();
      //}
    //}
  },[])

  async function typingInputMessage(event){
    setInputMessage(event.target.value)
    if(event.keyCode == 13){
      console.log('ENTER CHAT')
      //console.log(Gun);
      //console.log(unixTime())
      let timestamp = unixTime();

      let who = "test";
      let msg = inputMessage;

      let sec = await gun.SEA.work("public","chat");//encrypttion key default?
      let enc = await SEA.encrypt(msg,sec);
      //console.log(enc)

      gun.get('chat').get(timestamp).put({
        alias:who,
        message:enc //enc
      });
    }
  }

  async function ClickChat(){
    let timestamp = unixTime();

      let who = "test";
      let msg = inputMessage;

      let sec = await gun.SEA.work("public","chat");//encrypttion key default?
      let enc = await SEA.encrypt(msg,sec);
      //console.log(enc)

      gun.get('chat').get(timestamp).put({
        alias:who,
        message:enc //enc
      });
  }

  function changeInputMessage(event){
    setInputMessage(event.target.value)
  }

  return <>
    <div style={{height:'200px',width:'200px',borderStyle:'solid',overflow:'scroll'}}>
      {messages.map(item=>{
        return <div key={item.id}> 
          <label> @{item.alias}: </label>
          <label> {item.message} </label>
        </div>
      })}
      <div ref={divRref} />
    </div>
    <div>
      <input value={inputMessage} onChange={changeInputMessage} onKeyUp={typingInputMessage} ></input><button onClick={ClickChat}>Chat</button>
    </div>
  </>
}