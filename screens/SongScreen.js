import React, { Component } from 'react';
import { FlatList, Button, StyleSheet, Text, View } from 'react-native';

export default class Songs extends Component {

  _handlePress() {
    console.log('Pressed!');
  }
  render() {
    return (
      <View style={{marginTop: 20, backgroundColor: '#FDFAF3', flex: 1}}>
        <Button onPress={() => this._handlePress()} title = '<~ Back to Playlists'>
        </Button>
        <Text style={{fontSize:35, paddingBottom: 1, marginLeft: 10}}>Happy</Text>
        <FlatList style={{alignItems: 'center'}} 
          data={[
            {key: 'Hello by Adele'},
            {key: 'Hello by Adele'},
            {key: 'Hello by Adele'},
            {key: 'Hello by Adele'},
            {key: 'Hello by Adele'},
            {key: 'Hello by Adele'},
            {key: 'Hello by Adele'},
            {key: 'Hello by Adele'},
            {key: 'Hello by Adele'},
            {key: 'Hello by Adele'},
            {key: 'Hello by Adele'},
            {key: 'Hello by Adele'},
          ]}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({item}) => 
            <View>
              <Text style={{fontSize: 25, marginBottom: 15}}> {item.key} </Text>
            </View>
          }
        />
      </View>
    );
  }
}