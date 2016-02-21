import React from 'react-native';

import Login from './Login';
import Loading from './Loading';
import MainWrapper from './MainWrapper';
import StartScreen from './StartScreen';

import { login } from '../network/auth';
import { fetchIntranet } from '../network/fetch';

import localStorage from '../storage/localStorage';
import { getCachedState, saveState } from '../storage/state';

import { LOGGED_IN, LOGGED_OUT, LOGGING, LOGIN_ERROR, START_SCREEN } from '../appState/actions';

function getCachedData(props) {
  getCachedState()
  .then((data) => {
    console.log('cached', data);
    if (!data) {
      props.setLogout();
    } else {
      login(data)
      .catch(e => {
        console.log(e);
        localStorage.setItem('LOGIN_ERROR', e.code);
        props.setLoginError();
      });
      props.setLoggedIn({ id: data.id, pass: data.pass, token: data.token, appState: data.appState });
    }
  })
  .catch(e => {
    props.setLogout();
  });
}

function authenticate(props) {
  login(props.user)
  .then((authData) => {
    return {
      id: authData.password.email,
      pass: props.user.pass,
      token: authData.token,
    };
  })
  .catch(e => {
    localStorage.setItem('LOGIN_ERROR', e.code);
    props.setLoginError();
  })
  // fetchIntranet returns { ...arguments, intranet: {intranet stuff}}
  .then(fetchIntranet)
  .then(saveState)
  .then((data) => {
    console.log('saved it', data);
    props.setLoggedIn(data);
  })
  .catch(err => {
    if (err) {
      try {
        console.error(err);
        localStorage.setItem('LOGIN_ERROR', err.code); // TODO: err message ?
      } catch (e) {
        if (e) {
          console.error(e);
        }
      }
      props.setLoginError();
    }
  });
}
export default function (props, state) {
  const selectProps = {
    loginState: props.login.STATUS,
    setLogout: props.setLogout,
    setLogging: props.setLogging,
    setLoggedIn: props.setLoggedIn,
    setLoginError: props.setLoginError,
    user: {
      id: props.login.ID,
      pass: props.login.PASS,
      token: props.login.TOKEN,
    },
    appState: props.login.APPSTATE,
  };
  console.log('props', props.login);
  switch (props.login.STATUS) {

    case START_SCREEN:
      getCachedData(props);
      return <StartScreen/>;

    case LOGGED_OUT:
    case LOGIN_ERROR:
      return (<Login {...selectProps}/>);

    case LOGGED_IN:
      return (
        <MainWrapper {...selectProps}
          actionLoggedIn={this.props.setLoggedIn}
          setLoginError={this.props.setLoginError}
        />
    );

    case LOGGING:
      authenticate(selectProps);
      return (
        <Loading/>
      );

  }
}
