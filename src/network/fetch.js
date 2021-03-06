// import Request from 'superagent';
// import { MailParser } from '../mailparser/mailparser';
// import { firebaseRef } from './'
import { firebaseRef, isLoggedIn } from './auth';
// const local = window.location.href.indexOf('localhost');

// const WRONGPASS = 'INVALID_PASSWORD';
// const NEWUSER = 'INVALID_USER';

const PRODUCTON_URL = 'https://bangle.io/api';
import base64 from 'base-64';

// const DEV_URL = 'http://localhost:3000/api';
// const isLocal = window.location.href.indexOf('localhost') > -1;

// export const BASEURL = isLocal? DEV_URL : PRODUCTON_URL;
export const BASEURL = PRODUCTON_URL;
let userFromCollege = false;
let intranet = {};
let timeStamp = null;

function makeGetHeaders(user) {
  return {
    method: 'get',
    headers: new Headers({
      Authorization: 'Basic ' + base64.encode(user.id + ':' + user.pass),
    }),
  };
}
export function getIP() {
  return fetch('https://api.ipify.org?format=json', { method: 'get' })
  .then((resp) => resp.json())
  .then((resp) => {
    try {
      const IP = resp.ip;
      if (IP === '14.139.122.114') {
        console.log('You are using this app inside the college, hurray bandwidth saving : )');
        userFromCollege = true;
      }
    } catch (e) {
      console.error(e);
    }
  }).catch((err) => {
    console.error(err);
  });
}
// getIP();

export function fetchEmail(id, user) {
  return fetch(`${BASEURL}/email/${id}`, makeGetHeaders(user))
    .then(resp => resp.text())
    .then(resp => {
      // const mailparser = new MailParser();
      // mailparser.write(resp);
      // mailparser.end();
      // return new Promise((res) => {
      //   mailparser.on('end', (mailObject) => {
      //     return res(mailObject);
      //   });
      // });
    })
    .catch(e => {
      console.log(e);
    });
}

export function getInbox(user) {
  return fetch(`${BASEURL}/email`, makeGetHeaders(user))
    .then(resp => resp.json())
    .then(resp => resp.m)
    .catch(e => {
      throw e;
    });
}

export function fetchIntranet(user) {
  return new Promise((res, rej) => {
    firebaseRef.child('intranetData/tree').once('value', snap => {
      const resp = JSON.parse(snap.val());
      intranet = resp;
      timeStamp = intranet.time;
      delete intranet.kh_test;
      delete intranet['log.txt'];
      delete intranet['tree.json'];
      delete intranet.time;
      res({ ...user, appState: { ...user.appState, intranet, timeStamp } });
    });
  });
  // return fetch(`${BASEURL}/intranet`, makeGetHeaders(user))
  //   .then(resp => resp.json())
  //   .then(resp => {
  //     intranet = resp;
  //     timeStamp = intranet.timeStamp;
  //     delete intranet.timeStamp;
  //     return { ...user, intranet: { intranet, timeStamp } };
  //   });
}
export function formQuery(path) {
  if (userFromCollege) {
    return `http://10.100.56.13/~daiict_nt01/${path}`;
  }
  return `${BASEURL}/intranet/${isLoggedIn().id}?loc=${path}`;
}

export function fuzzySearch(search) {
  return fetch(`${BASEURL}/find/${search}`, makeGetHeaders({ user: null, id: null }))
    .then(resp => resp.json());
}
