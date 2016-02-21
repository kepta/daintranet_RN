import React, {
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';
// import Base from '../Base';
// import { Avatar, ListDivider } from 'material-ui';
// import { FolderIcon, PdfIcon } from '../Icons';
import { readTopFolders } from '../network/firebase';
// import Loading from '../TroubleLoading';
import ListItem from './ListItem.mobile';

// import ListItem from './ListItem';

export default class HotItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: undefined,
      };
      this._bind('goForward', 'showAttachment');
      console.log(props.user);
      readTopFolders(props.user).then((obj) => {
        console.log(obj);
        const hot = Object.keys(obj).map((item, key) => {
          return {
            path: item.replace(/\^/g, '.').replace(/\*/g, '/'),
            count: obj[item],
          };
        }).sort((a, b) => {
          return b.count - a.count;
        });
        this.setState({
          data: hot,
        });
      });
    }
    _bind(...methods) {
      methods.forEach(method => this[method] = this[method].bind(this));
    }
    goForward(x, item) {
      this.props.goToStringPath(item);
    }
    showAttachment(x) {
      this.props.showAttachment(x);
    }
    render() {
      const data = this.state.data ?
        (<ListItem
          items={this.state.data}
          goForward={this.goForward}
          showAttachment={this.showAttachment}
          fromSearch
        />) : <Text>Loading</Text>;
      return (
        <View>
          {data}
        </View>
      );
    }
}
