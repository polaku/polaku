import React, { Component } from 'react'
import { View, StyleSheet, TouchableHighlight, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Tabs, Tab, ScrollableTab, Icon } from 'native-base';
import CardBookingRuangan from '../../components/cardBookingRuangan';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { API } from '../../../config/API';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../../components/loading';

export default class detailRuangan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dates: [],
      month: new Date().getMonth()
    }
  }

  componentDidMount() {
    let years = new Date().getFullYear()
    let month = new Date().getMonth() + 1

    if (this.props.navigation.getParam('myRoom')) this.fetchDataPerMonth(years, month, this.props.navigation.getParam('room_id'), 'myRoom')
    else this.fetchDataPerMonth(years, month, this.props.navigation.getParam('room_id'))

  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('room')}`
  });

  fetchDataPerMonth = async (years, month, idRoom, myRoom) => {
    let token = await AsyncStorage.getItem('token')

    let getData, data = [], batasAwalTanggal = 1
    let date = new Date(years, month, 0).getDate();

    this.setState({
      loading: true
    })

    try {
      if (myRoom) {
        getData = await API.get(`/bookingRoom/${idRoom}/${month}/myRoom`,
          {
            headers: { token }
          })
      } else {
        getData = await API.get(`/bookingRoom/${idRoom}/${month}`,
          {
            headers: { token }
          })
      }

      if (month === new Date().getMonth() + 1) batasAwalTanggal = new Date().getDate()


      for (let i = batasAwalTanggal; i <= date; i++) {
        let temp = []
        getData.data.data.forEach(dataElement => {
          if (Number(i) === Number(new Date(dataElement.date_in).getDate())) {
            temp.push(dataElement)
          }
        })
        data.push({ key: String(i), data: temp })
      }

      this.setState({
        dates: data,
        loading: false,
      })

    } catch (err) {
      this.setState({
        loading: false
      })
      if (err.message === 'Request failed with status code 403') {
        alert('Waktu login telah habis, silahkan login kembali')
        this.props.navigation.navigate('Login')
        AsyncStorage.clear()
      } else {
        alert(err)
      }
    }
  }

  prevMonth = () => {
    let years = new Date().getFullYear()
    let newMonth = this.state.month - 1
    this.setState({
      month: newMonth
    })
    this.fetchDataPerMonth(years, newMonth + 1, this.props.navigation.getParam('room_id'))
  }

  nextMonth = () => {
    let years = new Date().getFullYear()
    let newMonth = this.state.month + 1
    this.setState({
      month: newMonth
    })
    this.fetchDataPerMonth(years, newMonth + 1, this.props.navigation.getParam('room_id'))
  }

  renderSeparator = () => {
    return (
      <View
        style={styles.separator}
      />
    );
  }

  deleteRoom = () => {

    let years = new Date().getFullYear()
    this.fetchDataPerMonth(years, this.state.month + 1, this.props.navigation.getParam('room_id'))
  }

  render() {
    function getMonth(args) {
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return months[args]
    }

    return (
      <View style={styles.container}>

        {/* NAVIGATION MONTH */}
        <View style={styles.header}>
          {
            this.state.month != new Date().getMonth() && <TouchableHighlight onPress={this.prevMonth} underlayColor="transparent">
              <Entypo name='chevron-thin-left' style={{ color: defaultColor }} size={32} />
            </TouchableHighlight>
          }
          <Text style={styles.textMonth} >{getMonth(this.state.month)}</Text>
          <TouchableHighlight onPress={this.nextMonth} underlayColor="transparent">
            <Entypo name='chevron-thin-right' style={{ color: defaultColor }} size={32} />
          </TouchableHighlight>
        </View>

        {
          this.state.loading
            ? <Loading />
            : <Tabs renderTabBar={() => <ScrollableTab tabsContainerStyle={styles.tabsContainerStyle} />} tabBarUnderlineStyle={{ backgroundColor: defaultColor }}>
              {
                this.state.dates.map((el, index) => (
                  <Tab heading={el.key}
                    tabStyle={styles.tab}
                    textStyle={{ color: defaultColor }}
                    activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
                    activeTextStyle={styles.activeTextStyle}
                    key={index}>

                    {/* // ? <View style={{ height: '80%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        //   <Image source={require('../../../assest/polaku.png')} style={{ height: 80, width: 80 }} />
                        // </View> */}
                    <View>
                      {
                        el.data.length === 0
                          ? <View style={{ height: '90%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assest/ruang_kosong.png')} style={{ height: 200, width: 200 }} />
                            <Text style={{ color: 'gray' }}>Hore! Ruang rapat masih kosong</Text>
                          </View>
                          : <FlatList
                            keyExtractor={(item) => String(item.room_booking_id)}
                            style={{ paddingTop: 15 }}
                            data={el.data}
                            ItemSeparatorComponent={this.renderSeparator}
                            renderItem={({ item }) => <CardBookingRuangan navigation={this.props.navigation} data={item} deleteRoom={this.deleteRoom} />} />
                      }
                    </View>
                  </Tab>
                ))
              }
            </Tabs>
        }
        <TouchableOpacity style={styles.buttonAdd} onPress={() => this.props.navigation.navigate("CreateRuangan")}>
          <Icon name="add" size={30} style={{ color: defaultTextColor }} />
        </TouchableOpacity>
      </View >
    )
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: defaultBackgroundColor
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  textMonth: {
    color: defaultColor,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10
  },
  tabsContainerStyle: {
    backgroundColor: defaultBackgroundColor,
    justifyContent: 'flex-start',
  },
  tab: {
    backgroundColor: defaultBackgroundColor
  },
  separator: {
    height: 1,
    width: "80%",
    backgroundColor: "#CED0CE",
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'center'
  },
  activeTextStyle: {
    color: defaultColor,
    fontWeight: 'normal'
  },
  buttonAdd: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    width: 100,
    position: 'absolute',
    bottom: -60,
    right: 1 / 2 * width - 50,
    height: 100,
    backgroundColor: defaultColor,
    borderRadius: 130,
    paddingTop: 10
  },
})