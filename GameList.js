'use strict';

var _ = require('lodash');

import React, {
  ListView,
} from 'react-native';

import GameCell from './GameCell';

class GameList extends React.Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });

    this.state = {
      dataSource: ds.cloneWithRows([]),
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
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(game) => <GameCell game={game}/>}
      />
    );
  }
}

module.exports = GameList;

