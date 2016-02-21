import React, {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import ProgressBar from 'react-native-progress-bar';

// import { login, isLoggedIn } from '../network/auth';
// import localStorage from '../storage/localStorage';

let styles;
export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props.user);
    this.state = {
      progress: 0,
    };
    this.timeout = null;
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  render() {
    this.timeout = setTimeout(() => {
      this.setState({ progress: this.state.progress + (0.1 * Math.random()) });
    }, 1000);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Loading !!
        </Text>
        <Text style={styles.instructions}>
          Going to cafe
        </Text>
        <Text style={styles.instructions}>
          Grabbing some vadas
        from padma kamal
        </Text>
        <ProgressBar
          fillStyle={{}}
          backgroundStyle={{ backgroundColor: '#cccccc', borderRadius: 2 }}
          style={{ marginTop: 10, width: 300 }}
          progress={this.state.progress}
        />
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
