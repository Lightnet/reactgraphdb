
import React, { useEffect, useState } from "react";

import { useGun } from "../gun/gunprovider.js";
import SignIn from "./signin";

export default function AuthAccess({children}){

  const {setGunUser} = useGun();

  if(!setGunUser){
    <SignIn />
  }

  return <>{children}</>
}