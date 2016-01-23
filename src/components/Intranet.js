import React, {
  StyleSheet,
  View,
  Text,
  Platform,
  LinkingIOS,
} from 'react-native';
import IntranetDumb from './Intranet.dumb';
// import { CircularProgress } from 'material-ui';
import { fetchIntranet, fuzzySearch, formQuery } from '../network/fetch';
import ParseDate from '../helper/parseDate';
// import { increment } from '../network/firebase';
import ProgressBar from 'react-native-progress-bar';

export default class Intranet extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        tree: null,
        path: [],
        pathString: [],
        timeStamp: null,
        previous: null,
        searchResult: false,
        searching: false,
        search: false,
        home: true,
        hot: false,
        progress: 0,
      };
      this._bind('getDirectoryTree', 'goForward', 'goBack',
                'setSearch', 'goToStringPath', 'showAttachment',
                'handleTabChange');
    }
    componentDidMount() {
      this.timeout = setTimeout(() => {
        this.setState({ progress: this.state.progress + (0.4 * Math.random()) });
      }, 1000);
      this.getDirectoryTree();
    }
    getDirectoryTree() {
      // console.log(this.props);
      fetchIntranet(this.props.user).then((res, rej) => {
        if (rej) {
          // TODO: need to work on error, to let use press retry in case of fail
          return console.log(rej);
        }
        // console.log(res);
        this.setState({
          tree: res.intranet,
          path: new Array(res.intranet),
          timeStamp: ParseDate.timeSince(res.timeStamp),
        });
      });
    }

    goToStringPath(pathArg) {
      const pathString = pathArg.split('/');
      const path = [this.state.tree];
      pathString.forEach((subDir) => {
        path.push(path[path.length - 1][subDir]);
      });
      this.setState({
        path,
        pathString,
        searching: false,
        search: false,
        home: true,
        hot: false,
      });
    }
    handleTabChange(type) {
      this.setState(type);
    }
    setSearch(search) {
      this.setState({
        searching: true,
      });
      fuzzySearch(search).then((resp, err) => {
        // TODO if you press cancel while search is going
        if (err && this.state.search) {
          console.log(err);
          this.setState({
            searching: false,
            searchResult: null,
          });
        }
        if (resp && this.state.search) {
          this.setState({
            searchResult: resp,
            searching: false,
          });
        }
      });
    }
    goForward(location) {
      const tempArray = this.state.path.slice(0);
      const tempPathString = this.state.pathString.slice(0);
      tempPathString.push(location);
      tempArray.push(this.state.path[this.state.path.length - 1][location]);
      if (tempPathString.length === 3) {
        // @recording: only increment if a subfolder inside prof
        // increment(tempPathString.join('*').replace(/\./g, '^'), this.props.user);
      }
      this.setState({
        path: tempArray,
        pathString: tempPathString,
        search: false,
        home: true,
        hot: false,
        searching: false,
      });
    }
    _bind(...methods) {
      methods.forEach(method => this[method] = this[method].bind(this));
    }
    showAttachment(path, file) {
      LinkingIOS.openURL(formQuery(path));
      // increment(path.replace(/\//g, '*').replace(/\./g, '^'), this.props.user);
    }
    goBack() {
      if (this.state.path.length === 1) return;
      const tempArray = this.state.path.slice(0, this.state.path.length - 1);
      const tempPathString = this.state.pathString.slice(0, this.state.pathString.length - 1);
      this.setState({
        path: tempArray,
        pathString: tempPathString,
        search: false,
        home: true,
        hot: false,
      });
    }
    render() {
      const progress = (
        <View style={{ marginTop: 500 }}>
          <View>
            <Text>Hello its loading</Text>
          </View>
        </View>
      );
      const IntranetDumbRef = (
        <IntranetDumb tree={this.state.tree}
          location={this.state.path[this.state.path.length - 1]}
          goForward={this.goForward}
          path={this.state.path}
          pathString={this.state.pathString}
          goBack={this.goBack}
          timeStamp={this.state.timeStamp}
          searchResult={this.state.searchResult}
          goToStringPath={this.goToStringPath}
          showAttachment={this.showAttachment}
          search={this.state.search}
          searching={this.state.searching}
          home={this.state.home}
          hot={this.state.hot}
          handleTabChange={this.handleTabChange}
          user={this.props.user}
          setSearch={this.setSearch}
        />
      );
      // console.log(!this.state.tree ? progress : IntranetDumbRef)
      return !this.state.tree ? progress : IntranetDumbRef;
    }
}
