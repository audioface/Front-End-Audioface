import React, { Component } from 'react';
import { View, Text,StyleSheet, FlatList } from 'react-native';

export default class SongScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <FlatList
            data={[
              {key: 'Hi! by Jackson5'},
              {key: 'Youre Dead! by Flying Lotus'},
              {key: 'Hello by Adelle'},
              {key: 'Kiss of Life by Sade'},
              {key: 'Casio by Jungle'},
              {key: 'Computer Love by Roger and Zapp'},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   alignItems:'center',
   justifyContent:'center'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
  