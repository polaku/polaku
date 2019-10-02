import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { Item, Input, Icon, Header } from 'native-base';
import { defaultColor, defaultBackgroundColor, defaultTextColor } from '../defaultColor';
import { API } from '../../config/API';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class firstLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passwordLama: '',
      passwordBaru: '',
      konfirmasiPasswordBaru: '',
      email: '',
      noHP: '',
      seePasswordLama: false,
      seePasswordBaru: false,
      seeKonfirmasiPasswordBaru: false,
      proses: false,
      editableInput: true,
      checkStatusKonfirmasiPasswordBaru: true,
      statusEmail: true
    }
  }


  ubahPassword = async () => {
    let newData
    this.setState({
      proses: true,
      editableInput: false
    })
    let token = await AsyncStorage.getItem('token')

    if (this.state.passwordBaru !== this.state.konfirmasiPasswordBaru) {
      alert("Konfirmasi password baru tidak benar")
    } else {
      newData = {
        passwordLama: this.state.passwordLama,
        passwordBaru: this.state.passwordBaru,
        email: this.state.email,
        noHP: this.state.noHP,
      }
      API.put('/users/activationAccount', newData, {
        headers: {
          token
        }
      })
        .then(() => {
          this.props.navigation.navigate('Berita')
          this.setState({
            proses: false,
            editableInput: true
          })
        })
        .catch(err => {
          this.setState({
            proses: false,
            editableInput: true
          })
          if (err.message === 'Request failed with status code 400') {
            alert('Password lama yang anda masukan salah')
          } else {
            alert(err)
          }
        })
    }
  }

  resetForm() {
    this.setState({
    })
  }

  checkPasswordBaru = (text) => {
    if (text === this.state.passwordBaru) {
      this.setState({
        konfirmasiPasswordBaru: text,
        checkStatusKonfirmasiPasswordBaru: true
      })
    } else {
      this.setState({
        konfirmasiPasswordBaru: text,
        checkStatusKonfirmasiPasswordBaru: false
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
      <>
        <Header style={styles.header}>
          <View style={styles.titleHeader}>
            <Text style={styles.textTitleHeader}>Ubah password</Text>
          </View>
        </Header>

        <ScrollView style={{ height: height }} >
          <View style={styles.container}>
            <View style={{ padding: 10 }}>
              <Item style={{ marginTop: 10 }}>
                <Input id="passwordLama"
                  secureTextEntry={!this.state.seePasswordLama}
                  placeholder='Password Lama'
                  style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
                  value={this.state.passwordLama}
                  onChangeText={(text) => this.setState({ passwordLama: text })}
                  editable={this.state.editableInput} />
                <TouchableHighlight onPress={() => this.setState({ 'seePasswordLama': !this.state.seePasswordLama })}
                  underlayColor="transparent">
                  {
                    this.state.seePasswordLama
                      ? <MaterialCommunityIcons name='eye-off-outline' style={styles.icon} size={30} />
                      : <MaterialCommunityIcons name='eye-outline' style={styles.icon} size={30} />
                  }
                </TouchableHighlight>
              </Item>
              <Item style={{ marginTop: 10 }}>
                <Input id="passwordBaru"
                  secureTextEntry={!this.state.seePasswordBaru}
                  placeholder='Password Baru'
                  style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
                  value={this.state.passwordBaru}
                  onChangeText={(text) => this.setState({ passwordBaru: text })}
                  editable={this.state.editableInput} />
                <TouchableHighlight onPress={() => this.setState({ 'seePasswordBaru': !this.state.seePasswordBaru })}
                  underlayColor="transparent">
                  {
                    this.state.seePasswordBaru
                      ? <MaterialCommunityIcons name='eye-off-outline' style={styles.icon} size={30} />
                      : <MaterialCommunityIcons name='eye-outline' style={styles.icon} size={30} />
                  }
                </TouchableHighlight>
              </Item>
              <Item style={{ marginTop: 10 }} error={!this.state.checkStatusKonfirmasiPasswordBaru}>
                <Input id="konfirmasiPasswordBaru"
                  secureTextEntry={!this.state.seeKonfirmasiPasswordBaru}
                  placeholder='Konfirmasi Password Baru'
                  style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
                  value={this.state.konfirmasiPasswordBaru}
                  onChangeText={(text) => this.checkPasswordBaru(text)}
                  editable={this.state.editableInput} />
                {
                  !this.state.checkStatusKonfirmasiPasswordBaru && <Icon name='close-circle' />
                }
                <TouchableHighlight onPress={() => this.setState({ 'seeKonfirmasiPasswordBaru': !this.state.seeKonfirmasiPasswordBaru })}
                  underlayColor="transparent">
                  {
                    this.state.seeKonfirmasiPasswordBaru
                      ? <MaterialCommunityIcons name='eye-off-outline' style={styles.icon} size={30} />
                      : <MaterialCommunityIcons name='eye-outline' style={styles.icon} size={30} />
                  }
                </TouchableHighlight>
              </Item>
              <Item style={{ marginTop: 10 }} error={!this.state.statusEmail}>
                <Input id="email"
                  keyboardType="email-address"
                  placeholder='Email Kantor'
                  autoCorrect={false}
                  autoCapitalize="none"
                  style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
                  value={this.state.email}
                  onChangeText={(text) => this.validate(text)}
                  editable={this.state.editableInput} />
                {
                  !this.state.statusEmail && <Icon name='close-circle' />
                }
              </Item>
              <Item style={{ marginTop: 10 }}>
                <Input id="noHP"
                  placeholder='Nomor Handphone'
                  keyboardType="numeric"
                  style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
                  value={this.state.noHP}
                  onChangeText={(text) => this.setState({ noHP: text })}
                  editable={this.state.editableInput} />
              </Item>
            </View>
          </View>
          <TouchableHighlight onPress={this.ubahPassword} style={{ width: "100%", height: 50, backgroundColor: defaultColor, alignItems: "center", justifyContent: "center", alignSelf: 'flex-end', bottom: 0 }} underlayColor="transparent">
            {
              this.state.proses
                ? <ActivityIndicator size="small" color="#fff" />
                : <Text style={{ color: defaultBackgroundColor, fontSize: 15, fontWeight: "bold" }}>Send</Text>
            }
          </TouchableHighlight>
        </ScrollView>
      </>
    )
  }
}

firstLogin.navigationOptions = {
  header: null
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    height: height - 130,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: defaultColor
  },
  button: {
    height: 100,
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 15
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  header: {
    backgroundColor: defaultColor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTitleHeader: {
    color: defaultTextColor,
    marginLeft: 5,
    fontSize: 20
  },
})

