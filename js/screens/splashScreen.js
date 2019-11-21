import React, { Component } from 'react';
import { StyleSheet, Image, View, Dimensions, } from 'react-native';
import { defaultColor } from '../defaultColor';
import { API } from '../../config/API';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { setDataUser } from '../store/action';

class splashScreen extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem('token')

    if (token) {
      API.get('/users/checktoken', { headers: { token } })
        .then(async ({ data }) => {
          let dataUser = {
            user_id: data.user_id,
            position_id: data.position,
            isRoomMaster: data.isRoomMaster,
            sisaCuti: data.sisaCuti,
            adminContactCategori: data.adminContactCategori,
          }

          await this.props.setDataUser(dataUser)
          this.props.navigation.navigate("Home")
        })
        .catch(err => {
          this.props.navigation.navigate("Login")
        })
    } else {
      this.props.navigation.navigate("Login")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: "asset:/polagroup_polaku_icon.png" }} style={{ height: 60, width: 60 }} />
        <Image source={{ uri: "asset:/polagroup_polaku.png" }} style={{ height: 20, width: 60, marginTop: 5 }} />
      </View>
    )
  }
}

splashScreen.navigationOptions = {
  header: null
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: defaultColor,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

const mapDispatchToProps = {
  setDataUser
}

export default connect(null, mapDispatchToProps)(splashScreen)
