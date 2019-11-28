import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, StyleSheet, Text, TouchableHighlight, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { Thumbnail } from 'native-base';
import { API } from '../../../config/API';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../../components/loading';
import { defaultBackgroundColor } from '../../defaultColor';

class detailBookingRoom extends Component {
  state = {
    data: {},
    eventResponses: [],
    proses: false,
    isInvited: false,
    statusJoinUser: 'Not Join',
    prosesJoin: false,
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('title')}`
  });

  async componentDidMount() {
    await this.fetchData()
  }

  fetchData = async () => {
    let token = await AsyncStorage.getItem("token")
    this.setState({
      proses: true
    })
    API.get(`/bookingRoom/${this.props.navigation.getParam("room_booking_id")}`, { headers: { token } })
      .then(({ data }) => {
        let newEventResponse = data.eventResponses.filter(el => el.response != 'creator')

        newEventResponse.forEach(element => {
          if (element.user_id === this.props.user_id) {
            this.setState({
              isInvited: true,
              statusJoinUser: element.response
            })
          }
        });

        this.setState({
          data: data.data,
          eventResponses: newEventResponse,
          proses: false
        })
      })
      .catch(err => {
        this.setState({
          proses: false
        })
        console.log(err);
        Alert.alert('Error', 'please try again')
      })
  }

  joinEvent = async (args) => {
    this.setState({
      prosesJoin: true
    })
    let token = await AsyncStorage.getItem('token')
    try {
      getData = await API.post(`/events/follow`,
        {
          event_id: this.state.eventResponses[0].event_id, response: args.toLowerCase(),
        },
        {
          headers: { token }
        })

      if (args === "Join") {
        let newPerson = this.state.eventResponses
        newPerson.push('newPerson')

        this.setState({
          statusJoinUser: args,
          eventResponses: newPerson
        })
      } else {
        let newPerson = this.state.eventResponses
        newPerson.shift()
        this.setState({
          statusJoinUser: args,
          eventResponses: newPerson
        })
      }
      if (getData) {
        this.fetchData()

        Alert.alert('', `${args} success`)

        this.setState({
          prosesJoin: false
        })
      }
    } catch (err) {
      if (err.message === 'Request failed with status code 403') {
        Alert.alert('Error', 'waktu login telah habis, silahkan login kembali')
        this.props.navigation.navigate('Login')
        AsyncStorage.clear()
      } else {
        Alert.alert('Error', `${err}`)

      }
      this.setState({
        prosesJoin: false
      })
    }
  }

  join = () => {
    this.joinEvent("Join")
  }

  cancelJoin = () => {
    this.joinEvent("Cancel Join")
  }

  render() {
    function getDate(args) {
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let date = new Date(args).getDate()
      let month = months[new Date(args).getMonth()]
      let years = new Date(args).getFullYear()

      return `${date} ${month} ${years}`
    }

    return (
      <View style={{ height: '100%' }}>
        {
          (!this.state.proses && this.state.data.tbl_user)
            ? <>
              <View style={{ flexDirection: 'row', padding: 20, backgroundColor: defaultBackgroundColor }}>
                <Thumbnail medium source={{ uri: this.state.data.tbl_user.tbl_account_detail.avatar }} />
                <View style={{ marginTop: -3, marginLeft: 15, justifyContent: 'center' }}>
                  {
                    this.state.data.tbl_user.tbl_account_detail.fullname.length > 19
                      ? <Text numberOfLines={1} style={{ fontSize: 20, width: '95%' }}>{this.state.data.tbl_user.tbl_account_detail.fullname}</Text>
                      : <Text style={{ fontSize: 20 }}>{this.state.data.tbl_user.tbl_account_detail.fullname}</Text>
                  }

                  <Text style={{ marginTop: 3, fontSize: 12, color: 'gray' }}>(Penyelenggara)</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{this.state.data.time_in.slice(0, 5)} - {this.state.data.time_out.slice(0, 5)}</Text>
                  <Text style={{ fontSize: 18 }}>{getDate(this.state.data.date_in)}</Text>
                </View>
                {
                  (this.state.statusJoinUser.toLowerCase() != 'join')
                    ? this.state.isInvited && <TouchableHighlight style={styles.button} onPress={this.join} underlayColor="transparent">
                      {
                        this.state.prosesJoin
                          ? <ActivityIndicator size="small" color="#fff" />
                          : <Text style={styles.textButton}> Ikuti </Text>
                      }
                    </TouchableHighlight>
                    : this.state.isInvited && <TouchableHighlight style={styles.button} onPress={this.cancelJoin} underlayColor="transparent">
                      {
                        this.state.prosesJoin
                          ? <ActivityIndicator size="small" color="#fff" />
                          : <Text style={styles.textButton}> Batal Ikuti </Text>
                      }
                    </TouchableHighlight>
                }
              </View>


              <View style={{ flexDirection: 'row', padding: 15, paddingLeft: 20, backgroundColor: defaultBackgroundColor }}>
                <Image source={{ uri: this.state.data.tbl_room.thumbnail }} style={styles.thumbnail} />
                <View style={{ justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{this.state.data.tbl_room.room}</Text>
                </View>
              </View>
              <ScrollView style={{ height: '100%' }}>
                {
                  this.state.eventResponses.length !== 0 && <View style={{ padding: 20 }}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Partisipan {this.state.eventResponses.length > 2 && <Text>( {this.state.eventResponses.length} )</Text>}</Text>
                    {
                      this.state.eventResponses.map((el, index) => (
                        <View key={index} style={{ marginBottom: 10 }}>
                          {
                            el.tbl_user && <View style={{ flexDirection: 'row' }} >
                              <Thumbnail small source={{ uri: el.tbl_user.tbl_account_detail.avatar }} />
                              <View style={{ flexDirection: 'column', marginLeft: 8, top: -5 }}>
                                <View style={{ flexDirection: 'row' }}>
                                  <Text style={{ fontWeight: 'bold' }}>{el.tbl_user.tbl_account_detail.fullname} </Text>
                                  <Text>({el.response})</Text>
                                </View>
                                <Text style={{ color: 'gray' }}>({el.tbl_user.email})</Text>
                              </View>
                            </View>
                          }
                        </View>
                      ))
                    }
                  </View>
                }
              </ScrollView>
            </>
            : <>
              <Loading />
            </>
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    height: 40,
    width: 50,
    marginRight: 10,
    borderRadius: 3
  },
  button: {
    width: 100,
    backgroundColor: '#A2A2A2',
    padding: 8,
    justifyContent: 'center',
    borderRadius: 20
  },
  textButton: {
    color: 'white',
    textAlign: 'center'
  }
})

const mapStateToProps = ({ user_id }) => {
  return {
    user_id
  }
}

export default connect(mapStateToProps)(detailBookingRoom)