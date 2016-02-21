import { combineReducers } from 'redux';
import {
        START_SCREEN,
        LOGGED_IN,
        LOGGED_OUT,
        LOGGING,
        LOGIN_ERROR,
        WINDOW_SET,
      } from './actions';

const initialLoginState = {
  STATUS: START_SCREEN,
  ID: null,
  PASS: null,
  TOKEN: null,
  APPSTATE: null,
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
  switch (action.type) {
    case LOGGED_IN:
      return Object.assign({}, state, {
        STATUS: action.type,
        ID: action.id,
        PASS: action.pass,
        TOKEN: action.token,
        APPSTATE: action.appState,
      });
    case LOGGED_OUT:
      return Object.assign({}, state, {
        STATUS: action.type,
        ID: null,
        PASS: null,
        TOKEN: null,
        APPSTATE: null,
      });
    case LOGGING:
      return Object.assign({}, state, {
        STATUS: action.type,
        ID: action.id,
        PASS: action.pass,
        TOKEN: action.token,
        APPSTATE: action.appState,
      });
    case LOGIN_ERROR:
      return Object.assign({}, state, {
        STATUS: action.type,
        ID: null,
        PASS: null,
        TOKEN: null,
        APPSTATE: null,
      });
    default:
      return state;
  }
}

const reducer = combineReducers({ login, windows });

export default reducer;
