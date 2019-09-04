import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Image, View, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { Item, Input, Text } from 'native-base';
import { defaultTextColor, defaultColor } from '../defaultColor';
import { API } from '../../config/API';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { setUserId } from '../store/action';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      backgroundColor: defaultColor,
      proses: false,
      editableInput: true
    };
  }

  login = async () => {
    this.setState({
      proses: true,
      editableInput: false 
    })
    let user, data
    user = {
      username: this.state.username,
      password: this.state.password
    }
    try {
      data = await API.post('/users/signin', user)
      await AsyncStorage.setItem('token', data.data.token)
      if (data) {
        this.setState({
          proses: false,
          editableInput: true,
          username: '',
          password: ''
        })
      }
      this.props.setUserId(data.data.user_id)
      this.props.navigation.navigate("Home")
    } catch (err) {
      alert(err)
      this.setState({
        proses: false,
        editableInput: true
      })
    }

  }

  render() {
    return (
      <ScrollView style={{ height: '100%', backgroundColor: defaultColor }} >
        {/* {
          this.props.isFocused && this.checkLogin()
        } */}
        <View style={styles.container}>
          <View style={styles.content}>

            {/* LOGO POLAGROUP */}
            <View style={styles.logo}>
              <Image source={require('../../assest/logo_polagroup.png')} />
            </View>

            {/* FORM LOGIN */}
            <View style={styles.center} >
              <Item style={{ marginBottom: 25 }}>
                <MaterialIcons name='person-outline' style={styles.icon} size={32} />
                <Input id='username'
                  type='text'
                  placeholder='Username'
                  placeholderTextColor={defaultTextColor}
                  style={{ color: defaultTextColor }}
                  value={this.state.username}
                  onChangeText={(text) => this.setState({
                    username: text
                  })} 
                  editable={this.state.editableInput}/>
              </Item>
              <Item style={{ marginBottom: 45 }}>
                <SimpleLineIcons name='lock' style={styles.icon} size={30} />
                <Input id='password'
                  placeholder='Password'
                  placeholderTextColor={defaultTextColor}
                  secureTextEntry={true}
                  style={{ color: defaultTextColor }}
                  value={this.state.password}
                  onChangeText={(text) => this.setState({
                    password: text
                  })} 
                  editable={this.state.editableInput}/>
              </Item>
              <TouchableHighlight onPress={this.login}
                style={styles.button} underlayColor="transparent">
                {
                  this.state.proses
                    ? <ActivityIndicator size="small" color="#fff" />
                    : <Text style={styles.textLogin}>Login</Text>
                }
              </TouchableHighlight>
              <Text style={{ color: defaultTextColor }} >Forget Password?</Text>
            </View>

            {/* HUBUNGI KAMI */}
            <View style={styles.center}>
              <Text style={{ color: defaultTextColor }} >Kesulitan masuk? Hubungi Kami</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

login.navigationOptions = {
  header: null
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: defaultColor,
    flex: 1,
    alignItems: 'center'
  },
  content: {
    flex: 1,
    height: height - 25,
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'space-around'
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
  logo: {
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogin: {
    textAlign: 'center',
    color: defaultTextColor
  },
  icon: {
    color: defaultTextColor,
    marginRight: 5
  }
});

const mapDispatchToProps = {
  setUserId
}

export default connect(null, mapDispatchToProps)(login)
