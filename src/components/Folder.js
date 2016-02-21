import React, {
  StyleSheet,
  View,
  Text,
  Platform,
  ScrollView,
} from 'react-native';
// import Base from '../Base';
// import { List, RefreshIndicator } from 'material-ui';
// import { flexCenter } from '../../Flex';
import { formQuery } from '../network/fetch';
// import ListItem from './IconItems';
import ListItemMobile from './ListItem.mobile';
// import { increment } from '../network/firebase';
let style;
export default class Folder extends React.Component {
    constructor(props) {
      super(props);
      // this.style = this.style();
      this._bind('displayStructure', 'goForward', 'showAttachment');
    }
    _bind(...methods) {
      methods.forEach(method => this[method] = this[method].bind(this));
    }
    goForward(item) {
      // if (this.props.isMobile) {
        // setTimeout(() => this.props.goForward(item), 400);
      // } else {
      this.props.goForward(item);
      // }
    }
    showAttachment(path, file) {
      let url = path.join('/');
      url = url + '/'+ file;
      this.props.showAttachment(url);
    }
    displayStructure(obj) {
      const params = {
        items: obj,
        goForward: this.goForward,
        showAttachment: this.showAttachment,
        pathString: this.props.pathString,
        path: this.props.path,
        isMobile: this.props.isMobile,
      };
      // if (this.props.isMobile) {
      return <ListItemMobile {...params} />;
      // }
      // return (<ListItem {...params}/>);
      // });
    }
    render() {
      const lastUpdated = (
        <Text>
          Last updated &nbsp;{this.props.timeStamp} &nbsp; ago
        </Text>
      );
      // const refresh = (
      //   <RefreshIndicator size={40} left={5} top={5} style={{ position: 'relative' }} status="loading" />
      // );
      const statusDisplay = lastUpdated;
      return (
          <View style={style.main}>
            <View style={style.updated}>
              {statusDisplay}
            </View>
            <View style={style.list}>
              {this.displayStructure(this.props.location)}
            </View>
          </View>
      );
    }
}

style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  updated: {
    flex: 0,
  },
  list: {
    flex: 1,
  },
});
