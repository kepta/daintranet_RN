import { combineReducers } from 'redux';
import {
        LOGGED_IN,
        LOGGED_OUT,
        LOGGING,
        LOGIN_ERROR,
        WINDOW_SET,
      } from './actions';
import { isLoggedIn } from '../network/auth';
// import base64 from 'base-64';

const loggedIn = isLoggedIn().then(e => console.log(e));
console.log(loggedIn);

const initialLoginState = loggedIn ? {
  STATUS: LOGGING,
  ID: loggedIn.id,
  PASS: loggedIn.pass,
  TOKEN: loggedIn.token,
} : {
  STATUS: LOGGED_OUT,
  ID: null,
  PASS: null,
  TOKEN: null,
};

const windowsState = {
  email: true,
  intranet: true,
};

function windows(state = windowsState, action) {
  switch (action.type) {
    case WINDOW_SET:
      return Object.assign({}, state, {
        email: action.email,
        intranet: action.intranet,
      });
    default:
      return state;
  }
  return Object.assign({}, state, {
    email: action.email,
    intranet: action.intranet,
  });
}

function login(state = initialLoginState, action) {
  // console.log('here ', action);
  switch (action.type) {
    case LOGGED_IN:
      return Object.assign({}, state, {
        STATUS: action.type,
      });
    case LOGGED_OUT:
      return Object.assign({}, state, {
        STATUS: action.type,
      });
    case LOGGING:
      return Object.assign({}, state, {
        STATUS: action.type,
        ID: action.id,
        PASS: action.pass,
        TOKEN: action.token,
      });
    case LOGIN_ERROR:
      return Object.assign({}, state, {
        STATUS: action.type,
      });
    default:
      return state;
  }
}

const reducer = combineReducers({ login, windows });
export default reducer;
