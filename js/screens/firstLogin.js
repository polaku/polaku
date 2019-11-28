import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, ScrollView, ActivityIndicator, Dimensions, Alert } from 'react-native';
import { Item, Input, Icon, Header, DatePicker, Label } from 'native-base';
import { defaultColor, defaultBackgroundColor, defaultTextColor } from '../defaultColor';
import { API } from '../../config/API';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class firstLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      birthDate: '',
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
      statusEmail: true,
      isForgotPassword: false,
    }
  }

  componentDidMount() {
    if (this.props.navigation.getParam('ForgotPassword')) {
      this.setState({
        isForgotPassword: true
      })
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
      Alert.alert('Error', "konfirmasi password baru tidak benar")
    } else {
      if (this.state.isForgotPassword) {
        newData = {
          username: this.state.username,
          birthDate: this.state.birthDate,
          passwordBaru: this.state.passwordBaru
        }
        API.put('/users/forgetPassword', newData, {
          headers: {
            token
          }
        })
          .then(() => {
            this.props.navigation.goBack()
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
              Alert.alert('Error', "password lama yang anda masukan salah")
            } else {
              Alert.alert('Error', `${err}`)
            }
          })
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
              Alert.alert('Error', "password lama yang anda masukan salah")              
            } else {
              Alert.alert('Error', `${err}`)
            }
          })
      }

    }
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

  setBirthDate(newDate) {
    newDate = newDate.toString().substr(4, 12)
    let month = this.getMonth(newDate.substr(0, 3));

    if (month < 10) {
      month = `0${month}`
    }

    this.setState({
      birthDate: `${newDate.substr(7, 4)}-${month}-${newDate.substr(4, 2)}`,
    });
  }

  getMonth(args) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months.indexOf(args) + 1
  }

  render() {
    return (
      <View style={{ height: '100%', backgroundColor: defaultBackgroundColor }}>
        <Header style={styles.header}>
          <View style={styles.titleHeader}>
            {
              this.state.isForgotPassword
                ? <Text style={styles.textTitleHeader}>Lupa password</Text>
                : <Text style={styles.textTitleHeader}>Ubah password</Text>
            }
          </View>
        </Header>

        <ScrollView style={{ height: height }} >
          <View style={styles.container}>
            <View style={{ padding: 10 }}>
              {
                this.state.isForgotPassword && <>
                  <Item stackedLabel style={{ marginTop: 10, alignItems: 'flex-start' }}>
                    <Label style={{ color: defaultColor }}>Username</Label>
                    <Input id="username"
                      style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
                      value={this.state.username}
                      onChangeText={(text) => this.setState({ username: text })}
                      editable={this.state.editableInput} />
                  </Item>
                  <Item stackedLabel style={{ marginTop: 10, alignItems: 'flex-start' }}>
                    <Label style={{ color: defaultColor }}>Tanggal Lahir</Label>
                    <DatePicker
                      defaultDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
                      locale={"id"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText={`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}
                      placeHolderTextStyle={{ textAlign: 'left', color: '#535759' }}
                      onDateChange={(text) => this.setBirthDate(text)}
                      disabled={false}
                      editable={this.state.editableInput}
                    />
                  </Item>
                </>
              }
              {
                !this.state.isForgotPassword && <Item stackedLabel style={{ marginTop: 10, alignItems: 'flex-start' }}>
                  <Label style={{ color: defaultColor }}>Password Lama</Label>
                  <Item>
                    <Input id="passwordLama"
                      placeholder=""
                      secureTextEntry={!this.state.seePasswordLama}
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
                </Item>
              }
              <Item stackedLabel style={{ marginTop: 10 }}>
                <Label style={{ color: defaultColor }}>Password Baru</Label>
                <Item>
                  <Input id="passwordBaru"
                    secureTextEntry={!this.state.seePasswordBaru}
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
              </Item>
              <Item stackedLabel style={{ marginTop: 10, alignItems: 'flex-start' }} error={!this.state.checkStatusKonfirmasiPasswordBaru}>
                <Label style={{ color: defaultColor }}>Konfirmasi Password Baru</Label>
                <Item>
                  <Input id="konfirmasiPasswordBaru"
                    placeholder=""
                    secureTextEntry={!this.state.seeKonfirmasiPasswordBaru}
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
              </Item>
              {
                !this.state.isForgotPassword && <>
                  <Item stackedLabel style={{ marginTop: 10, alignItems: 'flex-start' }} error={!this.state.statusEmail}>
                    <Label style={{ color: defaultColor }}>{this.state.isForgotPassword ? 'Email' : 'Email Kantor'}</Label>
                    <Input id="email"
                      placeholder=""
                      keyboardType="email-address"
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
                  <Item stackedLabel style={{ marginTop: 10, alignItems: 'flex-start' }}>
                    <Label style={{ color: defaultColor }}>Nomor Handphone</Label>
                    <Input id="noHP"
                      keyboardType="numeric"
                      style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
                      value={this.state.noHP}
                      onChangeText={(text) => this.setState({ noHP: text })}
                      editable={this.state.editableInput} />
                  </Item>
                </>
              }
            </View>
          </View>
        </ScrollView>
        <TouchableHighlight onPress={this.ubahPassword} style={{ width: "100%", height: 50, backgroundColor: defaultColor, alignItems: "center", justifyContent: "center", alignSelf: 'flex-end', bottom: 0 }} underlayColor="transparent">
          {
            this.state.proses
              ? <ActivityIndicator size="small" color="#fff" />
              : <Text style={{ color: defaultBackgroundColor, fontSize: 15, fontWeight: "bold" }}>Send</Text>
          }
        </TouchableHighlight>
      </View>
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

