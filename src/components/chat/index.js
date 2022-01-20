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
  const [secret, setSecret] = useState('');

  const divRref = useRef(null);

  async function qcallback(data,key){
    //console.log('incoming messages...')
    //console.log("data",data);
    if(data == null)return;
    if(data.message != null){
      //console.log("add ",data);
      //let dec = data.message;

      let enc = await SEA.work("public","chat");

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
  useEffect(async()=>{

    let enc = await SEA.work("public","chat"); //encrypttion key default?
    //console.log("enc")
    //console.log(enc)
    //console.log(typeof enc)
    setSecret(enc);

    let chatv = gun.get('chat');
    chatv.map().once(qcallback);
    setChat(chatv)
    return ()=>{
      if(chat){
        chat.off();
      }
    }
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
      console.log(enc)

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
      console.log(enc)

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
          <label> Alias:{item.alias} </label>
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