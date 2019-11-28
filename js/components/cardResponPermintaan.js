import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableHighlight, ActivityIndicator, Alert } from 'react-native';
import { Thumbnail } from 'native-base';
import { defaultColor } from '../defaultColor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { API } from '../../config/API';
import AsyncStorage from '@react-native-community/async-storage';

import { fetchDataMyTask } from '../store/action';

class cardResponPermintaan extends Component {
  state = {
    isCuti: false,
    status: '',
    keterangan: '',
    waktu: '',
    category: '',
    status: 0
  }

  componentDidMount() {
    if (this.props.data.date_ijin_absen_start) {
      let selisih = new Date(this.props.data.date_ijin_absen_end).getDate() - new Date(this.props.data.date_ijin_absen_start).getDate() + 1

      this.setState({
        category: 'IA',
        keterangan: `${selisih} hari`,
        // waktu: `${this.getWaktu(this.props.data.date_ijin_absen_start)} - ${this.getWaktu(this.props.data.date_ijin_absen_end)}`
        waktu: `${this.props.data.date_ijin_absen_start} - ${this.props.data.date_ijin_absen_end}`
      })
    } else if (this.props.data.leave_request) {
      this.setState({
        isCuti: true,
        // waktu: this.getWaktu(this.props.data.leave_date),
        waktu: this.props.data.leave_date,
        keterangan: `${this.props.data.leave_request} hari`,
        category: 'Cuti'
      })
    } else if (this.props.data.date_imp) {
      let selisih = this.props.data.end_time_imp.split(':')[0] - this.props.data.start_time_imp.split(':')[0]
      this.setState({
        category: 'IMP',
        keterangan: `${selisih} jam`,
        waktu: `${this.props.data.start_time_imp.slice(0, 5)} - ${this.props.data.end_time_imp.slice(0, 5)}`
      })
    }

    if (this.props.data.status === 'new') {
      this.setState({
        status: 'Menunggu approval evaluator 1'
      })
    } else if (this.props.data.status === 'new2') {
      this.setState({
        status: 'Menunggu approval evaluator 2'
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

  navigateDetailPermintaan = () => {
    this.props.navigation.navigate('DetailPermintaan', { task: this.props.data })
  }

  rejected = async () => {
    let token = await AsyncStorage.getItem('token')
    this.setState({
      proses: true
    })
    API.get(`/contactUs/rejected/${this.props.data.contact_id}`, { headers: { token } })
      .then(async () => {
        this.props.refresh()
        this.setState({
          proses: false
        })
        let newData = {
          user_id: this.props.user_id,
          adminContactCategori: this.props.adminContactCategori
        }
        await this.props.fetchDataMyTask(newData)
      })
      .catch(err => {
        this.setState({
          proses: false
        })
        Alert.alert('Error', `${err}`)
      })
  }

  approved = async () => {
    let newStatus, token = await AsyncStorage.getItem('token')
    if (this.props.data.status === 'new') {
      newStatus = 'new2'
    } else if (this.props.data.status === 'new2') {
      newStatus = 'approved'
    }
    this.setState({
      proses: true
    })

    API.put(`/contactUs/approved/${this.props.data.contact_id}`, { status: newStatus }, { headers: { token } })
      .then(async () => {
        this.props.refresh()
        this.setState({
          proses: false
        })
        let newData = {
          user_id: this.props.user_id,
          adminContactCategori: this.props.adminContactCategori
        }
        await this.props.fetchDataMyTask(newData)
      })
      .catch(err => {
        this.setState({
          proses: false
        })
        Alert.alert('Error', `${err}`)
      })
  }

  render() {
    return (
      <TouchableHighlight style={styles.container} onPress={this.navigateDetailPermintaan} underlayColor="transparent">
        <View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: this.props.status === 0 ? '60%' : '100%' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                  this.props.data.tbl_user && <Thumbnail small source={{ uri: this.props.data.tbl_user.tbl_account_detail.avatar }} />
                }

                <Text style={{ marginLeft: 10, fontSize: 15 }}>{this.props.data.name}</Text>
                {
                  this.state.isCuti && <Text style={{ marginLeft: 10, fontSize: 12, color: defaultColor }}>sisa cuti: {this.props.sisaCuti} hari</Text>
                }
              </View>
              {
                this.props.status === 1 && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 15 }}>status : {this.state.status}</Text>
                </View>
              }
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', width: '85%' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{this.state.category} </Text>
                <Text numberOfLines={1} style={{ fontSize: 15, marginBottom: 4 }}> {this.state.keterangan} | {this.state.waktu}</Text>
              </View>
            </View>
            {
              this.props.status === 0 && this.state.proses
                ? <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
                  <ActivityIndicator size="small" />
                </View>
                : <View style={{ flexDirection: 'row', width: '40%', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <TouchableHighlight onPress={this.rejected} underlayColor="transparent">
                    <FontAwesome name="close" style={{ color: 'red' }} size={35} />
                  </TouchableHighlight>
                  <View style={{ borderLeftWidth: 1, height: 25, borderLeftColor: defaultColor, marginLeft: 10, marginRight: 10 }} />
                  <TouchableHighlight onPress={this.approved} underlayColor="transparent">
                    <FontAwesome name="check" style={{ color: 'green' }} size={35} />
                  </TouchableHighlight>
                </View>
            }
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: '95%'
  },
})

const mapDispatchToProps = {
  fetchDataMyTask
}

const mapStateToProps = ({ user_id, adminContactCategori, sisaCuti }) => {
  return {
    user_id,
    adminContactCategori,
    sisaCuti
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(cardResponPermintaan)