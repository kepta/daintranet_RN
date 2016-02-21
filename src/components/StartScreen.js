import React, { View, StyleSheet } from 'react-native';

let styles;

export default () => <View style={styles.container}/>;

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
});
