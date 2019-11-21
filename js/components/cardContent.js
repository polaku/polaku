import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableHighlight } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { defaultColor } from '../defaultColor';
import AsyncStorage from '@react-native-community/async-storage';

import { API } from '../../config/API';

import { fetchDataMyTask } from '../store/action';

class cardContent extends Component {
  state = {
    waktu: '',
    selisihWaktu: '',
    keterangan: '',
  }

  rejected = async () => {
    let token = await AsyncStorage.getItem('token')
    API.get(`/contactUs/rejected/${this.props.data.contact_id}`, { headers: { token } })
      .then(async () => {
        let newData = {
          user_id: this.props.user_id,
          adminContactCategori: this.props.adminContactCategori
        }
        await this.props.fetchDataMyTask(newData)
      })
      .catch(err => {
        alert(err)
      })
  }

  approved = async () => {
    let newStatus, token = await AsyncStorage.getItem('token')
    if (this.props.data.status === 'new') {
      newStatus = 'new2'
    } else if (this.props.data.status === 'new2') {
      newStatus = 'approved'
    }

    API.put(`/contactUs/approved/${this.props.data.contact_id}`, { status: newStatus }, { headers: { token } })
      .then(async () => {
        let newData = {
          user_id: this.props.user_id,
          adminContactCategori: this.props.adminContactCategori
        }
        await this.props.fetchDataMyTask(newData)
      })
      .catch(err => {
        alert(err)
      })
  }

  detail = () => {
    if (this.props.data.date_imp !== null || this.props.data.leave_date !== null || this.props.data.date_ijin_absen_start !== null) {
      this.props.data.navigation.navigate("DetailPermintaan", {
        task: this.props.data,
        fromDashboard: true
      })
    } else {
      this.props.data.navigation.navigate('DetailHubungiKami', { data: this.props.data })
    }
  }

  componentDidMount() {
    if (this.props.data.date_ijin_absen_start) {
      let selisih = (new Date(this.props.data.date_ijin_absen_end).getDate() - new Date(this.props.data.date_ijin_absen_start).getDate()) + 1

      this.setState({
        selisihWaktu: `${selisih} hari`,
        // waktu: `${this.getWaktu(this.props.data.date_ijin_absen_start)}`
        waktu: `${this.props.data.date_ijin_absen_start.slice(0, 10)}`
      })
    } else if (this.props.data.leave_request) {
      this.setState({
        selisihWaktu: `${this.props.data.leave_request} hari`,
        // waktu: `${this.getWaktu(this.props.data.leave_date)}`
        waktu: `${this.props.data.leave_date}`
      })
    } else if (this.props.data.date_imp) {
      let selisih = this.props.data.end_time_imp.split(':')[0] - this.props.data.start_time_imp.split(':')[0]

      this.setState({
        selisihWaktu: `${selisih} jam`,
        // waktu: `${this.getWaktu(this.props.data.date_imp)}`
        waktu: `${this.props.data.date_imp}`
      })
    }

    if (this.props.data.status === 'new' || this.props.data.status === 'new2') {
      this.setState({
        keterangan: 'proses'
      })
    } else if (this.props.data.status === 'approved') {
      this.setState({
        keterangan: 'disetujui'
      })
    } else if (this.props.data.status === 'rejected') {
      this.setState({
        keterangan: 'ditolak'
      })
    } else if (this.props.data.status === 'cancel') {
      this.setState({
        keterangan: 'dibatalkan'
      })
    }
    console.log(this.props.data);
  }

  getWaktu = args => {
    let newArgs = args.split(',')
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let date = new Date(newArgs[0]).getDate()
    let month = months[new Date(newArgs[0]).getMonth()]
    let years = new Date(newArgs[0]).getFullYear()

    return `${date} ${month} ${years}`
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', width: '100%', backgroundColor: 'white', marginBottom: 5, padding: 10, justifyContent: 'space-between', alignItems: 'center' }}>
        {
          this.props.tugas
            ? <>
              {
                (this.props.data.pertanyaanForMe || this.props.data.permintaanForMe)
                  ? <Text style={{ fontSize: 14, width: '70%' }}>
                    {this.props.data.name}
                  </Text>
                  : this.props.data.contact_categories_id === 4
                    ? <Text style={{ fontSize: 14, width: '70%' }}>
                      {this.props.data.name} - {this.props.data.tbl_categori.sub_categori}
                    </Text>
                    : <Text style={{ fontSize: 14, width: '70%' }}>
                      {this.props.data.title}
                    </Text>
              }
              {
                (this.props.data.pertanyaanForMe || this.props.data.permintaanForMe)
                  ? <TouchableHighlight onPress={this.detail} underlayColor="transparent">
                    <Text style={{ color: defaultColor }}>detail</Text>
                  </TouchableHighlight>
                  : <View style={{ flexDirection: 'row', alignItems: 'center', width: '30%', justifyContent: 'center' }}>
                    <TouchableHighlight onPress={this.rejected} underlayColor="transparent">
                      <FontAwesome name="close" style={{ color: 'red' }} size={35} />
                    </TouchableHighlight>
                    <View style={{ borderLeftWidth: 1, height: 25, borderLeftColor: defaultColor, marginLeft: 10, marginRight: 10 }} />
                    <TouchableHighlight onPress={this.approved} underlayColor="transparent">
                      <FontAwesome name="check" style={{ color: 'green' }} size={35} />
                    </TouchableHighlight>
                  </View>
              }
            </>
            : <>
              {
                this.props.data.pengajuanIjin
                && this.props.data.tbl_categori && <Text style={{ fontSize: 14, width: '75%' }} numberOfLines={1}>
                  {this.props.data.tbl_categori.sub_categori} ({this.state.selisihWaktu}) - {this.state.waktu.slice(0,10)}
                </Text>
              }
              {
                (this.props.data.permintaan || this.props.data.pertanyaan)
                && <Text numberOfLines={1} style={{ width: '75%' }}>{this.props.data.message}</Text>
              }
              {
                this.props.data.pertanyaan
                  ? <Text style={{ color: defaultColor }}>{this.props.data.status}</Text>
                  : this.state.keterangan
                    ? <Text style={{ color: defaultColor }}>{this.state.keterangan}</Text>
                    : <Text style={{ color: defaultColor }}>{this.props.data.status}</Text>
              }
            </>
        }
      </View>
    )
  }
}

const mapDispatchToProps = {
  fetchDataMyTask
}

const mapStateToProps = ({ user_id, adminContactCategori }) => {
  return {
    user_id,
    adminContactCategori
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(cardContent)