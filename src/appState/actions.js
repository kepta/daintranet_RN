export const LOGGED_IN = 'LOGGED_IN';
export const LOGGING = 'LOGGING';
export const LOGGED_OUT = 'LOGGED_OUT';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const WINDOW_SET = 'WINDOW_SET';
export const START_SCREEN = 'START_SCREEN';

import localStorage from '../storage/localStorage';
import { firebaseRef } from '../network/auth';

/**
 * @function setLogggin
 * causes localStorage to set user
 * and save item
 */
export function setLogging(data) {
  // localStorage.removeItem('user');
  return {
    type: LOGGING,
    ...data,
  };
}
function removePersistence() {
  localStorage.removeItem('id');
  localStorage.removeItem('pass');
  localStorage.removeItem('token');
  localStorage.removeItem('appState');
  firebaseRef.unauth();
}

export function setLogout() {
  removePersistence();
  return {
    type: LOGGED_OUT,
  };
}
export function setLoggedIn(data) {
  if (data) {
    console.log(data);
    return {
      type: LOGGED_IN,
      ...data,
    };
  }
  return {
    type: LOGGED_IN,
  };
}

export function setWindows() {
  return {
    type: WINDOW_SET,
  };
}

export function setLoginError() {
  removePersistence();
  return {
    type: LOGIN_ERROR,
  };
}

export const Actions = {
  setLoggedIn,
  setLogout,
  setLogging,
  setLoginError,
  setWindows,
};
