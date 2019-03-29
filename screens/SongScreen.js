import React, { Component } from 'react';
import { FlatList, Button, StyleSheet, Text, View } from 'react-native';

export default class Song extends Component {

  constructor(props, context) {
    super(props, context);
  }

  _handlePress() {
    console.log('Pressed!');
  }
  render() {
    return (
      <View>
        {/* <Button
          style={{fontSize: 20, color: 'orange'}}
          onPress={() => this._handlePress()}>
          Back to Playlists
        </Button> */}
        <View style={styles.container}>
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
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
  