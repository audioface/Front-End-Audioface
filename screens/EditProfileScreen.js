import React, {Component} from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  saveButton: {
    color: '#F78C74',
  },
});

export default class EditProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      pw: '',
      dob: '',
      des: '',
    }

    // this.saveChanges = this.saveChanges.bind(this);
    // this.handleNameChange = this.handleNameChange.bind(this);
    // this.handlePwChange = this.handlePwChange.bind(this);
    // this.handbleDobChange = this.handbleDobChange.bind(this);
    // this.handleDesChange = this.handleDesChange.bind(this);
  }
  saveChanges = () => {
    // TO DO: Make ajax call to send back data changes
  }

  handleNameChange = (name) =>{
    this.setState({ name });
  }
  handlePwChange = (pw) => {
    this.setState({ pw });
  }
  handleDobChange = (dob) => {
    this.setState({ dob });
  }
  handleDesChange = (des) => {
    this.setState({ des });
  }

  render() {
    return (
        <View style = {styles.container}>
          <Text> Create Your Profile </Text>
          <TextInput style={ styles.textInput }
            autoCapitalize='words'
            autoCorrect={false}
            returnKeyType="next"
            placeholder='Display Name'
            value={ this.state.name }
            onchangeText= { this.handleNameChange }
          />
          <TextInput style={ styles.textInput }
            autoCapitalize='none'
            returnKeyType="next"
            placeholder='Password'
            value={ this.state.pw }
            onchangeText= { this.handlePwChange }
          />
          <TextInput style={ styles.textInput }
            keyboardType='numbers-and-punctuation'
            returnKeyType="next"
            placeholder='Date of Birth (01-31-2019)'
          />
          <TextInput style={ styles.textInput }
            returnKeyType="go"
            placeholder='Description (optional)'
          />
          <Button style= { styles.saveButton }
            onPress={ saveChanges }
            title='Save'
          />
        </View>
    );
  }
}

