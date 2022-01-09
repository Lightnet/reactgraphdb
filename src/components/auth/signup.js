/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useGun } from "../gun/gunprovider.js";

export default function SignUp(){
  const {gun} = useGun();

  const [status, setStatus] = useState('');

  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

  function typingName(event){
    setUserName(event.target.value);
  }

  function typingPassword(event){
    setUserPassword(event.target.value);
  }

  async function clickSumbit(){
    console.log(userName);
    console.log(userPassword);
    console.log(gun);

    let user = gun.user();
    //user.create('alice', 'unsafepassword', ack => {
    user.create(userName, userPassword, ack => {
      // Causes ReferenceError: CryptoKey is not defined.
      console.log(ack)
      if(ack.err){
        setStatus(ack.err);
        //if(ack.err=="User already created!"){
          //console.log('EXIST');
          //setStatus(ack.err);
        //}
      }
      if(ack.ok){
        console.log('PASS')
        setStatus("CREATE");
      }
    })

    /*
    let data = await useFetch('api/signup',{
      method:'POST',
      body:JSON.stringify({
        alias: userName
        , passphrase: userPassword
      })
    });
    console.log(data);
    */
  }

  return <div>
    <div>
     <label>Register</label>
    </div>
    <div>
      <table>
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
              <Link to='/'>Home</Link>
              <button onClick={clickSumbit}>Submit</button>
              <Link to='/signin'> Sign In</Link>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
}