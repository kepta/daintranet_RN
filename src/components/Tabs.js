import React, {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableHighlight,
} from 'react-native';
// import Base from '../Base';
// import { HomeIcon, SearchIcon, HotIcon } from '../Icons';
// import { primaryTextWhite, greyShade, baseColor } from '../../helper/colorPallete.js';
// import { AppBar, TextField, Toolbar, IconButton, ToolbarGroup, ListDivider, Paper } from 'material-ui';
// import { BackButton, CloseGrey } from '../Icons';

let style;
export default class Tab extends React.Component {

  handleClick(type) {
    this.props.handleTabChange({
      search: type === 'search',
      hot: type === 'hot',
      home: type === 'home',
      searching: false,
    });
  }
  // feedBack() {
  //   alert('This feature is in progress. If you have any bugs, feature request, suggestion. Please fill the form.');
  //   window.open('https://docs.google.com/forms/d/1W7VEWJMFNqizlQ1dw4l93xWxyXGVv5CoQtHYUhZ8gn8/viewform?usp=send_form', '_blank');
  // }
  render() {
    // const style = this.style();
    return (
      <View style={style.main}>
        <TouchableHighlight style={style.tab} onPress={this.handleClick.bind(this, 'search')}>
          <Text>
            Search
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={style.tab} onPress={this.handleClick.bind(this, 'hot')}>
          <Text>
            Hot
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={style.tab} onPress={this.handleClick.bind(this, 'home')}>
          <Text>
            Intranet
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

style = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
  },
  tab: {
    width: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // color: 'white',
    // flexGrow: '1',
    backgroundColor: 'gray',
  },
});
