/*
  LICENSE: MIT
  Created by: Lightnet
*/
import React, { useState, useEffect } from "react";
import styles from "./modal.module.css";

export default function EModal({isOpen,closeModal,children}) {
  const [ sDisplay, setsDisplay ]=useState('none');

  useEffect(() => {
    console.log('isOpen:',isOpen);
    if(isOpen == undefined){
      return;
    }
    if(isOpen==true){
      setsDisplay("block");  
    }
    if(isOpen==false){
      setsDisplay("none");  
    }
  }, [isOpen]);
  
  /*
  function closeModal(){
    console.log("close?")
    setsDisplay("none");
  }
  */

  return (<>
  <div id="myModal" className={styles.modal} style={{display:sDisplay}}>
    <div className={styles.modalcontent}>
      <span className={styles.close} onClick={closeModal}>&times;</span>
      {children}
    </div>
  </div>
  </>);
}
/*
 <p>Some text in the Modal..</p>
 */