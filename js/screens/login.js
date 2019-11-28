import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Image, View, Dimensions, ScrollView, ActivityIndicator, Linking, BackHandler, Alert } from 'react-native';
import { Item, Input, Text } from 'native-base';
import { defaultTextColor, defaultColor } from '../defaultColor';
import { API } from '../../config/API';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { setDataUser } from '../store/action';
import { withNavigationFocus } from 'react-navigation';

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      proses: false,
      editableInput: true,
      seePassword: false
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('backPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backPress', this.handleBackPress);
  }

  handleBackPress = () => {
    // BackHandler.exitApp()
    if (this.props.isFocused === true && this.props.navigation.state.routeName === 'Login') {
      //   this.handleBackPress()
      BackHandler.exitApp()
    }
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
      if (data) {
        this.setState({
          proses: false,
          editableInput: true,
          username: '',
          password: ''
        })

        let dataUser = {
          user_id: data.data.user_id,
          token: data.data.token,
          position_id: data.data.position,
          isRoomMaster: data.data.isRoomMaster,
          adminContactCategori: data.data.adminContactCategori,
          sisaCuti: data.data.sisaCuti,
        }
        await this.props.setDataUser(dataUser)

        AsyncStorage.multiSet([['token', data.data.token], ['user_id', String(data.data.user_id)]], () => {
          if (data.data.status === 0) {
            this.props.navigation.navigate("FirstLogin")
          } else {
            this.props.navigation.navigate("Home")
          }
        })

      }
    } catch (err) {
      if (err.message === 'Request failed with status code 403') {
        Alert.alert('Error', 'waktu login telah habis, silahkan login kembali')
        this.props.navigation.navigate('Login')
        AsyncStorage.clear()
      } else {
        Alert.alert('Error', 'username/password salah, silahkan coba lagi.')
      }
      this.setState({
        proses: false,
        editableInput: true
      })
    }
  }

  seePassword = () => {
    this.setState({
      seePassword: !this.state.seePassword
    })
  }

  klikwa = () => {
    Linking.openURL('whatsapp://send?phone=6287886270183')
  }

  forgetPassword = () => {
    this.props.navigation.navigate('ForgetPassword')
  }

  render() {
    return (
      <ScrollView style={{ height: '100%', backgroundColor: defaultColor }} >
        <View style={styles.container}>
          <View style={styles.content}>

            {/* LOGO POLAGROUP */}
            <View style={styles.logo}>
              <Image source={{ uri: "asset:/polagroup.png" }} style={{
                height: 48,
                width: 250,
                resizeMode: 'stretch'
              }} />
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
                  editable={this.state.editableInput} />
              </Item>
              <Item style={{ marginBottom: 45 }}>
                <SimpleLineIcons name='lock' style={styles.icon} size={30} />
                <Input id='password'
                  placeholder='Password'
                  placeholderTextColor={defaultTextColor}
                  secureTextEntry={!this.state.seePassword}
                  style={{ color: defaultTextColor }}
                  value={this.state.password}
                  onChangeText={(text) => this.setState({
                    password: text
                  })}
                  editable={this.state.editableInput} />
                <TouchableHighlight onPress={this.seePassword}
                  underlayColor="transparent">
                  {
                    this.state.seePassword
                      ? <MaterialCommunityIcons name='eye-off-outline' style={styles.icon} size={30} />
                      : <MaterialCommunityIcons name='eye-outline' style={styles.icon} size={30} />
                  }
                </TouchableHighlight>

              </Item>
              <TouchableHighlight onPress={this.login}
                style={styles.button} underlayColor="transparent">
                {
                  this.state.proses
                    ? <ActivityIndicator size="small" color="#fff" />
                    : <Text style={styles.textLogin}>Login</Text>
                }
              </TouchableHighlight>
              <Text onPress={this.forgetPassword} style={{ color: defaultTextColor }} >Lupa Password?</Text>
            </View>

            {/* HUBUNGI KAMI */}
            <View style={styles.center}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: defaultTextColor }} >Kesulitan masuk? </Text>
                <Text onPress={this.klikwa} style={{ color: defaultTextColor, textDecorationLine: 'underline' }} >Hubungi Kami</Text>
              </View>
              <Text style={{ color: defaultTextColor, fontSize: 10, marginTop: 5 }} >Version 1.0.26</Text>
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
    alignSelf: 'center'
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
  setDataUser
}

export default connect(null, mapDispatchToProps)(withNavigationFocus(login))
