import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Thumbnail } from 'native-base';
import { defaultColor, defaultBackgroundColor } from '../defaultColor';
import { API } from '../../config/API'
import AsyncStorage from '@react-native-community/async-storage';
import CountDown from 'react-native-countdown-component';

class cardTugas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 0
    }
  }

  componentDidMount() {
    if (this.props.data) {
      if (this.props.data.status === 'new') {
        this.setState({
          countdown: (new Date(this.props.data.created_expired_date) - new Date()) / 1000
        })
      } else if (this.props.data.status === 'assigned') {
        this.setState({
          countdown: (new Date(this.props.data.assigned_expired_date) - new Date()) / 1000
        })
      } else if (this.props.data.status === 'confirmation') {
        this.setState({
          countdown: (new Date(this.props.data.done_expired_date) - new Date()) / 1000
        })
      }
    }
  }

  done = async () => {
    let token = await AsyncStorage.getItem('token')

    API.get(`/contactUs/done/${this.props.data.contact_id}`,
      {
        headers: { token }
      })
    this.props.fetchData()
    this.props.navigation.goBack()
  }

  navigateDetailTugas = () => {
    this.props.navigation.navigate("DetailTugas", { data: this.props.data })
    // console.log(this.props)
  }

  assign = async () => {

    let token = await AsyncStorage.getItem('token')
    try {
      await API.get(`/contactUs/assigned/${this.props.data.contact_id}`, { headers: { token } })

      this.props.fetchData()
    } catch (err) {
      alert('please try again')
      console.log(err);
    }
  }

  taken = async () => {

    let token = await AsyncStorage.getItem('token')
    try {
      await API.get(`/contactUs/taken/${this.props.data.contact_id}`, { headers: { token } })

      this.props.fetchData()
    } catch (err) {
      alert('please try again')
      console.log(err);
    }
  }

  confirmation = async () => {

    let token = await AsyncStorage.getItem('token')
    try {
      await API.get(`/contactUs/confirmation/${this.props.data.contact_id}`, { headers: { token } })

      this.props.fetchData()
    } catch (err) {
      alert('please try again')
      console.log(err);
    }
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
      <TouchableHighlight style={styles.container} onPress={this.navigateDetailTugas} underlayColor="transparent">
        <View>
          {
            this.props.data && <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '70%' }}>
                {
                  !this.props.ongoing
                    ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {
                        this.props.data.tbl_user && <Thumbnail small source={{ uri: this.props.data.tbl_user.tbl_account_detail.avatar }} />
                      }
                      <Text style={{ marginLeft: 10, fontSize: 15 }}>{this.props.data.name}</Text>
                    </View>
                    : <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: 15 }}>status :</Text>
                      <Text style={{ marginLeft: 10, fontSize: 15 }}>{this.props.data.status}</Text>
                    </View>
                }
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 21, fontWeight: 'bold' }}>{this.props.data.tbl_contact_category.contact_categories} </Text>
                  <Text style={{ marginBottom: 3 }}> {this.props.data.subject}</Text>
                </View>
                <Text style={{ fontSize: 12 }}>{new Date(this.props.data.created_at).getHours()}:{new Date(this.props.data.created_at).getMinutes()} {getDate(this.props.data.created_at)}</Text>
              </View>
              <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                {
                  this.props.data.status !== 'ongoing' && this.props.data.status !== 'done' &&
                  <>{
                    this.state.countdown >= 0
                      ? <CountDown
                        until={this.state.countdown}
                        // onFinish={() => this.setState({countdown:0})}
                        digitStyle={{ backgroundColor: '#FFF', width: 'auto' }}
                        separatorStyle={{ color: 'black' }}
                        size={15}
                        timeLabels={{ h: null, m: null, s: null }}
                        showSeparator
                        timeToShow={['H', 'M', 'S']}
                      />
                      : <View style={{ backgroundColor: 'red', width: '100%', marginBottom: 5, borderRadius: 3 }}>
                        <Text style={{ color: 'white', alignSelf: 'center' }}>Urgent !</Text>
                      </View>
                  }</>
                }
                {
                  this.props.index === 0 && !this.props.permintaan && this.props.adminContactCategori && <TouchableHighlight style={{ paddingHorizontal: 5, paddingVertical: 3, borderRadius: 10, borderWidth: 1, borderColor: defaultColor, alignItems: 'center', width: '100%', justifyContent: 'center' }} underlayColor="transparent" onPress={this.assign}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: defaultColor }}> Accept </Text>
                      <Text style={{ color: defaultColor }}> Task </Text>
                    </View>
                  </TouchableHighlight>
                }
                {
                  this.props.index === 1 && !this.props.permintaan && this.props.adminContactCategori && <TouchableHighlight style={{ paddingHorizontal: 5, paddingVertical: 3, borderRadius: 10, borderWidth: 1, borderColor: defaultColor, alignItems: 'center', width: '100%', justifyContent: 'center' }} underlayColor="transparent" onPress={this.taken}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: defaultColor }}> Start </Text>
                      <Text style={{ color: defaultColor }}> Working </Text>
                    </View>
                  </TouchableHighlight>
                }
                {
                  this.props.index === 2 && !this.props.permintaan && this.props.adminContactCategori && <TouchableHighlight style={{ paddingHorizontal: 5, paddingVertical: 3, borderRadius: 10, borderWidth: 1, borderColor: defaultColor, alignItems: 'center', width: '100%', justifyContent: 'center' }} underlayColor="transparent" onPress={this.confirmation}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: defaultColor }}> Task </Text>
                      <Text style={{ color: defaultColor }}> Done </Text>
                    </View>
                  </TouchableHighlight>
                }
                {/* {
                  this.props.index === 3 && !this.props.permintaan && <TouchableHighlight style={{ paddingHorizontal: 5, paddingVertical: 3, borderRadius: 10, borderWidth: 1, borderColor: defaultColor, alignItems: 'center', width: '100%', justifyContent: 'center' }} underlayColor="transparent" onPress={this.done}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: defaultColor }}> Done </Text>
                    </View>
                  </TouchableHighlight>
                } */}
                {
                  this.props.permintaan && this.props.adminContactCategori && <TouchableHighlight style={{ paddingHorizontal: 5, paddingVertical: 3, borderRadius: 10, borderWidth: 1, borderColor: defaultColor, alignItems: 'center', width: '100%', justifyContent: 'center' }} underlayColor="transparent" onPress={() => this.changeCategory(el)}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: defaultColor }}> TERIMA </Text>
                      <Text style={{ color: defaultColor }}> TUGAS </Text>
                    </View>
                  </TouchableHighlight>
                }

              </View>
            </View>
          }
        </View>
      </TouchableHighlight >
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

const mapStateToProps = ({ adminContactCategori }) => {
  return {
    adminContactCategori
  }
}

export default connect(mapStateToProps)(cardTugas) 