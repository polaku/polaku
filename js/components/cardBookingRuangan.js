import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableHighlight, Image, ActivityIndicator, Alert } from 'react-native';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../defaultColor';
import { API } from '../../config/API';
import AsyncStorage from '@react-native-community/async-storage';

class cardBookungRuangan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: false,
      proses: false,
      isStatusButtonCancel: false,
      isExpiredTime: false,
      isNextBookingRoom: false
    }
  }

  async componentDidMount() {
    let time_in = Number(this.props.data.time_in.split(':')[0])
    let time_out = Number(this.props.data.time_out.split(':')[0])

    if (this.props.data.user_id === this.props.user_id) {
      this.setState({
        owner: true
      })
    }

    if (((time_in <= new Date().getHours() && time_out >= new Date().getHours()) ||
      time_out < new Date().getHours()) &&
      new Date(this.props.data.date_in).getDate() === new Date().getDate()) this.setState({ isExpiredTime: true })

    if (time_out <= new Date().getHours() &&
      new Date(this.props.data.date_in).getDate() === new Date().getDate()) this.setState({ isStatusButtonCancel: true })


    if (time_in === new Date().getHours() + 1 && new Date(this.props.data.date_in).getDate() === new Date().getDate()) {
      this.setState({ isNextBookingRoom: true })
    }
  }

  cancelBooking = () => {
    Alert.alert(
      'Konfirmasi',
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
        Alert.alert("Success", '');

        this.props.deleteRoom()
        this.setState({
          proses: false
        })
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 403') {
          Alert.alert("Error", 'waktu login telah habis, silahkan login kembali');
          this.props.navigation.navigate('Login')
          AsyncStorage.clear()
        } else {
          Alert.alert("Error", `${err}`);

        }
        this.setState({
          proses: false
        })
      })
  }

  detail = () => {
    this.props.navigation.navigate("DetailBookingRoom", { room_booking_id: this.props.data.room_booking_id, title: this.props.data.subject })
  }

  render() {
    function getDate(args) {
      // marginTop: 8,
      // marginBottom: 8,
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let date = new Date(args).getDate()
      let month = months[new Date(args).getMonth()]
      let years = new Date(args).getFullYear()
      return `${month} ${date}, ${years}`
    }

    return (
      <TouchableHighlight style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: this.state.isNextBookingRoom ? defaultBackgroundColor : 'white',
        opacity: this.state.isExpiredTime ? 0.3 : 1
      }} onPress={this.detail} underlayColor="transparent">
        {
          this.props.myRoom
            ? <View style={{ width: '80%', justifyContent: 'center' }}>
              {
                this.props.data.tbl_room && <>
                  <Text style={{ fontSize: 15 }}>{this.props.data.tbl_room.room}</Text>
                  <Text style={{ fontSize: 13 }}>{getDate(this.props.data.date_in)}</Text>
                </>
              }
              <View style={styles.bottomPlace}>
                <Text style={{ fontSize: 18, fontWeight: this.props.myRoom ? 'normal' : 'bold' }}>{this.props.data.time_in.slice(0, 5)} - {this.props.data.time_out.slice(0, 5)}</Text>
                {
                  ((this.state.owner || this.props.isRoomMaster) && !this.state.isStatusButtonCancel)
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
            : <View style={{ width: '90%' }} >
              {
                this.state.isNextBookingRoom && <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 5, marginBottom: 5 }}>Acara berikutnya</Text>
              }
              <Text style={{ fontSize: this.state.isNextBookingRoom ? 25 : 20, fontWeight: this.props.myRoom ? 'normal' : 'bold' }}>{this.props.data.time_in.slice(0, 5)} - {this.props.data.time_out.slice(0, 5)}</Text>
              <Text style={{ fontSize: 19 }}>{this.props.data.subject}</Text>

              {/* <View style={{ width: '100%', flexDirection: 'row'}}> */}
              <View style={styles.bottomPlace}>
                <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                  <Image source={{ uri: this.props.data.tbl_user.tbl_account_detail.avatar }} style={styles.iconUserComment} />
                  <Text style={{ fontSize: 15, color: defaultColor }}>{this.props.data.tbl_user.tbl_account_detail.fullname}</Text>
                </View>
                {
                  ((this.state.owner || this.props.isRoomMaster) && !this.state.isStatusButtonCancel)
                  && <TouchableHighlight style={styles.button} onPress={this.cancelBooking} underlayColor="transparent">
                    {
                      this.state.proses
                        ? <ActivityIndicator size="small" color="#fff" />
                        : <Text style={{ color: defaultTextColor, textAlign: 'center' }}> batal pesanan </Text>
                    }
                  </TouchableHighlight>
                }
              </View>
              {/* </View> */}
            </View>
        }
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  iconUserComment: {
    height: 30,
    width: 30,
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
  },
})

const mapStateToProps = ({ isRoomMaster, user_id }) => {
  return {
    isRoomMaster,
    user_id
  }
}
export default connect(mapStateToProps)(cardBookungRuangan)