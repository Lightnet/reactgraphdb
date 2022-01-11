/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useEffect, useState } from "react"
import { useGun } from "../gun/gunprovider.js";
import {isEmpty, unixTime} from '../../lib/helper.js';

export default function ComposeMessage(){
  const {gun,user}=useGun()
  const [aliasID, setAliasID] = useState();

  const [status, setStatus] = useState('');
  const [pub, setPub] = useState('');
  const [contacts,setContacts] = useState([]);

  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  useEffect(()=>{
    //let u = gun.user();
    //console.log(u.is.pub)
    //setAliasID(u.is.pub)
    if(gun){
      let guser = gun.user();
      setAliasID(gun.user().is.pub)
      console.log(guser);
      setContacts([]);
      //let contracts = await guser.get('contact').once().map().once().then();
      guser.get('contact').once().map().once((data,key)=>{
        //console.log(data,":",key)
        console.log("data");
        console.log(data);
        setContacts(item=>[...item,{alias:data.alias,pub:data.pub}]);
      })
      //console.log(contracts);
      return ()=>{
        setContacts([]);
      }
    }

  },[])

  function selectContact(event){
    console.log("event.target.value");
    console.log(event.target.value);
    setPub(event.target.value);
  }


  function typePub(event){
    console.log("pub...");
    setPub(event.target.value)
  }

  function typeSubject(event){
    console.log("pub...");
    setSubject(event.target.value)
  }

  function typeContent(event){
    console.log("pub...");
    setContent(event.target.value)
  }

  async function AddContact(){
    let who = gun.user(pub);
    if(isEmpty(pub)){
      console.log('empty pub')
      return;
    }

    //console.log(who);
    //console.log(await who.get('alias'))
    //console.log(await who.get('pub'))
    let alias = await who.get('alias');
    let pubkey = await who.get('pub');
    if(pubkey){
      console.log('ADD Contact')
      let guser = gun.user();
      guser.get('contact').get(pubkey).put({
        alias:alias,
        pub:pubkey
      })

    }else{
      console.log('error add contact');
    }
  }

  async function removeContact(){
    let who = gun.user(pub);
    if(isEmpty(pub)){
      console.log('empty pub')
      return;
    }

    //console.log(who);
    //console.log(await who.get('alias'))
    //console.log(await who.get('pub'))
    //let alias = await who.get('alias');
    let pubkey = await who.get('pub');
    if(pubkey){
      console.log('ADD Contact')
      let guser = gun.user();
      guser.get('contact').get(pubkey).put(null,ack=>{
        console.log('DELETE CONTACT...');
        console.log(ack);
      })

    }else{
      console.log('error add contact');
    }
  }

  async function clickSent(){
    console.log(subject);
    console.log(content);
    console.log('send...');
    if(isEmpty(pub)==true || isEmpty(subject)==true || isEmpty(content)==true){
      console.log('EMPTY...');
      return;
    }
    // https://gun.eco/docs/SEA
    if(gun){
      let timeStamp = unixTime();
      let gunUser = gun.user();
      let pkey = await gunUser.get('pub');
      console.log('pkey:',pkey)

      await gun.get('~'+pkey) 
        .get('message')
        .get(pub)
        .get(timeStamp).put({
          pub:pub,
          subject:subject,
          content:content,
          date:timeStamp
        },ack=>{
          console.log(ack);
          if(ack.err){
            console.log('ERROR GUN PUT...');
            return;
          }

          console.log('Gun Message Put...');
        });

    }else{
      console.log('gun error...');
    }
  }

  return <div>

    <label>Compose [Pub:{aliasID}]</label>
    <table>
      <tbody>
        <tr>
          <td>
            <label>PUB:</label>
            <input value={pub} onChange={typePub}></input>
            <select value={pub} onChange={selectContact}>
              <option value={pub} disabled > Select Pub Key</option>
              {contacts.map(item=>{
                console.log("item")
                console.log(item)
                return <option key={item.pub} value={item.pub}>  {item.alias}  </option>
              })}
            </select>
            <button onClick={AddContact}>Add</button>
            <button onClick={removeContact}>Remove</button>
            <label>Status:{status}</label>
          </td>
        </tr>

        <tr>
          <td>
            <label>Subejct:</label><br />
            <input value={subject} onChange={typeSubject}></input>
          </td>
        </tr>

        <tr>
          <td>
            <label>Content:</label><br />
            <textarea value={content} onChange={typeContent}></textarea>
          </td>
        </tr>

        <tr>
          <td>
            <button onClick={clickSent}>Sent</button>
          </td>
        </tr>

      </tbody>
    </table>
  </div>
}