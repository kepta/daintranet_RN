import React, {
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';

import { login, isLoggedIn } from '../network/auth';
import localStorage from '../storage/localStorage';
import Intranet from './Intranet';
let styles;

export default class MainWrapper extends React.Component {
  render() {
    // console.log(this.props);
    return (
      <View style={styles.container}>
        <Intranet
          user={this.props.user}
        />
      </View>
    );
  }
}


styles = StyleSheet.create({
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
