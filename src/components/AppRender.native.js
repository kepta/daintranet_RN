// 'use strict';

// import Screen from './Screen';
// import Formulae from './Formulae';
// import Keyboard from './Keyboard';

import React, {
  StyleSheet,
  View,
  Platform,
  Text,
} from 'react-native';

import Login from './Login';
import Loading from './Loading';
import MainWrapper from './MainWrapper';
import StartScreen from './StartScreen';

import localStorage from '../storage/localStorage';
import { LOGGED_IN, LOGGED_OUT, LOGGING, LOGIN_ERROR, START_SCREEN } from '../appState/actions';

export default function (props, state) {
  console.log(props, state);
  const user = { id: props.login.ID, pass: props.login.PASS };
  const allProps = {
    setLogging: this.props.setLogging,
    loginState: this.props.login.STATUS,
    setLogout: this.props.setLogout,
    user,
    dbPromise: this.props.dbPromise,
  };
  switch (props.login.STATUS) {
    case START_SCREEN:
      return <StartScreen/>;
    case LOGGED_OUT:
    case LOGIN_ERROR:
      return (<Login {...allProps}/>);
    case LOGGED_IN:
      return (
        <MainWrapper {...allProps}
          actionLoggedIn={this.props.setLoggedIn}
          setLoginError={this.props.setLoginError}
        />
    );
    case LOGGING:
      return (
        <Loading {...allProps}
          setLoggedIn={this.props.setLoggedIn}
          setLoginError={this.props.setLoginError}
        />
      );
  }
  // return (
  //   <View style={styles.container}>
  //     <View style={styles.screen} >
  //       <Text>
  //         {Object.keys(localStorage.getItem('kj'))}
  //       </Text>
  //     </View>
  //     <View style={styles.formulae}>
  //       <Text>
  //         Check
  //       </Text>
  //     </View>
  //     <View style={styles.keyboard}>
  //       <Text>
  //         Check
  //       </Text>
  //     </View>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 3,
    flexDirection: 'row',
    alignItems: Platform.OS === 'android' ? 'center' : 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#68cef2',
    padding: 18,
  },
  formulae: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#4c4c4c',
    padding: 20,
  },
  keyboard: {
    height: 420,
  },
});
