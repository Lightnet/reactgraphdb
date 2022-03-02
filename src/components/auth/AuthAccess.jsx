
import React, { useEffect, useState } from "react";

import { useGun } from "../gun/GunProvider.jsx";
import SignIn from "./SignIn.jsx";

export default function AuthAccess({children}){

  const {setGunUser} = useGun();

  if(!setGunUser){
    <SignIn />
  }

  return <>{children}</>
}