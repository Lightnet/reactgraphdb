/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useRef, useState } from "react";
import { useGun } from "../gun/GunProvider.jsx";
//import Gun from 'gun/gun.js';
import { isEmpty, nanoid32, unixTime } from "../../lib/helper.mjs";

import { Link } from "react-router-dom";

import { useNotifty,Color } from "../notify/NotifyProvider.jsx";

export default function GroupChat(){

  //const [chatID, setChatID] = useState('');
  const {gun, gunUser} = useGun();
  const {dispatchNotify} = useNotifty();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isRoom, setisRoom] = useState(false);
  //const [isPub, setIsPub] = useState(false);

  const [publicKey, setPublicKey] = useState('');
  
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const [groupID, setGroupID] = useState('');
  const [gunGroup, setGunGroup] = useState(null);
  const [groups, setGroups] = useState([]);

  const [shareKey, setShareKey] = useState('');
  const divScrollRef = useRef(null);

  if(!gunUser){
    return <>
      <Link to="/signin">Sign In</Link> 
    </>
  }
  
  async function addPrivateChat(index, data){
    let user = gun.user();
    console.log("add chat room list");
    console.log(index);
    console.log(data);
    let name = await user.get('groupchat').get(index).get('info').get('name').then();
    console.log(name);
    if(name){
      setGroups(item=>[...item,{id: index, name : name}])
    }
  }

  //get group chat list
  useEffect(()=>{
    let user = gun.user();
    user.get('groupchat').once().map().once(function(data,key){
      if(data !=null){
        console.log(data)
        addPrivateChat(key,data);
      }
    });
  },[]);

  useEffect(() => {
    if(divScrollRef){
      divScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  useEffect(() => {
    return ()=>{
      if(gunGroup){
        gunGroup.off();
      }
    }
  });

  function typeGroupID(event){
    setGroupID(event.target.value);
  }
  function typePublicKey(event){
    setPublicKey(event.target.value);
  }
  function typeMessage(event){
    setMessage(event.target.value);
  }
  function clickBack(){
    setisRoom(false);
    setMessages([])
    setShareKey('');
  }

  async function selectGroupID(event){
    console.log(event.target.value);
    setGroupID(event.target.value);
    let groupKey = event.target.value;
    //check for owner
    let pub = await gun.get(groupKey).get('info').get('pub').then();
    if(pub){
      let user = gun.user();
      console.log('owner...');
      if(pub == user.is.pub){
        setIsAdmin(true)
      }else{
        setIsAdmin(false);
      }
    }else{
      setIsAdmin(false);
    }

  }

  function timestamp(){
    let currentDate = new Date();
    //console.log(currentDate);
    let year = currentDate.getFullYear();
    let month = ("0" + (currentDate.getMonth() + 1 ) ).slice(-2);
    let date = ("0" +currentDate.getDate()).slice(-2);
    let hour = ("0" +currentDate.getHours()).slice(-2);
    let minute = ("0" +currentDate.getMinutes()).slice(-2);
    let second = ("0" +currentDate.getSeconds()).slice(-2);
    let millisecond = currentDate.getMilliseconds();
    return year + "/" + (month) + "/" + date + ":" + hour+ ":" + minute+ ":" + second+ ":" + millisecond;        
  }
  
  async function inputMessageEnter(event){
    if(event.code == 'Enter'){
      console.log('ENTER MESSAGE');
      let user = gun.user();
      if(!user.is){ return }//check if user exist
      let msg = (message || '').trim();
      if(!msg) return;//check if not id empty
      let who = await user.get('alias').then();

      //console.log(gunGroup);
      //console.log('shareKey',shareKey);

      if(gunGroup){
        let enc = await gun.SEA.encrypt(msg, shareKey);

        enc = window.btoa(enc);//gun graph need to be string not SEA{} that will reject that is not soul of user
        //timestamp()
        
        gunGroup.get('message').get(timestamp()).put({
          alias:who,
          message:enc
        });
      }
    }
  }

  function enterGroup(){
    setisRoom(true);
    initGroupChat();
  }

  async function addGroupChat(){
    let user = gun.user();
    if(!user.is)return;
    let privatekey = (groupID || "").trim() ;
    if(!privatekey)return;
    let gkey = await gun.get(privatekey).then();
    //console.log(gkey);
    if(gkey == undefined){
      console.log("NOT FOUND!");
      dispatchNotify({
        type: 'add'
        , color: Color.error
        , children: "GroupChat ID Not Found!"
      })
      return;
    }
    let guninfo = gun.get(privatekey).get('info');
    let pub = await guninfo.get('pub').then();
    let title = await guninfo.get('name').then();
    let description = await guninfo.get('description').then();
    let date = await guninfo.get('date').then();
    //console.log(pub);console.log(title);console.log(date);
    user.get('groupchat').get(privatekey).get('info').put({
        pub:pub,
        name: title,
        description:description,
        date:date
    });
    dispatchNotify({
      type: 'add'
      , color: Color.success
      , children: "Group Chat Added!!"
    })
  }

  async function removeGroupChat(){
    //need to check for owner groupchat delete
    let user = gun.user();
    if(!user.is)return;
    let privatekey = (groupID || "").trim();
    if(!privatekey)return;
    let gkey = await gun.get(privatekey).then();
    if(gkey == undefined){
      console.log("NOT FOUND!");
      return;
    }
    user.get('groupchat').get(privatekey).put(null);
    dispatchNotify({
      type: 'add'
      , color: Color.success
      , children: "Group Chat Delete!"
    })
  }

  // https://github.com/Lightnet/gunjstrustsharekey/blob/master/client.js Line:1042
  async function createGroupChat(){
    // let genprivatechatid = Gun.text.random();//random string
    // let gensharekey = Gun.text.random();//random string

    let user = gun.user();// get user graph
    let pair = user._.sea;//user pair
    let genGroupKey = nanoid32();
    let genSharekey = nanoid32();
    let pname = "private chat "+genGroupKey;//id name
    let pdescription= "group chat";//id description

    let enc = await gun.SEA.encrypt(genSharekey, pair);//encode key

    //
    user.get('groupchat')
    .get(genGroupKey).get('sharekey').put(enc);

    let dh = await gun.SEA.secret(pair.epub, pair);
    enc = await gun.SEA.encrypt(genSharekey, dh);

    // sharekey
    user.get('groupchat')
      .get(genGroupKey)
      .get('pub')
      .get(pair.pub)
      .put(enc);

    user.get('groupchat')
    .get(genGroupKey)
    .get('info')
    .put({
      pub:pair.pub,
      name:pname,
      description:pdescription,
      date:unixTime()
    });

    gun.get(genGroupKey)
      .get('info')
      .put({
        pub:pair.pub,
        name:pname,
        description:pdescription,
        date:unixTime()
      });

      dispatchNotify({
        type: 'add'
        , color: Color.success
        , children: "Group Chat Create!" + genGroupKey
      })

  }

  async function deleteGroupChat(){
    //need to check for owner groupchat delete
    let user = gun.user();
    if(!user.is)return;
    let privatekey = (groupID || "").trim();
    if(!privatekey)return;
    let gkey = await gun.get(privatekey).then();
    if(gkey == undefined){
        console.log("NOT FOUND!");
        return;
    }
    user.get('groupchat').get(privatekey).put(null);
  }

  // https://github.com/Lightnet/gunjstrustsharekey/blob/master/client.js line:975
  async function initGroupChat(){
    //CleanPrivateChatMessages();
    let groupKey = (groupID || "").trim();
    if(isEmpty(groupKey)){
      console.log("EMPTY");
      return;
    }
    console.log("groupKey:",groupKey);

    let user = gun.user();
    let pair = user._.sea;
    //GET ENC SHARE KEY
    let pub = await gun.get(groupKey).get('info').get('pub').then();
    let title = await gun.get(groupKey).get('info').get('name').then();

    if(!pub){
      console.log('init group chat id not found!')
      return;
    }

    //UI element
    //admin check
    if(pub == user.is.pub){

    }else{ // member

    }

    let to = gun.user(pub);
    let epub =await to.get('epub').then();
    let encsharekey = await to.get('groupchat').get(groupKey).get('pub').get(pair.pub).then();
    //console.log(encsharekey);
    let dh = await SEA.secret(epub, pair);
    let dec = await SEA.decrypt(encsharekey, dh);
    //console.log(dec);
    if(dec==null){
      console.log("NULL SHARE KEY!");
      dispatchNotify({
        type: 'add'
        , color: Color.error
        , children: "NULL SHARE KEY!"
      })

      setisRoom(false);
      return;
    }
    let privatesharekey = dec;
    //console.log('groupChatShareKey',privatesharekey)
    setShareKey(privatesharekey);
    //check if there another chat then turn off listen
    //if(gunprivatechat !=null){
      //gunprivatechat.off();
    //}
    if(gunGroup){
      gunGroup.off();
    }

    let gunGroupChat = gun.get(groupKey);

    //let timestring = year + "/" + month + "/" + date + ":";
    //let timestring = unixTime();

    async function qcallback(data,key){
      console.log('incoming messages...')
      //console.log("key",key);
      //console.log("data",data);
      if(data == null)return;
      if(data.message != null){
          let message = window.atob(data.message);
          let decmsg = await gun.SEA.decrypt(message,privatesharekey);
          if(decmsg!=null){
            console.log('incoming message...');
            //add message
            setMessages(item=>[...item,{id: key,text : data.alias + ": " + decmsg}])
          }
      }
    }
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = ("0" + (currentDate.getMonth() + 1 ) ).slice(-2);
    let date = ("0" +currentDate.getDate()).slice(-2);
    let timestring = year + "/" + month + "/" + date + ":";

    //gunGroupChat.get('message').get({'.': {'*': timestring},'%': 50000}).map().once(qcallback);
    //gunGroupChat.get('message').get({'.': {'*': timestring},'%': 50000}).map().once(qcallback);
    gunGroupChat.get('message').get({'.': {'>': timestring},'%': 50000}).map().once(qcallback);
    setGunGroup(gunGroupChat);
    console.log('END GROUP CHAT LISTEN',groupKey)
  }

  // allow alias public key access to group chat
  async function groupGrantPublicKey(){
    //let ppublickey = ($('#ppublickey').val() || "").trim();
    let groupKey = (groupID || "").trim();
    if(isEmpty(groupKey)){
      //console.log("EMPTY groupKey");
      dispatchNotify({
        type: 'add'
        , color: Color.error
        , children: "GroupChat ID Empty!"
      })
      return;
    }
    let pkey = shareKey;

    let pubKey = (publicKey || "").trim();
    if(isEmpty(pubKey)){
      //console.log("EMPTY pubKey");
      dispatchNotify({
        type: 'add'
        , color: Color.error
        , children: "Public Key Empty!"
      })
      return;
    }
    let pownid = await gun.get(groupID).get('info').get('pub').then();
    if(pownid == pubKey){
      console.log("owner!");
      return;
    }
    let user = gun.user();
    let pair = user._.sea;
    let to = gun.user(pubKey);
    let who = await to.get('alias').then();

    if(!who)return;

    if(!pkey)return;

    let pub = await to.get('pub').then();
    let epub = await to.get('epub').then();
    let dh = await SEA.secret(epub, pair);
    let enc = await SEA.encrypt(pkey, dh);

    user.get('groupchat')
        .get(groupID)
        .get('pub')
        .get(pub).put(enc);

    console.log(pkey);
    console.log("finish grant!");
  }

  async function groupRevokePublicKey(){
    //let ppublickey = ($('#ppublickey').val() || "").trim();
    let groupKey = (groupID || "").trim();
    if(isEmpty(groupKey)){
      //console.log("EMPTY groupKey");
      dispatchNotify({
        type: 'add'
        , color: Color.error
        , children: "GroupChat ID Empty!"
      })
      
      return;
    }
    let pkey = (shareKey || "").trim();

    let pubKey = (publicKey || "").trim();
    if(isEmpty(pubKey)){
      console.log("EMPTY pubKey");
      dispatchNotify({
        type: 'add'
        , color: Color.error
        , children: "Public Key Empty!"
      })
      return;
    }

    let pownid = await gun.get(groupKey).get('info').get('pub').then();
    if(pownid == pubKey){
        console.log("owner");
        return;
    }
    let user = gun.user();
    let pair = user._.sea;
    let to = gun.user(pubKey);
    let who = await to.get('alias').then();
    if(!who)return;
    if(!pkey)return;
    //need to generate new share key
    //user.get('privatechatroom')
        //.get(privatechatkey)
        //.get('pub').map().once(function(data,key){});

    let pub = await to.get('pub').then();
    user.get('groupchat')
        .get(groupKey)
        .get('pub')
        .get(pub).put(null);
    console.log(pkey);
    console.log("finish revoke!");
    dispatchNotify({
      type: 'add'
      , color: Color.success
      , children: "Revoke Public Key!"+pkey
    })

  }

  function checkChatID(){
    if(isRoom== false){
      return <>
      <label>Group ID:</label><input value={groupID} onChange={typeGroupID}/> 
      <select value={groupID} onChange={selectGroupID}>
        <option value='' disabled> select group chat ID </option>
        {groups.map((item)=>{
          return <option value={item.id} key={item.id}> {item.name}  </option>
        })}
      </select>
      <button onClick={enterGroup}>Enter</button>
      <button onClick={addGroupChat}>Add</button>
      <button onClick={removeGroupChat} >Remove</button>
      <button onClick={createGroupChat}>Create Group</button>
      <button onClick={deleteGroupChat}>Delete Group</button>
      </>
    }else{
      return <>
        <button onClick={clickBack}>Back</button>
        <label>Chat ID:</label><input value={groupID} readOnly /> 
      </>
    }
    return <></>
  }

  function checkList(){

    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = ("0" + (currentDate.getMonth() + 1 ) ).slice(-2);
    let date = ("0" +currentDate.getDate()).slice(-2);
    let timestring = year + "/" + month + "/" + date + ":";
    
    //gunGroupChat.get('message').get({'.': {'*': timestring},'%': 50000}).map().once(qcallback);
    //gunGroupChat.get('message').get({'.': {'*': timestring},'%': 50000}).map().once(qcallback);
    //gunGroup.get('message').get({'.': {'*': timestring},'%': 50000}).map().once(async(data,key)=>{
    gunGroup.get('message').get({'.': {'>': timestring},'%': 50000}).map().once(async(data,key)=>{
      console.log('incoming messages...')
      //console.log("key",key);
      //console.log("data",data);
      if(data == null)return;
      if(data.message != null){
          let message = window.atob(data.message);
          let decmsg = await gun.SEA.decrypt(message,shareKey);
          if(decmsg!=null){
            console.log('incoming message...');
            //add message
            setMessages(item=>[...item,{id: key,text : data.alias + ": " + decmsg}])
          }
      }
    });
    console.log('init chat...');
  }

  // <button onClick={checkList}>Check...</button>
  function checkMembers(){
    if(isRoom==true && isAdmin==true){
      return <>
        <label>Public Key:</label><input value={publicKey} onChange={typePublicKey}/> 
        <button onClick={groupGrantPublicKey}>Grant</button>
        <button onClick={groupRevokePublicKey}>Revoke</button>
      </>
    }

    return <></>
  }

  return <div style={{height:'calc(100% - 28px)', width:'100%'}}>
    <div style={{height:'26px', width:'100%'}}>
      {checkChatID()}
      {checkMembers()}
    </div>
    <div style={{height:'calc(100% - 90px)', width:'100%'}}>
      <div style={{height:'100%', width:'100%',overflow:'scroll'}}>
        {
          messages.map(item=>{
            return <div key={item.id}>
              {item.text}
            </div>
          })
        }
        <div ref={divScrollRef} />
      </div>
      <div>
        <input value={message} onChange={typeMessage} onKeyUp={inputMessageEnter}/>
      </div>

    </div>
  </div>
}