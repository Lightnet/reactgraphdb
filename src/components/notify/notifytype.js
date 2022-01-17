/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    This for simple call message notifty

*/

//import { useNotifty } from "./notifyprovider.js";
import { Color } from "./notifyprovider.js";

//does not work
/*
export function info(children, autoClose) {
  const { setNotify } = useNotifty(); //cause error
  setNotify({
    color: Color.info,
    children,
    autoClose,
  });
  return;
}

export function Notifysuccess(children, autoClose) {

  const { setNotify } = useNotifty();

  return setNotify({
    color: Color.success,
    children,
    autoClose,
  });
}

export function Notifywarning(children, autoClose) {

  const { setNotify } = useNotifty();

  return setNotify({
    color: Color.warning,
    children,
    autoClose,
  });
}

export function Notifyerror(children, autoClose) {

  const { setNotify } = useNotifty();

  return setNotify({
    color: Color.error,
    children,
    autoClose,
  });
}
*/
export function nInfo(children, autoClose){

  return {
    color: Color.info,
    children,
    autoClose,
  }
}

export function nSuccess(children, autoClose){

  return {
    color: Color.success,
    children,
    autoClose,
  }
}

export function nWarning(children, autoClose){

  return {
    color: Color.warning,
    children,
    autoClose,
  }
}

export function nError(children, autoClose){

  return {
    color: Color.error,
    children,
    autoClose,
  }
}

/*
export {
  nInfo
  , nSuccess
  , nWarning
  , nError
}
*/