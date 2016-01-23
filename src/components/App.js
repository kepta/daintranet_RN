// 'use strict';

// import Render from './AppRender';

import React from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../appState/actions';
import Render from './AppRender';
function mapStateToProps(state) {
  return { login: state.login, windows: state.windows };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

class Index extends React.Component {
  render() {
    return Render.call(this, this.props, this.state);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
