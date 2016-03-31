'use strict'

import React, {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  View,
  Platform,
} from 'react-native';

class GameCell extends React.Component {
  render() {
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#607DB8')}>
          <View style={styles.container}>
            <Image
              source={{uri: 'http://static.giantbomb.com' + this.props.game.image.small_url}}
              style={styles.circleImg}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{this.props.game.name}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      )
    } else {
      return (
        <TouchableHighlight
          onPress={this.onCellClick}>
          <View style={styles.container}>
            <Image
              source={{uri: 'http://static.giantbomb.com' + this.props.game.image.small_url}}
              style={styles.circleImg}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{this.props.game.name}</Text>
            </View>
          </View>
        </TouchableHighlight>
      )
    }
  }
  onCellClick() {
    Alert.alert(
      'Clicked!',
      'You clicked me.',
      [{text: 'Ok', onPress: () => console.log('actions are neat')}]);
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 16,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: 'black',
    marginLeft: 16,
  },
  circleImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

module.exports = GameCell;
