/**
 * this file is for auth with firebaseRef
 */
import Firebase from 'firebase';
// import buffer from 'buffer';
// import base64 from 'base-64';
import { getInbox } from './fetch';
import localStorage from '../storage/localStorage';
const NEWUSER = 'INVALID_USER';

const FIREBASE = 'https://amber-heat-8849.firebaseio.com/';
export const firebaseRef = new Firebase(FIREBASE);

function processUserEmail(user) {
  if (user.id.indexOf('@daiict.ac.in') > -1) {
    return user;
  } else {
    return {
      id: user.id + '@daiict.ac.in',
      pass: user.pass,
    };
  }
}

function createUser(user) {
  // console.log('creating user', user);
  return new Promise((res, rej) => firebaseRef.createUser({
    email: user.id,
    password: user.pass,
  }, (error, userData) => {
    if (error) {
      switch (error.code) {
        case 'EMAIL_TAKEN':
          console.log('The new user account cannot be created because the email is already in use.');
          break;
        case 'INVALID_EMAIL':
          console.log('The specified email is not a valid email.');
          break;
        default:
          console.log('Error creating user:', error);
      }
      return rej(error);
    } else {
      console.log('Successfully created user account with uid:', userData.uid);
      return res(userData);
    }
  }));
}
function setKeys(user, uid, ref) {
  // console.log('setting keys');
  ref.child('users').child(uid).set({
    collegeId: user.id,
    key: user.pass,
  }, e => {
    console.log(e);
  });
}
function readUserData(authData) {
  console.log('reading user', authData);
  return new Promise((res, rej) => {
    firebaseRef.child('users').child(authData.uid).once('value', (snapshot) => {
      console.log(snapshot.val());
      res(snapshot.val());
    }, (errorObject) => {
      console.log(errorObject);
      rej(errorObject);
    });
  });
}
function authenticateUser(user) {
  // console.log('authenticating user');
  return new Promise((resolve, reject) => {
    return firebaseRef.authWithPassword({
      email: user.id,
      password: user.pass,
    }, (error, authData) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      try {
        localStorage.setItem('id', user.id);
        localStorage.setItem('pass', user.pass);
        localStorage.setItem('token', authData.token);
      } catch (e) {
        if (e) {
          return reject(e);
        }
      }
      console.log('login success');
      return resolve(authData);
    });
  });
}

export function isLoggedIn() {
  const id = localStorage.getItem('id');
  const pass = localStorage.getItem('pass');
  const token = localStorage.getItem('token');
  Promise.all([id, pass, token]).then(data => {
    return { id: data[0], pass: data[1], token: data[2] };
  });
}
export function login(user) {
  const safeUser = processUserEmail(user);
  const promise = Promise.resolve(safeUser);
  return promise.then(authenticateUser)
  .catch(error => {
    if (error.code === NEWUSER) {
      return getInbox(safeUser)
            .then(createUser.bind(this, safeUser))
            .then(authenticateUser.bind(this, safeUser));
    } else {
      throw error;
    }
  });
    // .then(readUserData);
  // return ;
}
