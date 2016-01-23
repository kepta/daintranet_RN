import React, {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
// import Base from '../Base';
// import { primaryTextWhite, greyShade, toolbarGray, darkGray } from '../../helper/colorPallete.js';
// import { TextField } from 'material-ui';
// import { CloseOther, PdfIcon } from '../Icons';
let style;
export default class LocationBar extends React.Component {
  handleClick(key) {
    return this.props.goToStringPath(this.props.pathString.slice(0, key+1).join('/'));
  }
  render() {
    const locations = this.props.pathString.map((loc, key) => {
      return (
        <TouchableHighlight key={key}
          style={style.other}
          onPress={this.handleClick.bind(this, key)}>
          <Text>{loc}</Text>
         </TouchableHighlight>
       );
    });
    return (
      <View style={style.main}>
        {locations}
      </View>
    );
  }
}

style= StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  other: { flex: 1, flexDirection: 'row' },
});
