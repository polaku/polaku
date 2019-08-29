import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Header } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MenuButton from '../components/menuButton';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../defaultColor';
import { API } from '../../config/API'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';

class profil extends Component {
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

    // const resetAction = NavigationActions.reset({
    //   index: 0,                       
    //   actions: [NavigationActions.navigate({ routeName: 'Login' })],
    // });
    
    this.props.navigation.navigate('Login')
    
    this.setState({
      proses: false
    })
  }

  componentDidMount() {
    API.get(`/users/${this.props.user_id}`)
      .then(({ data }) => {
        this.setState({
          data: data.data
        })
        console.log(this.state.data)
      })
      .catch(err => {
        console.log(err);
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
          <Image source={require('../../assest/icon_user.png')} style={{ width: 150, height: 150, borderRadius: 100, backgroundColor: 'red', alignSelf: 'center', marginTop: 30, marginBottom: 20 }} />


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
        <TouchableHighlight onPress={this.logout} style={{ width: '100%', height: 50, backgroundColor: defaultColor, alignItems: 'center', justifyContent: 'center', bottom: 0 }} underlayColor="transparent">
          {
            this.state.proses
              ? <ActivityIndicator size="small" color="#fff" />
              : <Text style={{ color: defaultBackgroundColor, fontSize: 15, fontWeight: "bold" }}>Logout</Text>
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
})

const mapStateToProps = ({ user_id }) => {
  return {
    user_id
  }
}

export default connect(mapStateToProps)(profil)