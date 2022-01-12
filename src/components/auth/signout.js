/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { Link } from "react-router-dom";
//import useFetch from '../components/hook/usefetch';
import { useNavigate } from 'react-router-dom';
import { useGun } from '../gun/gunprovider.js';
import React from 'react';

export default function SignOut(){
  const {gun,setGunUser} = useGun(); //gun.js, user
  const navigate = useNavigate(); // react url

  async function clickSumbit(){
    if(gun){
      //console.log(gun.user())
      await gun.user().leave()
      //console.log(gun.user())
      setGunUser(null); //clear user data
      navigate("/"); //url
    }
  }

  return <div>
    <div>
    <label>Sign Out</label>
    </div>
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <label>Are you sure to logout?</label>
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={clickSumbit}>Sign Out</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
}