/*
  LICENSE: MIT
  Created by: Lightnet

  Information: 
    Look into the gun._.graph

    Loop overload when using setGraph(item=>[...item,{key:key,value:_graph[key]} ]) that more then +200 query

*/
// https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
// https://stackoverflow.com/questions/52699646/react-redux-app-invalid-attempt-to-spread-non-iterable-instance-issue

import React, { useState } from "react";
import { useGun } from "../gun/gunprovider.js";

export default function GraphPage(){

  const {gun} = useGun();
  const [graph, setGraph] = useState([]);

  function clickGetGraph(){
    console.log(gun);
    console.log(gun._.graph);
    console.log(typeof gun._.graph);
    setGraph(gun._.graph)
    //gun._.graph.map((item)=>{
      //console.log(item)
      //return item;
    //})
    let _graph = gun._.graph;
    //Object.keys(_graph).map(function(key, index) {
      //console.log(key)
      //console.log(_graph[key])
      //_graph[key] *= 2;
    //});
    //setGraph
    let count = 0;
    
    var ownProps = Object.keys( _graph )
    console.log(ownProps.length);

    let __graph=[]
    for (var key in _graph) {
      if (_graph.hasOwnProperty(key)) {
        //_graph[key] *= 2;
        console.log(key);
        __graph.push({key:key,value:_graph[key]});
        //if(key.search('~')){
          //console.log('found');
          //try{
            //__graph.push({key:key,value:_graph[key]});
            //setGraph(item=>[...item,{key:key,value:_graph[key]} ])
            //setGraph(item=>[...item,{key:key} ])
            //setGraph(item=>[...item,{value:_graph[key]} ])
          //}catch(e){
            //console.log(e.message)
          //}
        //}else{
          //console.log('not found');
        //}
      }
    }
    setGraph(__graph);
    /*
    Object.entries(_graph).map(  function(([key, value]), index){
      //console.log(key)
      //console.log(_graph[key])
      //count++;
      console.log(count)
      if(count >200){
        return;
      }
      if(_graph.hasOwnProperty(key)){
        setGraph(item=>[...item,{key:key,value:_graph[key]} ])
      }
    });
    */
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


    </div>
  </>
}