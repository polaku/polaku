import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Thumbnail, Button } from 'native-base';
import { defaultColor, defaultBackgroundColor } from '../../defaultColor';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class detailPermintaanHRD extends Component {
  state = {
    data: {},
    keterangan: '',
    waktu: '',
    isIMP: false,
    isCuti: false,
    isIA: false,
    availableToCancel: false,
    fromDashboard: false,
  }

  componentDidMount() {
    if (this.props.navigation.getParam('task').date_ijin_absen_start) {
      let selisih = new Date(this.props.navigation.getParam('task').date_ijin_absen_end).getDate() - new Date(this.props.navigation.getParam('task').date_ijin_absen_start).getDate() + 1

      this.setState({
        isIA: true,
        keterangan: `${selisih} hari`,
        // waktu: `${this.getWaktu(this.props.navigation.getParam('task').date_ijin_absen_start)} - ${this.getWaktu(this.props.navigation.getParam('task').date_ijin_absen_end)}`,
        waktu: `${this.props.navigation.getParam('task').date_ijin_absen_start} - ${this.props.navigation.getParam('task').date_ijin_absen_end}`,
        data: this.props.navigation.getParam('task')
      })
    } else if (this.props.navigation.getParam('task').leave_request) {
      this.setState({
        isCuti: true,
        // waktu: this.getWaktu(this.props.navigation.getParam('task').leave_date),
        waktu: this.props.navigation.getParam('task').leave_date,
        keterangan: `${this.props.navigation.getParam('task').leave_request} hari`,
        data: this.props.navigation.getParam('task')
      })
    } else if (this.props.navigation.getParam('task').date_imp) {
      let selisih = this.props.navigation.getParam('task').end_time_imp.split(':')[0] - this.props.navigation.getParam('task').start_time_imp.split(':')[0]
      this.setState({
        isIMP: true,
        category: 'IMP',
        keterangan: `${selisih} jam`,
        waktu: `${this.props.navigation.getParam('task').start_time_imp.slice(0, 5)} - ${this.props.navigation.getParam('task').end_time_imp.slice(0, 5)}`,
        data: this.props.navigation.getParam('task')
      })
    }

    if (this.props.navigation.getParam('task').status === 'new' || this.props.navigation.getParam('task').status === 'new2') this.setState({ availableToCancel: true })
    if (this.props.navigation.getParam('fromDashboard')) this.setState({ fromDashboard: true })

  }

  getWaktu = args => {
    let newArgs = args.split(',')
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date(newArgs[0]).getDate()
    let month = months[new Date(newArgs[0]).getMonth()]
    let years = new Date(newArgs[0]).getFullYear()

    return `${date} ${month} ${years}`
  }

  pembatalan = async () => {
    this.props.navigation.navigate('PembatalanPermintaan', { data: this.state.data })
  }

  actionEvaluator = args => {

  }

  render() {
    return (
      <>
        <ScrollView style={{ height: '100%', backgroundColor: defaultBackgroundColor }}>
          {
            this.state.data &&
            <>
              <View style={{ paddingVertical: 30, paddingHorizontal: 15 }}>
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: 10 }}>
                  <View style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: defaultColor, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name='calendar-blank' style={{ color: 'white' }} size={30} />
                  </View>
                  {
                    this.state.isIA && <>
                      <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Tanggal mulai</Text>
                        {/* <Text>{this.getWaktu(this.state.data.date_ijin_absen_start)}</Text> */}
                        <Text>{this.state.data.date_ijin_absen_start}</Text>
                      </View>
                      <View style={{ marginLeft: 15 }} >
                        <Text style={{ fontWeight: 'bold' }}>Tanggal berakhir</Text>
                        {/* <Text>{this.getWaktu(this.state.data.date_ijin_absen_end)}</Text> */}
                        <Text>{this.state.data.date_ijin_absen_end}</Text>
                      </View>
                    </>
                  }
                  {
                    this.state.isCuti && <>
                      <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Tanggal mulai</Text>
                        {/* <Text>{this.getWaktu(this.state.data.leave_date)}</Text> */}
                        <Text>{this.state.data.leave_date}</Text>
                      </View>
                    </>
                  }
                  {
                    this.state.isIMP && <View style={{ flexDirection: 'column' }}>
                      <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Tanggal IMP</Text>
                        {/* <Text>{this.getWaktu(this.state.data.date_imp)}</Text> */}
                        <Text>{this.state.data.date_imp}</Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginLeft: 10 }}>
                          <Text style={{ fontWeight: 'bold' }}>Jam keluar</Text>
                          <Text>{this.state.data.start_time_imp.slice(0, 5)}</Text>
                        </View>
                        <View style={{ marginLeft: 15 }} >
                          <Text style={{ fontWeight: 'bold' }}>Jam masuk</Text>
                          <Text>{this.state.data.end_time_imp.slice(0, 5)}</Text>
                        </View>
                      </View>
                    </View>
                  }

                </View>
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: 10 }}>
                  <View style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: defaultColor, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name='alarm' style={{ color: 'white' }} size={30} />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Lama</Text>
                    <Text>{this.state.keterangan}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: 10 }}>
                  <View style={{ height: 60, width: 60, borderRadius: 40, backgroundColor: defaultColor, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <MaterialCommunityIcons name='alpha-i' style={{ color: 'white' }} size={30} /> */}
                    <Text style={{ fontSize: 28, color: 'white' }}>i</Text>
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Tipe ijin</Text>
                    {
                      this.state.data.tbl_categori && <Text>{this.state.data.tbl_categori.sub_categori}</Text>
                    }
                  </View>
                </View>
                <View>
                  <Text>Alasan:</Text>
                  <Text>{this.state.data.message}</Text>
                </View>
              </View>

              {
                this.state.data.status === 'cancel' && <>
                  <View style={{ borderWidth: 0.5, borderColor: 'gray' }} />
                  <Text style={{ fontWeight: 'bold', margin: 15, color: defaultColor }}>Daftar Pembatalan</Text>
                  <View style={{ borderWidth: 0.5, borderColor: 'gray' }} />

                  <View style={{ margin: 15 }}>
                    <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: 'bold' }}>Alasan</Text>
                    <Text style={{ marginLeft: 10, fontSize: 15 }}>{this.state.data.cancel_reason}</Text>
                    {/* <Text style={{ marginLeft: 10, fontSize: 14, color: 'gray' }}>{this.getWaktu(this.state.data.cancel_date)}</Text> */}
                    <Text style={{ marginLeft: 10, fontSize: 14, color: 'gray' }}>{this.state.data.cancel_date}</Text>

                  </View>
                </>
              }

              {
                ((this.state.data.evaluator1 && this.state.data.status === 'new2') || (this.state.data.status === 'approved' && !this.state.data.evaluator2 && this.state.data.evaluator1)) && <>
                  <View style={{ borderWidth: 0.5, borderColor: 'gray' }} />
                  <Text style={{ fontWeight: 'bold', margin: 15 }}>Daftar Persetujuan</Text>
                  <View style={{ borderWidth: 0.5, borderColor: 'gray' }} />

                  <View style={{ flexDirection: 'row', margin: 15, alignItems: 'center' }}>
                    {
                      this.state.data.evaluator1 && <Thumbnail medium source={{ uri: this.state.data.evaluator1.tbl_account_detail.avatar }} />
                    }

                    <View style={{ width: '65%' }}>
                      {
                        this.state.data.evaluator1
                          ? <Text style={{ marginLeft: 10, fontSize: 15 }}>{this.state.data.evaluator1.tbl_account_detail.fullname}</Text>
                          : <Text>name_evaluator_1</Text>
                      }
                      <Text style={{ marginLeft: 10, fontSize: 15 }}>atasan langsung</Text>
                    </View>
                    <View>
                      <Text>disetujui</Text>
                    </View>
                  </View>
                </>
              }
              {
                this.state.data.status === 'approved' && this.state.data.evaluator2 &&
                <View style={{ flexDirection: 'row', margin: 15, alignItems: 'center' }}>
                  <Thumbnail medium source={{ uri: this.state.data.evaluator2.tbl_account_detail.avatar }} />
                  <View style={{ width: '65%' }}>
                    {
                      this.state.data.evaluator2
                        ? <Text style={{ marginLeft: 10, fontSize: 15 }}>{this.state.data.evaluator2.tbl_account_detail.fullname}</Text>
                        : <Text>name_evaluator_2</Text>
                    }
                    <Text style={{ marginLeft: 10, fontSize: 15 }}>atasan langsung</Text>
                  </View>
                  <View>
                    <Text>disetujui</Text>
                  </View>
                </View>
              }
            </>
          }
        </ScrollView>
        {
          ((this.props.user_id === this.state.data.user_id) && this.state.availableToCancel && !this.state.fromDashboard) &&
          <Button full style={{ backgroundColor: defaultColor }} onPress={this.pembatalan}>
            {
              this.state.proses
                ? <ActivityIndicator size="small" color="#fff" />
                : <Text style={{ color: 'white' }}>Ajukan Pembatalan</Text>
            }
          </Button>
        }
        {/* {
          (this.props.isEvaluator && this.state.fromDashboard ) && <View style={{ padding: 5, backgroundColor: 'red' }}>
            <Button block style={{ backgroundColor: defaultBackgroundColor }} onPress={() => this.actionEvaluator('reject')}>
              {
                this.state.proses
                  ? <ActivityIndicator size="small" color="#000" />
                  : <Text>Reject</Text>
              }
            </Button>
            <Button block style={{ backgroundColor: 'green' }} onPress={() => this.actionEvaluator('accept')}>
              {
                this.state.proses
                  ? <ActivityIndicator size="small" color="#fff" />
                  : <Text style={{ color: 'white' }}>Accept</Text>
              }
            </Button>
          </View>
        } */}
      </>
    )
  }
}

const mapStateToProps = ({ user_id, isEvaluator }) => {
  return {
    user_id,
    isEvaluator,
  }
}
export default connect(mapStateToProps)(detailPermintaanHRD)