/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/8419354/get-html5-localstorage-keys
// https://stackoverflow.com/questions/15748656/javascript-reduce-on-object

import React, { useEffect, useState } from "react"

export default function StoragePage(){

  const [storageList, setStorageList] = useState([]);

  useEffect(()=>{

    Object.keys(localStorage).reduce(function(obj, str) { 
      console.log(str)
      console.log(obj)
      //obj[str] = localStorage.getItem(str);
      setStorageList(item=>[...item,str])
      return obj
    }, {});
  },[])

  useEffect(()=>{
    console.log(storageList)
  },[storageList])

  function getList(){
    console.log(storageList);
  }

  return (<>
    <p> Local Storage. Gun use local storage and it can be config. But other setting like theme will be needed. </p>
    <label> Theme Storage </label><br />
    <label> Gun Storage </label><br />
    <button onClick={getList}> Storage List </button><br />
    {
      storageList.map((item)=>{
        return <div key={item}>
          <label>Key: {item}</label>
        </div>
      })
    }
  </>)
}