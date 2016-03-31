'use strict';

var _ = require('lodash');

import React, {
  AppRegistry,
  Image,
  StyleSheet,
  ListView,
  Text,
  ToolbarAndroid,
  TouchableNativeFeedback,
  View,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

class GamesListing extends React.Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

    this.state = {
      dataSource: ds.cloneWithRows([]), 
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('https://www.giantbomb.com/api/releases?api_key=ed4d6a5bb650860d4584c537062d17582349ad31&format=json', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var filtered = _.filter(responseJson.results, (game) => game.image);
      this.setState({ 
        dataSource: this.state.dataSource.cloneWithRows(filtered),
        loaded: true,
      });
    })
    .catch((error) => {
      console.warn(error)
    });
  }
  
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Spinner/>
      </View>
    );
  }
  
  renderCell(game) {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#607DB8')}>
        <View style={styles.container}>
          <Image
            source={{uri: 'http://static.giantbomb.com' + game.image.small_url}}
            style={styles.circleImg}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{game.name}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
  
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View
        style={styles.rootContainer}>
        <ToolbarAndroid
          title='Games'
          titleColor='white'
          style={styles.toolbar} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderCell}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
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
  toolbar: {
    height: 56,
    backgroundColor: '#009688',
    elevation: 3,
  },
});
 
AppRegistry.registerComponent('GamesListing', () => GamesListing);

