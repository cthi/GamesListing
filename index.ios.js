'use strict'

import React, {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} from 'react-native';

import GameList from './GameList';

class GamesListing extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.rootContainer}
        initialRoute={{
          title: 'Games',
          component: GameList,
        }}
      />
    );
  }
}

var styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

AppRegistry.registerComponent('GamesListing', () => GamesListing);

