import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class ProfileItem extends React.Component {
    
    constructor() {
        super();

        this.state = {
            editClicked: false,
            myText: ''
        }
    }

    editItem() {
        this.setState({
            editClicked: true
        });
    }

    render() {
        if(this.state.editClicked) {
            return(
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10, width: '100%' }}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '50%', paddingLeft: '2%', fontSize: 18 }}
                        placeholder={this.props.itemType}
                        value={ this.state.myText }
                        onChangeText={ (text) => this.setState({ text }) }
                    />
                    <Button title="Edit" onPress={() => this.editItem()}></Button>
                </View>
            );
        } else {
            return(
                <View style={{ flex: 1, flexDirection:'row', justifyContent:'space-around', alignItems:'center', padding:10, width:'100%'}}>
                    <Text style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '50%', paddingLeft: '2%', fontSize: 18 }}> { this.state.myText } </Text>
                    <Button title="Edit" onPress={() => this.editItem()}></Button>
                </View>
            );
        }
    }
}

// export default class ProfilePage extends React.Component {
    
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return(
//             <View></View>
//         );
//     }
// }