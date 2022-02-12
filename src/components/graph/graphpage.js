/*
  LICENSE: MIT
  Created by: Lightnet

  Information: 
    Look into the gun._.graph

    Loop overload when using setGraph(item=>[...item,{key:key,value:_graph[key]} ]) that more then +200 query

*/
// https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
// https://stackoverflow.com/questions/52699646/react-redux-app-invalid-attempt-to-spread-non-iterable-instance-issue

import React, { useEffect, useState } from "react";
import { useGun } from "../gun/gunprovider.js";

function GunGraph({props,gunKey,gunValue}){
  const {gun} = useGun();
  const [isDisplayJson, setIsDisplayJson] = useState(false);
  const [gValue,setGValue] = useState('');

  useEffect(()=>{
    if(gunValue){
      setGValue(JSON.stringify(gunValue))
    }
  },[gunValue])

  function displayJson(){
    setIsDisplayJson(state=>!state);
  }

  function viewGValue(){
    if(isDisplayJson){
      return <textarea value={gValue} readOnly>
      </textarea>
    }
    return <></>
  }

  function clickLog(){
    console.log(gunValue);
  }

  return (<div {...props}>
    <label>Key:{gunKey}</label> 
    <button onClick={displayJson}>View</button>
    <button onClick={clickLog}>Log</button>
    <br />
    {viewGValue()}
  </div>)
}

export default function GraphPage(){

  const {gun} = useGun();
  const [graph, setGraph] = useState([]);

  useEffect(()=>{
    if(gun){
      let _graph = gun._.graph;
      let __graph=[]
      for (let key in _graph) {
        if (_graph.hasOwnProperty(key)) {
          //_graph[key] *= 2;
          //console.log(key);
          __graph.push({key:key,value:_graph[key]});
        }
      }
      setGraph(__graph);
    }
  },[])

  function clickGetGraph(){
    console.log(gun);
    console.log(gun._.graph);
    console.log(typeof gun._.graph);
  }

  function clickGraphDB(){
    console.log(graph)
  }

  function clickQuery1(){
    gun.get('undefinedC5oSKZIQgvC02A3tPXVno4CdVAuRwnWK/message/1643000425').once((ack)=>{
      console.log(ack);
    });
  }
  return <>
    <button onClick={clickGetGraph}> Graph </button>
    <button onClick={clickGraphDB}> Graph DB </button>
    <button onClick={clickQuery1}> Test1 </button>
    <div>
      {
        graph.map((item)=>{
          //console.log(item);
          return (<GunGraph key={item.key} gunKey={item.key} gunValue={item.value}>
          </GunGraph>)
        })
        /*
        graph.map((item)=>{
          console.log(item);
          return (<div key={item.key}>
            <label>Key:{item.key}</label><br />
            
          </div>)
        })
        */
      }

    </div>
  </>
}