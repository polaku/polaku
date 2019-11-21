import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableHighlight, Image, ActivityIndicator, Alert } from 'react-native';
import { defaultTextColor, defaultColor } from '../defaultColor';
import { API } from '../../config/API';
import AsyncStorage from '@react-native-community/async-storage';

class cardBookungRuangan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: false,
      proses: false,
      isExpired: false
    }
  }

  async componentDidMount() {
    if (this.props.data.user_id === this.props.user_id) {
      this.setState({
        owner: true
      })
    }
    if (Number(this.props.data.time_out.split(':')[0]) < new Date().getHours()) this.setState({ isExpired: true })
    // if(this.props.data.)
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
        if (err.message === 'Request failed with status code 403') {
          alert('Waktu login telah habis, silahkan login kembali')
          this.props.navigation.navigate('Login')
          AsyncStorage.clear()
        } else {
          alert(err)
        }
        this.setState({
          proses: false
        })
      })
  }

  detail = () => {
    console.log(this.props.data.room_booking_id);
    this.props.navigation.navigate("DetailBookingRoom", { room_booking_id: this.props.data.room_booking_id })
  }

  render() {
    function getDate(args) {
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let date = new Date(args).getDate()
      let month = months[new Date(args).getMonth()]
      let years = new Date(args).getFullYear()
      return `${month} ${date}, ${years}`
    }

    return (
      <TouchableHighlight style={styles.container} onPress={this.detail} underlayColor="transparent">
        <>

          {
            !this.props.myRoom && <Image source={{ uri: this.props.data.tbl_user.tbl_account_detail.avatar }} style={styles.iconUserComment} />
          }
          <View style={{ width: this.props.myRoom ? '80%' : '70%', justifyContent: 'center' }}>
            {
              this.props.myRoom
                ? this.props.data.tbl_room && <>
                  <Text style={{ fontSize: 15 }}>{this.props.data.tbl_room.room}</Text>
                  <Text style={{ fontSize: 13 }}>{getDate(this.props.data.date_in)}</Text>
                </>
                : <Text style={{ fontSize: 15 }}>{this.props.data.tbl_user.tbl_account_detail.fullname}</Text>
            }
            <View style={styles.bottomPlace}>
              <Text style={{ fontSize: 18, fontWeight: this.props.myRoom ? 'normal' : 'bold' }}>{this.props.data.time_in.slice(0, 5)} - {this.props.data.time_out.slice(0, 5)}</Text>
              {
                ((this.state.owner || this.props.isRoomMaster) && !this.state.isExpired)
                && <TouchableHighlight style={styles.button} onPress={this.cancelBooking} underlayColor="transparent">
                  {
                    this.state.proses
                      ? <ActivityIndicator size="small" color="#fff" />
                      : <Text style={{ color: defaultTextColor, textAlign: 'center' }}> batal pesanan </Text>
                  }
                </TouchableHighlight>
              }
            </View>
          </View>
        </>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10
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
    alignItems: 'center',
    height: 'auto'
  },
  button: {
    backgroundColor: defaultColor,
    padding: 8,
    justifyContent: 'center',
    borderRadius: 30
  }
})

const mapStateToProps = ({ isRoomMaster, user_id }) => {
  return {
    isRoomMaster,
    user_id
  }
}
export default connect(mapStateToProps)(cardBookungRuangan)