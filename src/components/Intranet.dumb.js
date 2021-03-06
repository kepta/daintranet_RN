import React, {
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';
import Appbar from './Appbar';
import Folder from './Folder';
import SearchResult from './SearchResult';
import SegmentedView from './SegmentedView';
import Hot from './Hot';
let styles;
export default class Inbox extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      // console.log(this.props);
      // return <View><Text>Dumb intranet</Text></View>
      // const style = this.style();
      const folder = (
        <Folder
          tree={this.props.tree}
          location={this.props.location}
          goForward={this.props.goForward}
          path={this.props.path}
          pathString={this.props.pathString}
          timeStamp={this.props.timeStamp}
          searching={this.props.searching}
          showAttachment={this.props.showAttachment}
        />
      );
      let whatToshow = folder;
      if (this.props.hot) {
        whatToshow = (
          <Hot
            user={this.props.user}
            goToStringPath={this.props.goToStringPath}
            showAttachment={this.props.showAttachment}
          />
        );
      } else if (this.props.search && this.props.searching) {
        whatToshow = (
          <Text>Searching</Text>
        );
      } else if (this.props.search) {
        whatToshow = (
          <SearchResult
            searchResult={this.props.searchResult}
            goToStringPath={this.props.goToStringPath}
            isMobile={this.props.isMobile}
            showAttachment={this.props.showAttachment}
          />
        );
      }
      // return (<View><Text>Ya baby</Text></View>);
      return (
        <View style={styles.main}>
          <SegmentedView/>
          <View style={styles.appbar}>
            <Appbar
              goBack={this.props.goBack}
              setSearch={this.props.setSearch}
              leftNav={this.props.leftNav}
              search={this.props.search}
              home={this.props.home}
              hot={this.props.hot}
              handleTabChange={this.props.handleTabChange}
              pathString={this.props.pathString}
              goToStringPath={this.props.goToStringPath}
            />
          </View>
          {whatToshow}
        </View>
      );
    }
}
styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
  },
  appbar: {
    height: 166,
  },
});
