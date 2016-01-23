import React, {
  StyleSheet,
  View,
  Text,
  Platform,
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
        <View style={style.tab}>
          <Text>
            Search
          </Text>
        </View>
        <View style={style.tab}>
          <Text>
            Hot
          </Text>
        </View>
        <View style={style.tab}>
          <Text>
            Intranet
          </Text>
        </View>
      </View>
    );
  }
}

style = StyleSheet.create({
  main: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
  },
  tab: {
    width: 100,
    flex: 25,
    alignItems: 'center',
    justifyContent: 'center',
    // color: 'white',
    // flexGrow: '1',
    backgroundColor: 'gray',
  },
});
