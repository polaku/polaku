import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Thumbnail } from 'native-base';
import { API } from '../../../config/API';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../../components/loading';

export default class detailBookingRoom extends Component {
  state = {
    data: {},
    eventResponses: [],
    proses: false,
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem("token")
    this.setState({
      proses: true
    })
    API.get(`/bookingRoom/${this.props.navigation.getParam("room_booking_id")}`, { headers: { token } })
      .then(({ data }) => {
        this.setState({
          data: data.data,
          eventResponses: data.eventResponses,
          proses: false
        })
        console.log(this.state.data);
      })
      .catch(err => {
        this.setState({
          proses: false
        })
        console.log(err);
        alert("Please try again")
      })
  }

  render() {
    return (
      <View style={{ height: '100%', padding: 20 }}>
        {
          !this.state.proses
            ? <>
              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                {
                  this.state.data.tbl_user && <Thumbnail medium source={{ uri: this.state.data.tbl_user.tbl_account_detail.avatar }} />
                }
                <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold' }}>Nama Pemesan</Text>
                  {
                    this.state.data.tbl_user && <Text>{this.state.data.tbl_user.tbl_account_detail.fullname}</Text>
                  }
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                {
                  this.state.data.tbl_room && <Image source={{ uri: this.state.data.tbl_room.thumbnail }} style={styles.thumbnail} />
                }
                <View>
                  <Text style={{ fontWeight: 'bold' }}>Tanggal</Text>
                  <Text>  {this.state.data.date_in}</Text>
                  <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Waktu Mulai</Text>
                  <Text>  {this.state.data.time_in}</Text>
                  <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Waktu Selesai</Text>
                  <Text>  {this.state.data.time_out}</Text>
                </View>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Agenda</Text>
                <Text>  {this.state.data.subject}</Text>
              </View>
              {
                this.state.eventResponses.length !== 0 && <View>
                  <Text style={{ fontWeight: 'bold' }}>Partisipan</Text>
                  {
                    this.state.eventResponses.map((el, index) => (
                      <View style={{ flexDirection: 'row' }} key={index}>
                        <Text>{index + 1}. </Text>
                        <Text>{el.tbl_user.tbl_account_detail.fullname} </Text>
                        <Text>({el.response})</Text>
                      </View>
                    ))
                  }
                </View>
              }
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
    height: 130,
    width: 130,
    marginRight: 10,
    borderRadius: 3
  },
})