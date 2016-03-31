'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  ToolbarAndroid,
  View,
} from 'react-native';

import GameList from './GameList';

class GamesListing extends React.Component {
  render() {
    return (
      <View
        style={styles.rootContainer}>
        <ToolbarAndroid
          title='Games'
          titleColor='white'
          style={styles.toolbar} />
        <GameList/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  toolbar: {
    height: 56,
    backgroundColor: '#009688',
    elevation: 3,
  },
});
 
AppRegistry.registerComponent('GamesListing', () => GamesListing);

