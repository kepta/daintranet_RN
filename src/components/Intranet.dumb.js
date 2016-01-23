import React, {
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';
import Appbar from './Appbar';
import Folder from './Folder';
// import SearchResult from './SearchResult';
// import { RefreshIndicator } from 'material-ui';
// import Hot from './Hot';
let styles;
export default class Inbox extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      // return <View><Text>Dumb intranet</Text></View>
      // const style = this.style();
      // const folder = (
      //   <Folder
      //     tree={this.props.tree}
      //     location={this.props.location}
      //     goForward={this.props.goForward}
      //     path={this.props.path}
      //     pathString={this.props.pathString}
      //     timeStamp={this.props.timeStamp}
      //     searching={this.props.searching}
      //     isMobile={this.props.isMobile}
      //     showAttachment={this.props.showAttachment}
      //   />
      // );
      // let whatToshow = folder;
      // if (this.props.hot) {
      //   whatToshow = (
      //     <Hot
      //       user={this.props.user}
      //       goToStringPath={this.props.goToStringPath}
      //       showAttachment={this.props.showAttachment}
      //     />
      //   );
      // } else if (this.props.search && this.props.searching) {
      //   whatToshow = (
      //     <RefreshIndicator size={40} left={5} top={5} style={{ marginTop: '10px', position: 'relative', alignSelf: 'center' }} status="loading" />
      //   );
      // } else if (this.props.search) {
      //   whatToshow = (
      //     <SearchResult
      //       searchResult={this.props.searchResult}
      //       goToStringPath={this.props.goToStringPath}
      //       isMobile={this.props.isMobile}
      //       showAttachment={this.props.showAttachment}
      //     />
      //   );
      // }
      // return (<View><Text>Ya baby</Text></View>);
      return (
        <View style={styles.main}>
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
          </View>
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
