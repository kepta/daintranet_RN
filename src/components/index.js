import React from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../appState/reducers';
import App from './App';

const store = createStore(reducers);

// store.subscribe();

export default class Index extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}
