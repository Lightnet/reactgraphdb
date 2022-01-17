/*
  LICENSE: MIT
  Created by: Lightnet

  Information:

*/

import React, { useState } from "react"
import EModal from "./emodal.js";

export default function ModalTest(){

  const [isOpen,setIsOpen] = useState(false);

  const [message, setMessage] = useState(<></>);

  function closeModal(){
    setIsOpen(false);
  }

  function openModal(){
    setIsOpen(true);
  }

  return <>
    <button onClick={openModal}> Open </button>
    <button onClick={closeModal}> Close </button>
    <EModal isOpen={isOpen} closeModal={closeModal}>
      <label> Hello World </label>

    </EModal>
  </>
}