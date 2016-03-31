'use strict';

var _ = require('lodash');

import React, {
  Image,
  StyleSheet,
  ListView,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';

class GameList extends React.Component {
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

module.exports = GameList;
