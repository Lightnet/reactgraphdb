/*
  LICENSE: MIT
  Created by: Lightnet

  information:
    For over lay message top index-z

*/

import React, { useEffect, useState } from "react";
import styles from "./container.module.css";


export default function NotifyContainer({children}){

  const [portalID,setPortalID] = useState('notifyContainer');

  return <div id={portalID} className={styles.container}>
    {children}
  </div>
}