import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Image, View, Dimensions, ScrollView, ActivityIndicator, Linking, Alert } from 'react-native';
import { Icon, Item, Input, Label } from 'native-base';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../defaultColor';
import { API } from '../../config/API';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { WebView } from 'react-native-webview';

export default class forgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      proses: false,
      editableInput: true,
      statusEmail: true
    };
  }


  login = async () => {
    this.setState({
      proses: true,
      editableInput: false
    })

    try {
      await API.post('/users/forgetPassword', user)
      if (data) {
        this.setState({
          proses: false,
          editableInput: true,
          username: '',
          password: ''
        })
      }
    } catch (err) {
      Alert.alert('Error', "please try again")

      this.setState({
        proses: false,
      })
    }
  }

  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({
        email: text,
        statusEmail: false
      })
    }
    else {
      this.setState({
        email: text,
        statusEmail: true
      })
    }
  }

  render() {
    return (
      // <ScrollView style={{ height: height, backgroundColor: defaultColor }} >
      //   <SimpleLineIcons name='arrow-left' onPress={() => this.props.navigation.goBack()} style={styles.menuIcon} size={25} />
      //   <View style={styles.container}>
      //     <Image source={{ uri: 'http://api.polagroup.co.id/uploads/forget_password.png' }} style={styles.image} />
      //     <Item style={{ marginTop: 20, flexDirection: 'row', backgroundColor:defaultBackgroundColor, width: '80%', borderRadius: 3 }} error={!this.state.statusEmail}>
      //       <Input id="email"
      //         placeholder="Email"
      //         keyboardType="email-address"
      //         autoCorrect={false}
      //         autoCapitalize="none"
      //         style={{ padding: 3, marginLeft: 5, alignSelf: 'flex-start' }}
      //         value={this.state.email}
      //         onChangeText={(text) => this.validate(text)}
      //         editable={this.state.editableInput} />
      //       {
      //         !this.state.statusEmail && <Icon name='close-circle' />
      //       }
      //     </Item>
      //   </View>
      // </ScrollView>
      <WebView
        source={{uri: 'https://polaku.polagroup.co.id/login/forgot_password'}}
      />
    )
  }
}

forgetPassword.navigationOptions = {
  header: null
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    color: defaultTextColor,
    marginLeft: 18,
    marginTop: 20
  },
  image: {
    height: 260,
    width: 200,
  }
});


// http://api.polagroup.co.id/uploads/forget_password.png