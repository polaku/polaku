import React, { Component } from 'react'
import { StyleSheet, TouchableHighlight, Image, View } from 'react-native'
import { Container, Content, Item, Input, Icon, Text } from 'native-base';

export class login extends Component {
  constructor(props) {
    super(props);
    this.state = { pressStatus: false };
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
          <View style={styles.center}>
            <View style={{ width: 'auto' }} >
              <Image source={require('../../assest/logo_polagroup.png')} />
            </View>
          </View>

          <View style={styles.center} >
            <Item style={{ marginBottom: 25 }}>
              <Icon name='person' style={styles.textColor} />
              <Input placeholder='Username' placeholderTextColor={styles.textColor.color} style={{ color: '#eee' }} />
            </Item>
            <Item style={{ marginBottom: 45 }}>
              <Icon name='lock' style={styles.textColor} />
              <Input placeholder='Password' placeholderTextColor={styles.textColor.color} secureTextEntry={true} style={{ color: '#eee' }} />
            </Item>
            <TouchableHighlight activeOpacity={1} onPress={this.login}
              style={
                this.state.pressStatus
                  ? styles.buttonPress
                  : styles.button
              }
              onHideUnderlay={this._onHideUnderlay.bind(this)}
              onShowUnderlay={this._onShowUnderlay.bind(this)}
            >
              <Text style={{ textAlign: 'center', color: styles.textColor.color }}>Login</Text>
            </TouchableHighlight>
            <Text style={styles.textColor} >Forget Password?</Text>
          </View>
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
  container: {
    height: '100%',
    backgroundColor: '#A6250F',
    display: 'flex',
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
  textColor: {
    color: '#DBA89F'
  },
  button: {
    padding: 15,
    borderWidth: 2,
    borderColor: '#DBA89F',
    marginBottom: 30,
    width: '100%'
  },
  buttonPress: {
    padding: 15,
    borderWidth: 2,
    borderColor: '#DBA89F',
    backgroundColor: 'white',
    marginBottom: 30,
    width: '100%'
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default login
