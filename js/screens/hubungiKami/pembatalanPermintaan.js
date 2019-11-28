import React, { Component } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Button, Input } from 'native-base';
import { defaultColor, defaultBackgroundColor } from '../../defaultColor';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-community/async-storage';

import { API } from '../../../config/API';

export default class pembatalanPermintaan extends Component {
  state = {
    waktu: '',
    keterangan: '',
    reason: '',
  }

  cancel = async () => {
    if (this.state.reason) {

      let token = await AsyncStorage.getItem('token')
      this.setState({ proses: true })
      API.put(`/contactUs/cancel/${this.props.navigation.getParam('data').contact_id}`, { reason: this.state.reason }, { headers: { token } })
        .then(() => {
          this.setState({ proses: false })
          Alert.alert('', 'Berhasil dibatalkan')

          this.props.navigation.goBack()
        })
        .catch(err => {
          this.setState({ proses: false })

          Alert.alert("Error", "please try again");
        })
    } else {
      Alert.alert("Alert", "harap di isi alasan pembatalan");
    }
  }

  componentDidMount() {
    if (this.props.navigation.getParam('data').date_ijin_absen_start) {
      this.setState({
        keterangan: 'Ijin Absen',
        // waktu: `${this.getWaktu(this.props.navigation.getParam('data').date_ijin_absen_start)} - ${this.getWaktu(this.props.navigation.getParam('data').date_ijin_absen_end)}`,
        waktu: `${this.props.navigation.getParam('data').date_ijin_absen_start} - ${this.props.navigation.getParam('data').date_ijin_absen_end}`,
      })
    } else if (this.props.navigation.getParam('data').leave_request) {
      this.setState({
        keterangan: 'Cuti',
        // waktu: this.getWaktu(this.props.navigation.getParam('data').leave_date),
        waktu: this.props.navigation.getParam('data').leave_date,
      })
    } else if (this.props.navigation.getParam('data').date_imp) {
      this.setState({
        keterangan: 'IMP',
        waktu: `${this.props.navigation.getParam('data').start_time_imp.slice(0, 5)} - ${this.props.navigation.getParam('data').end_time_imp.slice(0, 5)}`,
      })
    }
  }

  getWaktu = args => {
    let newArgs = args.split(',')
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date(newArgs[0]).getDate()
    let month = months[new Date(newArgs[0]).getMonth()]
    let years = new Date(newArgs[0]).getFullYear()

    return `${date} ${month} ${years}`
  }

  render() {
    return (
      <View style={{ backgroundColor: defaultBackgroundColor, padding: 20, height: '100%', alignItems: 'center' }}>
        <ScrollView style={{ width: '100%', height: 250 }}>
          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: defaultColor, justifyContent: 'center', alignItems: 'center' }}>
              {/* <MaterialCommunityIcons name='alpha-i' style={{ color: 'white' }} size={30} /> */}
              <Text style={{ fontSize: 28, color: 'white' }}>i</Text>
            </View>
            <View>
              <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Tipe Ijin</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginLeft: 10 }}>
                  <Text>{this.state.keterangan}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: defaultColor, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name='calendar-blank' style={{ color: 'white' }} size={30} />
            </View>
            <View>
              <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Tanggal yang ingin dibatalkan</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginLeft: 10 }}>
                  <Text>{this.state.waktu}</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={{ fontWeight: 'bold' }}>Alasan pembatalan</Text>
          <Input numberOfLines={5} style={{
            width: '100%', height: 100, borderWidth: 0.2, borderRadius: 5, marginTop: 10, textAlignVertical: 'top',
          }} placeholder='kenapa dibatalkan?' onChangeText={(text) => this.setState({ reason: text })} multiline={true} />
        </ScrollView>
        <View style={{ width: '100%', bottom: 0 }}>
          <Button block light style={{ marginBottom: 10 }} onPress={this.cancel}>
            <Text style={{ color: 'red' }}>Batal</Text>
          </Button>
          <Button block success onPress={this.cancel}>
            <Text style={{ color: 'white' }}>Ajukan</Text>
          </Button>
        </View>
      </View>
    )
  }
}
