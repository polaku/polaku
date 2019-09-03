import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image, ActivityIndicator, Alert } from 'react-native';
import { defaultTextColor, defaultColor } from '../defaultColor';
import { connect } from 'react-redux'
import { API } from '../../config/API';
import AsyncStorage from '@react-native-community/async-storage';

class cardBookungRuangan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: false,
      proses: false
    }
  }

  componentDidMount() {
    if (this.props.data.user_id === this.props.user_id) {
      this.setState({
        owner: true
      })
    }    
  }

  cancelBooking = () => {
    Alert.alert(
      'Alert',
      'Apa anda yakin ingin membatalkan ruangan ini?',
      [
        { text: 'NO', style: 'cancel' },
        {
          text: 'YES', onPress: this.delete
        },
      ]
    );
  }

  delete = async () => {

    this.setState({
      proses: true
    })
    let token = await AsyncStorage.getItem('token')

    API.delete(`/bookingRoom/${this.props.data.room_booking_id}`,
      {
        headers: { token }
      })
      .then(data => {
        alert("SUCCESS")
        this.props.deleteRoom()
        this.setState({
          proses: false
        })
      })
      .catch(err => {
        alert(err)
        this.setState({
          proses: false
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>

        <Image source={require('../../assest/icon_user.png')} style={styles.iconUserComment} />

        <View style={{ width: '70%', justifyContent: 'center' }}>
          <Text style={{ fontSize: 15 }}>{this.props.data.tbl_user.tbl_account_detail.fullname}</Text>
          <View style={styles.bottomPlace}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.props.data.time_in.slice(0, 5)} - {this.props.data.time_out.slice(0, 5)}</Text>
            {
              this.state.owner
              &&
              <TouchableHighlight style={styles.button} onPress={this.cancelBooking} underlayColor="transparent">
                {
                  this.state.proses
                    ? <ActivityIndicator size="small" color="#fff" />
                    : <Text style={{ color: defaultTextColor, textAlign: 'center' }}> batal pesanan </Text>
                }
              </TouchableHighlight>
            }
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconUserComment: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 30
  },
  bottomPlace: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button : { 
    backgroundColor: defaultColor,
    padding: 8,
    justifyContent: 'center',
    borderRadius: 30
  }
})

const mapStateToProps = ({ user_id }) => {
  return {
    user_id
  }
}

export default connect(mapStateToProps)(cardBookungRuangan)