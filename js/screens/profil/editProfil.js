import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Header } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MenuButton from '../../components/menuButton';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { API } from '../../../config/API';
import AsyncStorage from '@react-native-community/async-storage';

export default class profil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      proses: false
    }
  }

  logout = async () => {
    this.setState({
      proses: true
    })

    await AsyncStorage.clear()

    this.props.navigation.navigate('Login')

    this.setState({
      proses: false
    })
  }

  async componentDidMount() {
    let user_id = await AsyncStorage.getItem('user_id')

    API.get(`/users/${user_id}`)
      .then(({ data }) => {
        this.setState({
          data: data.data
        })

      })
      .catch(err => {
        if (err.message === 'Request failed with status code 403') {
          alert('Waktu login telah habis, silahkan login kembali')
          this.props.navigation.navigate('Login')
          AsyncStorage.clear()
        } else {
          alert(err)
        }

      })
  }

  render() {
    return (
      <View style={{ justifyContent: 'space-between', height: '100%' }}>
        <View>
          <Header style={styles.header}>
            <MenuButton navigation={this.props.navigation} />
            <View style={styles.titleHeader}>
              <MaterialIcons name='perm-identity' style={{ color: defaultTextColor }} size={30} />
              <Text style={styles.textTitleHeader}>Profil</Text>
            </View>
          </Header>
          <Image source={{ uri: this.props.data.tbl_user.tbl_account_detail.avatar }} style={styles.image} />


          <View>
            <View style={{ margin: 20 }}>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ width: 100 }}>
                  <Text>Fullname </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text>:  </Text>
                  {
                    this.state.data.tbl_account_detail && <Text>{this.state.data.tbl_account_detail.fullname}</Text>
                  }
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ width: 100 }}>
                  <Text>Username </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text>:  </Text>
                  <Text>{this.state.data.username}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ width: 100 }}>
                  <Text>Email </Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <Text>:  </Text>
                  <Text>{this.state.data.email}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <TouchableHighlight onPress={this.logout} style={styles.button} underlayColor="transparent">
          {
            this.state.proses
              ? <ActivityIndicator size="small" color="#fff" />
              : <Text style={styles.textButton}>Logout</Text>
          }
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    padding: 5,
    height: '100%',
    marginBottom: 60
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
