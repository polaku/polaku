import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Image, View } from 'react-native';
import { Container, Item, Input, Icon, Text } from 'native-base';
import { defaultTextColor, defaultColor } from '../defaultColor'

export class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressStatus: false,
      backgroundColor: defaultColor
    };
  }
  _onHideUnderlay() {
    this.setState({ pressStatus: false });
  }
  _onShowUnderlay() {
    this.setState({ pressStatus: true });
  }
  login = () => {
    console.log("success");
    this.props.navigation.navigate("Home")
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.content}>

          {/* LOGO POLAGROUP */}
          <View style={styles.center}>
            <Image source={require('../../assest/logo_polagroup.png')} />
          </View>

          {/* FORM LOGIN */}
          <View style={styles.center} >
            <Item style={{ marginBottom: 25 }}>
              <Icon name='person' style={styles.textColor} />
              <Input placeholder='Username' placeholderTextColor={defaultTextColor} style={styles.textColor} />
            </Item>
            <Item style={{ marginBottom: 45 }}>
              <Icon name='lock' style={styles.textColor} />
              <Input placeholder='Password' placeholderTextColor={defaultTextColor} secureTextEntry={true} style={styles.textColor} />
            </Item>
            <TouchableHighlight onPress={() => this.login()}
              style={
                this.state.pressStatus
                  ? styles.buttonPress
                  : styles.button
              }
              onHideUnderlay={this._onHideUnderlay.bind(this)}
              onShowUnderlay={this._onShowUnderlay.bind(this)}
            >
              <Text style={styles.textLogin}>Login</Text>
            </TouchableHighlight>
            <Text style={styles.textColor} >Forget Password?</Text>
          </View>

          {/* HUBUNGI KAMI */}
          <View style={styles.center}>
            <Text style={styles.textColor} >Kesulitan masuk? Hubungi Kami</Text>
          </View>
        </View>
      </Container>
    )
  }
}

login.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  textColor: {
    color: defaultTextColor
  },
  container: {
    height: '100%',
    backgroundColor: defaultColor,
    flex: 1,
    alignItems: 'center',
  },
  content: {
    marginTop: 30,
    flex: 1,
    height: '100%',
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  button: {
    padding: 15,
    borderWidth: 2,
    borderColor: defaultTextColor,
    marginBottom: 30,
    width: '100%'
  },
  buttonPress: {
    padding: 15,
    borderWidth: 2,
    borderColor: defaultTextColor,
    backgroundColor: 'red',
    marginBottom: 30,
    width: '100%'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textLogin: {
    textAlign: 'center',
    color: defaultTextColor
  }
});

export default login
