/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useEffect, useState } from "react";
import { isEmpty } from "../../lib/helper.js";
import { useGun } from "../gun/gunprovider.js"

export default function InboxMessages(){

  const {gun} = useGun();
  const [messages,setMessages] = useState([]);
  const [contacts,setContacts] = useState([]);
  const [messageID, setMessageID] = useState('');
  const [pub,setPub] = useState('');

  useEffect(()=>{
    if(gun){
      let guser = gun.user();
      //console.log(guser);
      setContacts([]);
      //let contracts = await guser.get('contact').once().map().once().then();
      guser.get('contact').once().map().once((data,key)=>{
        //console.log(data,":",key)
        console.log("data");
        console.log(data);
        if(isEmpty(data.alias)==true || isEmpty(data.pub)==true){
          return;
        }
        setContacts(item=>[...item,{
          alias:data.alias,
          pub:data.pub
        }]);
      })
      //console.log(contracts);
      return ()=>{
        setContacts([]);
      }
    }
  },[])

  function selectPub(event){
    //console.log("event.target.value");
    //console.log(event.target.value);
    setPub(event.target.value);
  }

  useEffect(()=>{
    getMessages();
  },[pub]);

  async function getMessages(){
    if(pub){
      if(!isEmpty(pub)){
        let guser = gun.user();
        let pkey = await guser.get('pub');
        setMessages([]);//clear message

        let to = gun.user(pub);//get alias
        let who = await to.then() || {};//get alias data
        if(!who.alias){
          console.log("No Alias!");
          //$('#mwho').text("who?");
          return;
        }

        let UIdec = await gun.SEA.secret(who.epub, guser._.sea); // Diffie-Hellman

        await gun.get('~'+pkey)
          .get('message')
          .get(pub).once().map().once( async (data,key)=>{
            //console.log("key")
            //console.log(key)
            //console.log("data")
            //console.log(data)
            if(!data){
              console.log("NULL U MESSAGE")
              return;
            }
            if(data=="NULL"){
              console.log("NULL MESSAGE")
              return;
            }
            let subject = await gun.SEA.decrypt(data.subject, UIdec);
            let content = await gun.SEA.decrypt(data.content, UIdec);

            setMessages(item=>[...item,{
              date:key,
              pub:data.pub,
              subject:subject,
              content:content,
            }])
          })
      }
    }
  }

  function selectMessageID(id){
    console.log('id date:',id )
    setMessageID(id);
  }

  function renderMessageID(){
    console.log(messageID);

    let msgID = String(messageID);

    if(!isEmpty(msgID)){
      let data;
      for(let msg of messages){
        if(msg.date == messageID){
          data = msg;
          break;
        }
      }
      if(data){
        return <div>
          <label onClick={()=>selectMessageID('')}>[BACK]</label><br />
          <label>Subject:{data.subject}</label><br />
          <label>Content:{data.content}</label>
        </div>
      }
    }
    
    return <></>
  }

  function renderMessages(){
    if(messageID ==''){
      return messages.map((item)=>{
        return <div key={item.date}>
          <label onClick={()=>selectMessageID(item.date)} >Subject:{item.subject}</label>
        </div>
      })
    }
    return <></>
  }

  return <div>
    <label>Inbox</label> <br />
    <label>Contact:</label>
    <select value={pub} onChange={selectPub}>
      <option value={pub} disabled > Select Pub Key</option>
      {contacts.map(item=>{
        return <option key={item.pub} value={item.pub}> {item.alias}  </option>
      })}
    </select>

    {renderMessages()}

    {renderMessageID()}

  </div>
}