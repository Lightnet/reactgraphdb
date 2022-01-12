/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://gun.eco/docs/User

import { Link, useNavigate  } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useGun } from "../gun/gunprovider.js";

export default function SignIn(){
  const {
    gun, 
    setGunUser
  } = useGun();

  const navigate = useNavigate();

  const [bPair, setBPair] = useState(false);
  const [pair, setPair] = useState('');
  
  const [status, setStatus] = useState('');

  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('12345678');

  function typingName(event){
    setUserName(event.target.value);
  }

  function typingPassword(event){
    setUserPassword(event.target.value);
  }
  
  async function clickSumbit(){
    console.log(userName);
    console.log(userPassword);
    let user = gun.user();

    await user.auth(userName, userPassword, ack=>{
      console.log(ack);
      console.log(ack.ok);
      setStatus('');
      if(ack.err){
        setStatus(ack.err);
        return;
      }

      //setStatus('');
      let user0 = gun.user();
      //console.log("user0");
      //console.log(user0);
      setGunUser(user0.is);
      navigate("/");
    })
  }

  function checkBoxPair(event){
    console.log(event.target.checked)
    setBPair(event.target.checked)
  }

  function typingPair(event){
    setPair(event.target.value);
  }
  //{pub: 'QHC8hhLhzWRWiowYy0dlqISyVgVdTlscU226gE_XVAg.nUGiJBM0oQwW3FNDQI0ypN2exA3ocmqLBxtTEKzn1Ps', priv: 'IZfXEYtGkPy9Qf4Yy3uFHcWOWu4UX-qLIIoB6yrRibw', epub: 'OyzcL0My5nvv8jgzwhs8z6v4NXrSgxqvXzlpaqQBiUo.TCKSq_dhX0EIk3XP-AhEbAIIR9VkOTRltGJ59nktalw', epriv: 'n1whBJgzsETsbyqh26DjCqvWGWjcC3aMBVih02A6rmU'}

  async function clickPair(){
    //console.log(userName);
    //console.log(userPassword);
    let user = gun.user();
    //let p = await gun.SEA.pair();
    //let p = gun.SEA;
    //console.log(p)

    // {pub: 'QHC8hhLhzWRWiowYy0dlqISyVgVdTlscU226gE_XVAg.nUGiJBM0oQwW3FNDQI0ypN2exA3ocmqLBxtTEKzn1Ps', priv: 'IZfXEYtGkPy9Qf4Yy3uFHcWOWu4UX-qLIIoB6yrRibw', epub: 'OyzcL0My5nvv8jgzwhs8z6v4NXrSgxqvXzlpaqQBiUo.TCKSq_dhX0EIk3XP-AhEbAIIR9VkOTRltGJ59nktalw', epriv: 'n1whBJgzsETsbyqh26DjCqvWGWjcC3aMBVih02A6rmU'}
    let ps = pair;
    console.log( ps );
    try{
      ps = JSON.parse(ps);
    }catch(e){
      console.log(e);
      return;
    }
    
    console.log( ps );
    console.log(typeof ps );

    user.auth(ps, ack=>{
      //console.log(ack);
      setStatus('');
      if(ack.err){
        setStatus(ack.err);
        return;
      }
      //setStatus('');
      let user0 = gun.user();
      console.log(user0)
      setUser(user0.is);
    })
    
  }

  async function clickCreatePair(){
    let p = await gun.SEA.pair();
    //pair = JSON.stringify(p);
    setPair(JSON.stringify(p))
  }

  return <div>
    <div>
      <label>Pair </label>
      <input type="checkbox" checked={bPair} onChange={checkBoxPair}></input> 
    </div>
    <div>
      <table>
      {bPair?(
        <tbody>
          <tr>
            <td>
            <button onClick={clickCreatePair}>Create Pair</button> <label>Status:{status}</label>
            </td>
          </tr>

          <tr>
            <td>
              <label>Pair:</label>
            </td>
          </tr>

          <tr>
            <td>
              <textarea id="pair" value={pair} onChange={typingPair}></textarea>
            </td>
          </tr>

          <tr>
            <td>
              <button onClick={clickPair}>Submit</button>
              <Link to='/signup'>Sign Up</Link>
            </td>
          </tr>

        </tbody>
      ):(
        <tbody>
        
          <tr>
            <td>
              <label>Status:{status}</label>
            </td>
          </tr>
          <tr>
            <td>
              <label>Alias:</label>
            </td>
          </tr>
          <tr>
            <td>
              <input value={userName} onChange={typingName}></input>
            </td>
          </tr>

          <tr>
            <td>
              <label>Passphrase:</label>
            </td>
          </tr>
          <tr>
            <td>
              <input value={userPassword} onChange={typingPassword}></input>
            </td>
          </tr>

          <tr>
            <td>
              <button onClick={clickSumbit}>Submit</button><span> | </span>
              <Link to='/signup'>Sign Up</Link><span> | </span>
              <Link to='/recovery'>Recovery</Link>
            </td>
          </tr>

        </tbody>
        )}
      </table>
    </div>
  </div>
}