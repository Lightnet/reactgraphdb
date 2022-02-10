/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';

export default function ToolSea(){

  const [textBase64,setBase64] = useState('');

  const [work1,setWork1] = useState('');
  const [work2,setWork2] = useState('');

  const [isPair,setIsPair] = useState(false);

  const [enc,setEnc] = useState('');
  const [dec,setDec] = useState('');

  const [sign,setSign] = useState('');
  const [verify ,setVerify] = useState('');




  return <div sytle={{position:'fixed',right:'0px'}}>
    <table>

      <label> Base64 </label> <br />
      <label> Json </label> <br />
      <label> Text </label> <br />

      <label> Work </label> <br />
      <label> Secret </label> <br />
      <label> Content: </label> <br />
      <textarea>
      
      </textarea> <br />
      <label> Sign: </label> <br />
      <textarea>
      
      </textarea> <br />
      <label> Export: </label> <br />
      <textarea>
      
      </textarea> <br />


    </table>
  </div>
}