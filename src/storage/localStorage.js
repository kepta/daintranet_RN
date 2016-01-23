import {
  AsyncStorage,
} from 'react-native';

export default class localStorage {
  static getItem(key) {
    return AsyncStorage.getItem(key);
  }
  static setItem(key, value) {
    return AsyncStorage.setItem(key, value);
  }
  static removeItem(key) {
    return AsyncStorage.removeItem(key);
  }
}
