import React, {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import Dimensions from 'Dimensions';
const windowSize = Dimensions.get('window');
let styles;
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: undefined,
      pass: undefined,
    };
    this._handleLogin = this._handleLogin.bind(this);
  }
  _handleLogin() {
    this.props.setLogging({ id: this.state.id, pass: this.state.pass });
  }
  render() {
    console.log('render');
    return (
      <View style={styles.container}>
          <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
          <View style={styles.header}>
              <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
          </View>
          <View style={styles.inputs}>
              <View style={styles.inputContainer}>
                  <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                  <TextInput
                    style={[styles.input, styles.whiteFont]}
                    placeholder="Username"
                    placeholderTextColor="#FFF"
                    autoCorrect={false}
                    ref="user"
                    onChangeText={(id) => this.setState({id})}
                    value={this.state.id}
                  />
              </View>
              <View style={styles.inputContainer}>
                  <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
                  <TextInput
                    password
                    style={[styles.input, styles.whiteFont]}
                    placeholder="Pasword"
                    placeholderTextColor="#FFF"
                    returnKeyType="done"
                    ref="pass"
                    autoCorrect={false}
                    onChangeText={(pass) => this.setState({pass})}
                    value={this.state.pass}
                  />
              </View>
              <View style={styles.forgotContainer}>
                  <Text style={styles.greyFont}>I changed my webmail password</Text>
              </View>
          </View>
          <TouchableHighlight onPress={this._handleLogin}>
            <View style={styles.signin}å>
                <Text style={styles.whiteFont}>Sign In</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.signup}>
              <Text style={styles.greyFont}>Login using your webmail account</Text>
          </View>
        </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
  },
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
    backgroundColor: 'transparent',
  },
  mark: {
    width: 150,
    height: 150,
  },
  signin: {
    backgroundColor: '#FF3366',
    padding: 20,
    alignItems: 'center',
  },
  signup: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.15,
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    flex: 0.25,
  },
  inputPassword: {
    marginLeft: 15,
    width: 20,
    height: 21,
  },
  inputUsername: {
    marginLeft: 15,
    width: 20,
    height: 20,
  },
  inputContainer: {
    padding: 10,
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent',
  },
  input: {
    position: 'absolute',
    left: 61,
    top: 12,
    right: 0,
    height: 20,
    fontSize: 14,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    padding: 15,
  },
  greyFont: {
    color: '#D8D8D8',
  },
  whiteFont: {
    color: '#FFF',
  },
});
