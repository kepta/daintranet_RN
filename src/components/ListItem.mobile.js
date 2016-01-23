import React, {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
// import Base from '../Base';

// import { FolderIcon, PdfIcon } from '../Icons';

let style;
export default class ListItemMobile extends React.Component {
    render() {
      // const style = this.style();
      const obj = this.props.items;
      const grid = Object.keys(obj);
      const list = grid.map((item, key) => {
        const isFile = obj[item] === 'file';
        // console.log(isFile);
        let showIcon;
        if (this.props.path.length > 2) {
          showIcon = <View style={style.icon}>{isFile ? <Text style={{ backgroundColor: '#ff8a65' }}>PDF</Text> : <Text style={{ backgroundColor: '#ffcc80' }}>Doc</Text>}</View>;
        } else {
          showIcon = null;
        }
        return (
          <TouchableHighlight
            key={key}
            className="list-mobile"
            style={style.main}
            onPress={ isFile ?
            this.props.showAttachment.bind(this, this.props.pathString, item)
          : this.props.goForward.bind(this, item)}
          >
            <View style={style.content}>
              {showIcon}
              <Text>{item}</Text>
            </View>
          </TouchableHighlight>
        );
      });
      // list.push(<div key={9999} style={style.main}/>);
      // list.push(<div key={9998} style={{ ...style.main, borderBottom: 'solid 0px' }}/>);
      return (
        <ScrollView
          automaticallyAdjustContentInsets
          scrollEventThrottle={200}
          style={style.scrollView}
          contentContainerStyle={style.contentContainerStyle}
        >
          {list}
        </ScrollView>
      )
    }
}

style = StyleSheet.create({
  main: {
    paddingLeft: 30,
    height: 68,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    // borderBottom: 'solid 1 #e0e0e0',
  },
  scrollView: {
    backgroundColor: '#6A85B1',
    flex: 11,
  },
  contentContainerStyle: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 7,
  },
});
