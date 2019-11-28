import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, ActivityIndicator, Dimensions, ScrollView, Alert } from 'react-native';
import { Header, Input, Item, Icon, Button } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MenuButton from '../../components/menuButton';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { API } from '../../../config/API';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { NavigationActions, StackActions } from 'react-navigation';
import Loading from '../../components/loading';
import ImagePicker from 'react-native-image-picker';

export default class profil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      proses: false,
      isEdit: false,
      loading: false,
      fullname: '',
      username: '',
      email: '',
      phone: '',
      avatar: 'https://polaku.polagroup.co.id/uploads/default_avatar.png 	',
      passwordLama: '',
      passwordBaru: '',
      konfirmasiPasswordBaru: '',
      statusEmail: true,
      seePasswordLama: false,
      seePasswordBaru: false,
      seeKonfirmasiPasswordBaru: false,
      isEditPassword: false,
      checkStatusKonfirmasiPasswordBaru: true,
      editableInput: true,
      isChangeAvatar: false,
    }
  }

  async componentDidMount() {
    let user_id = await AsyncStorage.getItem('user_id')
    this.setState({
      loading: true
    })
    API.get(`/users/${user_id}`)
      .then(({ data }) => {
        this.setState({
          data: data.data,
          fullname: data.data.tbl_account_detail.fullname,
          username: data.data.username,
          email: data.data.email,
          phone: data.data.tbl_account_detail.phone,
          avatar: data.data.tbl_account_detail.avatar,
          loading: false
        })
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 403') {
          Alert.alert('Error', 'waktu login telah habis, silahkan login kembali')
          this.props.navigation.navigate('Login')
          AsyncStorage.clear()
        } else {
          this.setState({
            loading: false
          })
          Alert.alert('Error', `${err}`)
        }
      })
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.isChangeAvatar != this.state.isChangeAvatar) {
      let token = await AsyncStorage.getItem('token')

      const options = {
        noData: true,
      }

      await ImagePicker.launchImageLibrary(options, response => {
        if (response.uri) {
          this.setState({
            isChangeAvatar: true,
            avatar: response
          })
        }
      })

      var formData = new FormData();

      formData.append("avatar", {
        name: this.state.avatar.fileName,
        type: 'image/jpeg',
        uri: this.state.avatar.uri
      })

      API.put('/users/changeAvatar', formData,
        {
          headers: {
            token
          }
        }
      )
        .then(() => {
          Alert.alert('', 'Avatar has change')

        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  logout = async () => {
    this.setState({
      proses: true
    })

    await AsyncStorage.clear()

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
    });
    this.props.navigation.dispatch(resetAction);

    this.setState({
      proses: false
    })
  }

  changeEdit = () => {
    this.setState({
      isEdit: !this.state.isEdit
    })
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

  saveProfil = async () => {
    let token = await AsyncStorage.getItem('token')
    let newData = {
      fullname: this.state.fullname,
      username: this.state.username,
      email: this.state.email,
      phone: this.state.phone
    }

    API.put('/users/editProfil', newData, { headers: { token } })
      .then(({ data }) => {
        this.setState({
          data: data.data,
          fullname: data.data.tbl_account_detail.fullname,
          username: data.data.username,
          email: data.data.email,
          phone: data.data.tbl_account_detail.phone,
          avatar: data.data.tbl_account_detail.avatar,
        })
      })
      .catch(err => {
        Alert.alert('Error', `${err}`)

      })
    this.setState({
      isEdit: !this.state.isEdit
    })
  }

  changePassword = async () => {
    let newData
    this.setState({
      proses: true,
      editableInput: false
    })
    let token = await AsyncStorage.getItem('token')

    if (this.state.passwordBaru !== this.state.konfirmasiPasswordBaru) {
      Alert.alert('Alert', 'Konfirmasi password baru tidak benar')
    } else {
      newData = {
        passwordLama: this.state.passwordLama,
        passwordBaru: this.state.passwordBaru,
      }
      API.put('/users/changePassword', newData, {
        headers: {
          token
        }
      })
        .then(() => {
          Alert.alert('', 'Password berhasil diubah')

          this.setState({
            proses: false,
            editableInput: true,
            isEditPassword: false,
            passwordLama: '',
            passwordBaru: '',
            konfirmasiPasswordBaru: ''
          })
        })
        .catch(err => {
          this.setState({
            proses: false,
            editableInput: true
          })
          if (err.message === 'Request failed with status code 400') {
            Alert.alert('Alert', 'Password lama yang anda masukan salah')
          } else {
            Alert.alert('Error', `${err}`)

          }
        })
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

  editPassword = () => {
    this.setState({
      isEditPassword: !this.state.isEditPassword,
      passwordLama: '',
      passwordBaru: '',
      konfirmasiPasswordBaru: ''
    })
  }

  changeAvatar = async () => {
    const options = {
      noData: true,
    }

    await ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({
          isChangeAvatar: true,
          avatar: response
        })
      }
    })

  }

  render() {
    return (
      <View style={{ justifyContent: 'space-between', height: '100%' }}>

        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <MaterialIcons name='perm-identity' style={{ color: defaultTextColor }} size={30} />
            <Text style={styles.textTitleHeader}>Profil</Text>
          </View>
          {
            !this.state.isEditPassword && <TouchableHighlight onPress={this.changeEdit} style={styles.setting} underlayColor="transparent">
              {
                this.state.isEdit
                  ? <SimpleLineIcons name='close' style={{ color: defaultTextColor }} size={28} />
                  : <MaterialCommunityIcons name='settings-outline' style={{ color: defaultTextColor }} size={28} />
              }
            </TouchableHighlight>
          }

        </Header>

        {
          this.state.loading
            ? <Loading />
            : <ScrollView style={{ height: height }} >
              <Image source={this.state.isChangeAvatar ? this.state.avatar : { uri: this.state.avatar }} style={styles.image} resizeMode={'stretch'} />
              {/* <Image source={this.state.thumbnail} style={{
                alignSelf: 'center',
                width: 150,
                height: 150,
                margin: 20
              }}  /> */}

              <TouchableHighlight onPress={this.changeAvatar} style={{ alignSelf: 'center', backgroundColor: defaultColor, height: 45, width: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 30, left: 50, top: -65 }} underlayColor={defaultColor}>
                <MaterialCommunityIcons name='camera-outline' style={{ color: defaultTextColor }} size={28} />
              </TouchableHighlight>
              <View>
                <View style={{ margin: 20 }}>
                  <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                    <View style={{ width: 100 }}>
                      <Text>Fullname </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text>:  </Text>
                      {
                        this.state.isEdit
                          ? <Item style={{ width: '78%' }}><Input id="fullname"
                            style={{ width: '100%' }}
                            value={this.state.fullname}
                            onChangeText={(text) => this.setState({ fullname: text })} /></Item>
                          : <Text>{this.state.fullname}</Text>
                      }
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                    <View style={{ width: 100 }}>
                      <Text>Username </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text>:  </Text>
                      {
                        this.state.isEdit
                          ? <Item style={{ width: '78%' }}><Input id="username"
                            style={{ width: '100%' }}
                            value={this.state.username}
                            onChangeText={(text) => this.setState({ username: text })} /></Item>
                          : <Text>{this.state.username}</Text>
                      }
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                    <View style={{ width: 100 }}>
                      <Text>Email </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text>:  </Text>
                      {
                        this.state.isEdit
                          ? <Item style={{ width: '78%' }} error={!this.state.statusEmail}><Input id="email"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            style={{ width: '100%' }}
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email: text })}
                            onChangeText={(text) => this.validate(text)}
                            editable={this.state.editableInput} />
                            {
                              !this.state.statusEmail && <Icon name='close-circle' />
                            }</Item>
                          : <Text>{this.state.email}</Text>
                      }
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                    <View style={{ width: 100 }}>
                      <Text>Phone </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text>:  </Text>
                      {
                        this.state.isEdit
                          ? <Item style={{ width: '78%' }}><Input id="phone"
                            style={{ width: '100%' }}
                            keyboardType="numeric"
                            value={this.state.phone}
                            onChangeText={(text) => this.setState({ phone: text })} /></Item>
                          : <Text>{this.state.phone}</Text>
                      }

                    </View>
                  </View>

                  {
                    !this.state.isEdit
                    && <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                      <View style={{ width: 100 }}>
                        <Text>Password </Text>
                      </View>

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>:  </Text>
                        <Button small danger onPress={this.editPassword}>
                          {
                            this.state.isEditPassword
                              ? <Text style={{ color: 'white', marginHorizontal: 10 }}> Cancel </Text>
                              : <Text style={{ color: 'white', marginHorizontal: 10 }}> Change Password </Text>
                          }
                        </Button>
                      </View>
                    </View>
                  }
                  {
                    this.state.isEditPassword && <View style={styles.container}>
                      <View style={{ padding: 10 }}>
                        <Item>
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
                        <Item style={{ marginTop: 10, marginBottom: 10 }} error={!this.state.checkStatusKonfirmasiPasswordBaru}>
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
                      </View>
                    </View>
                  }

                </View>
              </View>
            </ScrollView>
        }
        {
          this.state.isEdit && <TouchableHighlight onPress={this.saveProfil} style={styles.button} underlayColor="transparent">
            {
              this.state.proses
                ? <ActivityIndicator size="small" color="#fff" />
                : <Text style={styles.textButton}>Save</Text>
            }
          </TouchableHighlight>
        }
        {
          this.state.isEditPassword && <TouchableHighlight onPress={this.changePassword} style={styles.button} underlayColor="transparent">
            {
              this.state.proses
                ? <ActivityIndicator size="small" color="#fff" />
                : <Text style={styles.textButton}>Save</Text>
            }
          </TouchableHighlight>
        }
        {
          (!this.state.isEdit && !this.state.isEditPassword) && <TouchableHighlight onPress={this.logout} style={styles.button} underlayColor="transparent">
            {
              this.state.proses
                ? <ActivityIndicator size="small" color="#fff" />
                : <Text style={styles.textButton}>Logout</Text>
            }
          </TouchableHighlight>
        }
      </View>
    )
  }
}

profil.navigationOptions = {
  header: null
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    padding: 5,
  },
  header: {
    backgroundColor: defaultColor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  setting: {
    zIndex: 9,
    position: 'absolute',
    top: 12,
    right: 15,
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
  button: {
    width: '100%',
    height: 50,
    backgroundColor: defaultColor,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0
  },
  textButton: {
    color: defaultBackgroundColor,
    fontSize: 15,
    fontWeight: "bold"
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20
  }
})
