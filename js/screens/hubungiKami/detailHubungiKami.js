import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Tab, Tabs, ScrollableTab, Thumbnail, Input, Icon, Button } from 'native-base';
import { defaultColor, defaultBackgroundColor } from '../../defaultColor';

import AsyncStorage from '@react-native-community/async-storage';

import { API } from '../../../config/API';

class detailTugas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chat: '',
      timeline: [],
      discussion: [],
      data: {},
      ongoing: false,
      isPermintaanForHRD: false,
      proses: false,
    }
  }

  async componentDidMount() {
    let temp = await this.props.navigation.getParam('data')
    let tempTimeline = []

    temp.status === 'cancel' && tempTimeline.push({ status: 'Cancel', time: temp.cancel_date })

    temp.status === 'done' && tempTimeline.push({ status: 'Done', time: temp.done_date })

    temp.done_date && tempTimeline.push({ status: 'Confirmation' })

    temp.taken_date && tempTimeline.push({ status: 'On Going', time: temp.taken_date })

    temp.assigned_date && tempTimeline.push({ status: 'Assigned', time: temp.assigned_date })

    tempTimeline.push({ status: 'Awaiting reply', time: temp.created_at })

    this.setState({
      data: temp,
      timeline: tempTimeline,
    })

    if (this.props.navigation.getParam('ongoing')) this.setState({ ongoing: true })

    await this.fetchDiscussion()
  }

  fetchDiscussion = async () => {
    let token = await AsyncStorage.getItem('token')
    await API.get(`/contactUs/discussion/${this.state.data.contact_id}`, { headers: { token } })
      .then(({ data }) => {
        this.setState({
          discussion: data.data
        })
      })
      .catch(err => {
        alert('please try again')
      })
  }

  sendMessage = async () => {
    let token = await AsyncStorage.getItem('token')

    let newData = {
      contact_id: this.state.data.contact_id,
      comment: this.state.chat
    }

    API.post(`/contactUs/discussion`, newData, { headers: { token } })
      .then(async ({ data }) => {
        console.log(data);
        this.setState({
          chat: '',
        })
        await this.fetchDiscussion()
      })
      .catch(err => {
        alert('please try again')
      })
  }

  pembatalan = async () => {
    if (this.state.isPermintaanForHRD) {
      this.props.navigation.navigate('PembatalanPermintaan', { data: this.state.data })
    } else {
      let token = await AsyncStorage.getItem('token')
      this.setState({ proses: true })
      API.put(`/contactUs/cancel/${this.state.data.contact_id}`, {}, { headers: { token } })
        .then(() => {
          this.setState({ proses: false })
          alert("Berhasil dibatalkan")
          this.props.navigation.goBack()
        })
        .catch(err => {
          this.setState({ proses: false })

          alert('please try again')
        })
    }
  }

  render() {
    function getWaktu(args) {
      let tgl = new Date(args).getDate()
      let bln = new Date(args).getMonth() + 1
      if (tgl < 10) {
        tgl = `0${tgl}`
      }
      if (bln < 10) {
        bln = `0${bln}`
      }
      return `${tgl}-${bln}-${new Date(args).getFullYear()}`
    }

    function validateFormat(args) {
      if (args < 10) {
        return `0${args}`
      } else {
        return args
      }
    }

    return (
      <View style={styles.container}>

        <Tabs renderTabBar={() => <ScrollableTab tabsContainerStyle={styles.tabsContainerStyle} />} tabBarUnderlineStyle={{ backgroundColor: defaultColor }}>
          <Tab heading="detail"
            tabStyle={styles.tab}
            textStyle={{ color: defaultColor }}
            activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
            activeTextStyle={styles.activeTextStyle}>
            <>
              <ScrollView style={{ height: '100%', backgroundColor: defaultBackgroundColor }}>
                <View style={{ padding: 20, margin: 10, backgroundColor: 'white' }}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ width: '85%' }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '35%' }}>Peminta</Text>
                        <Text style={{ width: '60%' }} numberOfLines={1}>: {this.state.data.name}</Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '35%' }}>Perusahaan</Text>
                        <Text style={{ width: '60%' }} numberOfLines={1}>: {this.state.data.tbl_company && this.state.data.tbl_company.company_name}</Text>
                      </View>
                    </View>
                    <View>
                      {
                        this.state.data.tbl_user && <Thumbnail small source={{ uri: this.state.data.tbl_user.tbl_account_detail.avatar }} />
                      }
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <Text>Pertanyaan:</Text>
                  <Text>{this.state.data.message}</Text>
                </View>

                <View style={{ padding: 20, margin: 10, backgroundColor: 'white' }}>
                  <Text style={{ color: defaultColor }}>Timeline Status:</Text>
                  <FlatList
                    keyExtractor={(item, index) => String(index)}
                    style={{ paddingTop: 5 }}
                    data={this.state.timeline}
                    renderItem={({ item }) => <View style={{ flexDirection: 'row' }}>
                      <View style={{ width: 35, alignItems: 'center', }}>
                        <View style={{ borderRadius: 15, backgroundColor: defaultColor, width: 18, height: 18 }} />
                        {
                          item.status != 'Awaiting reply' && <View
                            style={item.status != 'Confirmation' ? { ...styles.separator, height: 50 } : { ...styles.separator, height: 35 }}
                          />
                        }
                      </View>
                      <View>
                        {
                          item.time && <Text style={{ fontWeight: 'bold' }}>{item.time.split('T')[0]} {item.time.split('T')[1].split('.')[0]}</Text>
                        }
                        <Text>Question/Task submitted</Text>
                        <Text style={{ color: defaultColor, fontSize: 15 }}>{item.status}</Text>
                      </View>
                    </View>} />
                </View>
              </ScrollView>
              {
                (this.state.ongoing && this.props.user_id === this.state.data.user_id) &&
                <Button full style={{ backgroundColor: defaultColor }} onPress={this.pembatalan}>
                  {
                    this.state.proses
                      ? <ActivityIndicator size="small" color="#fff" />
                      : <Text style={{ color: 'white' }}>Ajukan Pembatalan</Text>
                  }
                </Button>
              }
            </>
          </Tab>
          <Tab heading="diskusi"
            tabStyle={styles.tab}
            textStyle={{ color: defaultColor }}
            activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
            activeTextStyle={styles.activeTextStyle}>
            <View style={{ justifyContent: 'space-between', height: '100%' }}>
              <FlatList
                inverted
                keyExtractor={item => String(item.contact_comment_id)}
                style={{ height: '88%' }}
                data={this.state.discussion}
                renderItem={({ item }) =>
                  <>
                    {
                      item.user_id === this.props.user_id
                        ? <View style={{ alignSelf: 'flex-end', margin: 5 }}>
                          <View style={{ backgroundColor: '#FFDFDF', maxWidth: '80%', padding: 10, borderRadius: 10 }}>
                            <Text>{item.comment}</Text>
                          </View>
                          <Text style={{ alignSelf: 'flex-end' }}>{getWaktu(item.created_at)} {validateFormat(new Date(item.created_at).getHours())}:{validateFormat(new Date(item.created_at).getMinutes())}</Text>
                        </View>
                        : <View style={{ alignSelf: 'flex-start', margin: 10 }}>
                          <Text style={{ fontWeight: 'bold', alignSelf: 'flex-start', }}>{item.tbl_user.tbl_account_detail.fullname} </Text>
                          <View style={{ backgroundColor: '#E8E8E8', maxWidth: '80%', padding: 10, borderRadius: 10 }}>
                            <Text>{item.comment}</Text>
                          </View>
                          <Text style={{ alignSelf: 'flex-start' }}>{getWaktu(item.created_at)} - {validateFormat(new Date(item.created_at).getHours())}:{validateFormat(new Date(item.created_at).getMinutes())}</Text>
                        </View>
                    }
                    {/* <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>dd:mm:yy</Text>  */}
                  </>
                } />
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: defaultBackgroundColor }}>
                <Input id='chat'
                  value={this.state.chat}
                  placeholder="tulis pesan"
                  style={{ backgroundColor: 'white', margin: 10, padding: 0, borderRadius: 10, paddingLeft: 10 }}
                  onChangeText={(text) => this.setState({
                    chat: text
                  })} />
                <TouchableHighlight onPress={this.sendMessage} underlayColor="transparent">
                  <Icon name='send' style={{ color: defaultColor, marginLeft: 5, marginRight: 5 }} size={40} />
                </TouchableHighlight>
              </View>
            </View>
          </Tab>
        </Tabs>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    padding: 5,
    height: '100%',
    alignSelf: 'center',
  },
  tab: {
    backgroundColor: defaultBackgroundColor
  },
  activeTextStyle: {
    color: defaultColor,
    fontWeight: 'normal'
  },
  scrollView: {
    width: '100%',
    height: '100%',
    backgroundColor: defaultBackgroundColor
  },
  tabsContainerStyle: {
    backgroundColor: defaultBackgroundColor,
    justifyContent: 'flex-start',
  },
  line: {
    borderWidth: 1,
    width: '100%',
    borderColor: 'gray',
    marginTop: 10,
    marginBottom: 10
  },
})

const mapStateToProps = ({ user_id }) => {
  return {
    user_id
  }
}

export default connect(mapStateToProps)(detailTugas)