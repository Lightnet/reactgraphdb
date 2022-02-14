/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{useState, useEffect} from "react";

export default function ClockTime(){

  const [time, setTime] = useState(new Date().toLocaleString());
  const [intervalID, setIntervalID] = useState();

  function tick(){
    setTime(new Date().toLocaleString());
  }

  useEffect(()=>{
    let _intervalID=setInterval(
      () => tick(),
      1000
    );
    setIntervalID(_intervalID)

    return ()=>{
      clearInterval(intervalID);
    }
  },[])

  return (<label> {time} </label>)
}