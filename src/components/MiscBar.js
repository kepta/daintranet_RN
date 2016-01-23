import React, {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableHighlight,
} from 'react-native';
// import Base from '../Base';
// import { primaryTextWhite, greyShade, toolbarGray, darkGray } from '../../helper/colorPallete.js';
// import { IconButton } from 'material-ui';
// import { CloseOther, BackButton } from '../Icons';
// import SearchBar from './SearchBar';
import LocationBar from './LocationBar';

let styles;
export default class MiscBar extends React.Component {
  constructor(props) {
    super(props);
    this._bind('handleSearchChange', 'clearSearch');
    this.searchRef = null;
    this.state = {
      clear: false,
    };
  }
  _bind(...methods) {
    methods.forEach(method => this[method] = this[method].bind(this));
  }
  handleSearchChange(event) {
    // return console.log(e.target.value);
    const value = event.target.value;
    // this.searchRef = event.target;
    const delay = 550;
    if (value.length >= 3) {
      clearTimeout(this.lastQuery);
      this.lastQuery = setTimeout(() => {
        this.props.setSearch(value);
        console.log('good');
        this.setState({
          searchString: value,
        });
      }, delay);
    }
  }
  // onBlur(event) {
  //
  // }
  clearSearch() {
    this.setState({
      clear: true,
    });
  }
  clearDone() {
    this.setState({
      clear: false,
    });
  }
  render() {
    // const style = this.style();
    let whatToshow;
    let whatIcon;

    // if (this.props.search) {
    //   whatToshow = (
    //     <SearchBar
    //       handleSearchChange={this.handleSearchChange}
    //       isMobile={this.props.isMobile}
    //     />
    //   );
    // }
    // if (this.props.home) {
    //   whatIcon = <BackButton style={{ fill: darkGray }}/>;
    //   whatToshow = <LocationBar goToStringPath={this.props.goToStringPath} pathString={this.props.pathString} />;
    // }
    return (
      <View style={styles.main}>
        <TouchableHighlight style={styles.leftButton} onPress={this.props.goBack}>
            <Text>
                Button
            </Text>
        </TouchableHighlight>
        <View style={styles.container}>
                <LocationBar goToStringPath={this.props.goToStringPath} pathString={this.props.pathString} />
        </View>
      </View>
    );
  }
}

styles = StyleSheet.create({
  main: {
    height: 50,
    flexDirection: 'row',
    flex: 1,
    // backgroundColor: toolbarGray,
  },
  leftButton: {
    // position: 'relative',
    alignSelf: 'center',
    marginLeft: 1,
    // top: '10px',
  },
  container: {
    flex: 8,
  },
});
