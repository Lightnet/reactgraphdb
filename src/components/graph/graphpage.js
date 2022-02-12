/*
  LICENSE: MIT
  Created by: Lightnet

  Information: 
    Look into the gun._.graph

    Loop overload when using setGraph(item=>[...item,{key:key,value:_graph[key]} ]) that more then +200 query

    Bugs: 
    -Key id if same for child down error 
    -when used await gun.get('').get('').once().then(); It does not load after children down.
*/
// https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
// https://stackoverflow.com/questions/52699646/react-redux-app-invalid-attempt-to-spread-non-iterable-instance-issue

import React, { useEffect, useState } from "react";
import { useGun } from "../gun/gunprovider.js";

function GunGraph({props,gunKey,gunValue,_gun}){

  const {gun} = useGun();
  const [isDisplayJson, setIsDisplayJson] = useState(false);
  const [gValue,setGValue] = useState({});
  const [gKey,setGKey] = useState('');
  const [gunNode,setGunNode] = useState({});
  const [gunObject,setGunObject] = useState(null);
  const [jsonObject,setJsonObject] = useState([]);

  const [isOnce, setIsOnce] = useState(false);


  useEffect(()=>{
    //console.log('CHECKING::..')
    /*
    if(gunKey){
      setGKey(gunKey);
      const _g = gun.get(gunKey);
      setGunNode(_g);
    }
    */
    
    if((gunKey != null)&&(_gun == null)){
      //console.log('TOP')
      let _g = gun.get(gunKey);
      setGunNode(_g);
    }else{
      //console.log('BRANCH')
      let _g = _gun.get(gunKey);
      setGunNode(_g);
    }
    
  },[gunKey,_gun])

  //useEffect(()=>{
    //if(_gun){
      //setGunNode(_gun)
    //}
  //},[_gun])

  useEffect(()=>{
    if(gunValue){
      setGValue(JSON.stringify(gunValue))
    }
  },[gunValue])

  async function displayJson(){
    let b = !isDisplayJson;
    setIsDisplayJson(b);
    //console.log("displayJson",b);
    if(b){
      console.log(gunNode);
      gunNode.once(obj=>{
        console.log(typeof obj)
        if(!obj){
          setGValue('null')
          return;
        }
        console.log(obj)
        setGunObject(obj)
        if(typeof obj == 'object'){
          setGValue(JSON.stringify(obj))
        }else{
          setGValue(String(obj))
        }
      })

      /*
      let obj = await gunNode.once().then(); // does not work when loop in children or load correctly
      //console.log("OBJ: ",obj)
      console.log(obj)
      setGunObject(obj)
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          console.log(key);
          //__graph.push({key:key,value:obj[key]});
        }
      }
      console.log(typeof obj);
      if(typeof obj == 'object'){
        setGValue(JSON.stringify(obj))
      }else{
        setGValue(obj)
      }
      */
    }
  }

  async function clickIsOnce(){
    let b = !isOnce;
    setIsOnce(b);
    if(b){
      gunNode.once(obj=>{
        if(!obj){
          return;
        }
        console.log(obj);
        console.log(typeof obj);
        setGunObject(obj)
        if(typeof obj == 'object'){
          let __graph=[]
          for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
              //console.log(key);
              __graph.push({key:key,value:obj[key]});
            }
          }
          setJsonObject(__graph);
        }else{
          setJsonObject(item=>[...item,{key:obj}]);
        }
      })

      /*
      let obj = await gunNode.once().then();
      setGunObject(obj)
      let __graph=[]
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          //console.log(key);
          __graph.push({key:key,value:obj[key]});
        }
      }
      setJsonObject(__graph);
      */
    }
  }

  function viewGValue(){
    if(isDisplayJson){
      return <textarea value={gValue} readOnly></textarea>
    }
    return <></>
  }

  function viewOnce(){
    if(isOnce){
      return jsonObject.map((item)=>{
        //return <GunGraph key={item.key} gunKey={gKey+"/"+item.key} _gun={gunNode} />
        return <GunGraph key={item.key} gunKey={item.key} _gun={gunNode} />
      })
    }
    return <></>
  }

  async function clickLog(){
    //console.log(gunValue);
    if(!gunObject){
      let obj = await gunNode.once().then();
      setGunObject(obj)
      console.log(obj);
      return;
    }
    console.log(gunObject);
  }

  return (<div {...props}>
    <label>Key:{gunKey}</label> 
    <button onClick={displayJson}>View: {String(isDisplayJson)}</button> 
    <button onClick={clickIsOnce}>Once: {String(isOnce)}</button> 
    <button onClick={clickLog}>Log</button>
    <br />
    {viewGValue()}
    {viewOnce()}
    
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

  return <>
    <button onClick={clickGetGraph}> Graph </button>
    <button onClick={clickGraphDB}> Graph DB </button>
    <div>
      {
        graph.map((item)=>{
          //console.log(item);
          return (<GunGraph key={item.key} gunKey={item.key} ></GunGraph>)
        })
      }
    </div>
  </>
}