// import { AppBar, TextField, Toolbar, IconButton, ToolbarGroup, ListDivider, Paper } from 'material-ui';
// import { BackButton, CloseGrey } from '../Icons';
import React, {
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';
import Tabs from './Tabs';
// import SearchBar from './SearchBar';
import MiscBar from './MiscBar';

let styles;

export default class Viewer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        search: false,
      };
      this._bind('handleSearchChange', 'clearSearch');
      this.lastQuery = undefined;
    }
    _bind(...methods) {
      methods.forEach(method => this[method] = this[method].bind(this));
    }
    handleSearchChange() {
      const value = this.refs.search.getValue();
      if (value.length >= 4) {
        clearTimeout(this.lastQuery);
        this.lastQuery = setTimeout(() => this.props.setSearch(value), 300);
        this.setState({
          search: true,
        });
      }
    }
    clearSearch() {
      clearTimeout(this.lastQuery);
      this.lastQuery = null;
      this.props.setSearch(null);
      this.refs.search.setValue('');
      this.setState({
        search: false,
      });
    }
    handleToggle() {
      // console.log('touch tap');
    }
    render() {
      return (
        <View>
          <View style={styles.appbar}>
            <Text>
              DAINTRANET
            </Text>
          </View>
          <Tabs
            search={this.props.search}
            home={this.props.home}
            hot={this.props.hot}
            searching={this.props.searching}
            handleTabChange={this.props.handleTabChange}
          />
          <MiscBar
            setSearch={this.props.setSearch}
            search={this.props.search}
            home={this.props.home}
            hot={this.props.hot}
            goBack={this.props.goBack}
            pathString={this.props.pathString}
            goToStringPath={this.props.goToStringPath}
          />
        </View>
      );
    }
}

styles = StyleSheet.create({
  backButton: {
    position: 'relative',
    left: -20,
  },
  appbar: {
    marginTop: 30,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    // color: 'white',
  },
});
