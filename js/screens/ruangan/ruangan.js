import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { Header, Icon, Tab, Tabs, ScrollableTab } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardRuangan from '../../components/cardRuangan';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { API } from '../../../config/API';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../../components/loading';

import { fetchDataAllUser } from '../../store/action';

class ruangan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRoom: [],
      data: [],
      dataImage: [],
      loading: false,
      statusDisplay: false,
      refreshing: false
    }
  }

  componentDidMount() {
    this.fetchData()
    this.props.fetchDataAllUser()
  }

  fetchData = async () => {
    let token = await AsyncStorage.getItem('token')
    let month = new Date().getMonth() + 1

    let room, building, dataRuangan

    this.setState({
      loading: true
    })

    try {
      room = await API.get('/bookingRoom/rooms',
        {
          headers: { token }
        })

      building = await API.get('/bookingRoom/building',
        {
          headers: { token }
        })

      await building.data.data.forEach(async building => {
        let counter = 0
        building.room = room.data.data.filter(room => room.building_id === building.building_id)

        if (building.room) {
          await building.room.forEach(async el => {

            dataRuangan = await API.get(`/bookingRoom/${el.room_id}/${month}`,
              {
                headers: { token }
              })

            let currentBookingRoom = await dataRuangan.data.data.find(bookingRoom =>
              new Date(bookingRoom.date_in).getDate() === new Date().getDate() &&
              new Date(bookingRoom.date_in).getMonth() === new Date().getMonth() &&
              new Date(bookingRoom.date_in).getFullYear() === new Date().getFullYear() &&
              Number(bookingRoom.time_in.slice(0, 2)) <= new Date().getHours() &&
              Number(bookingRoom.time_out.slice(0, 2)) > new Date().getHours()
            )


            if (currentBookingRoom) statusRuangan = 'sedang digunakan'

            if (!currentBookingRoom) statusRuangan = 'tersedia sekarang'
            if (new Date().getHours() >= 17 || new Date().getHours() < 8) {
              statusRuangan = 'tutup'
            }

            el.statusRuangan = statusRuangan

            counter++
            if (counter === building.room.length) {
              this.setState({
                statusDisplay: true,

              })
            }
          })
        }
      })

      this.setState({
        data: building.data.data,
        loading: false,
        allRoom: room.data.data,
      })

    } catch (err) {
      console.log(err)
      this.setState({
        loading: false
      })
      if (err.message === 'Request failed with status code 403') {
        Alert.alert('Error', 'waktu login telah habis, silahkan login kembali')
        this.props.navigation.navigate('Login')
        AsyncStorage.clear()
      } else {
        Alert.alert('Error', `${err}`)

      }
    }
  }

  refresh = async () => {
    this.setState({ refreshing: true })
    await this.fetchData()
    this.setState({ refreshing: false })
  }

  navigateRuanganSaya = () => this.props.navigation.navigate('RuanganSaya')

  render() {
    return (
      <View style={{ backgroundColor: defaultBackgroundColor }}>

        {/* HEADER - menu button drawer, title, icon sorting */}
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <FontAwesome5 name="building" style={styles.textColor} size={25} />
            <Text style={styles.textTitleHeader}>Ruang Rapat</Text>
          </View>
        </Header>

        {/* CONTENT */}
        <View style={styles.container}>

          {/* MENU ruangan */}
          <View style={styles.title}>
            <Text style={styles.textTitleActive}> Ruangan </Text>
            <TouchableHighlight onPress={this.navigateRuanganSaya} underlayColor="transparent">
              <Text style={styles.textTitleInactive}> pesanan saya </Text>
            </TouchableHighlight>
          </View>

          {
            (this.state.loading && this.state.statusDisplay)
              ? <Loading />
              : <Tabs renderTabBar={() => <ScrollableTab tabsContainerStyle={styles.tabsContainerStyle} />} tabBarUnderlineStyle={{ backgroundColor: defaultColor }}>
                <Tab heading="semua"
                  tabStyle={styles.tab}
                  textStyle={{ color: defaultColor }}
                  activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
                  activeTextStyle={styles.activeTextStyle}>
                  <View style={styles.containerInTab}>
                    <FlatList
                      keyExtractor={(item) => item.room_id}
                      style={styles.flatList}
                      numColumns={3}
                      data={this.state.allRoom}
                      refreshing={this.state.refreshing}
                      onRefresh={() => this.refresh()}
                      contentContainerStyle={{ paddingBottom: 10 }}
                      renderItem={({ item }) => <CardRuangan data={item} navigation={this.props.navigation} refresh={this.fetchData} />}
                    />
                  </View>
                </Tab>
                {
                  this.state.data.map((el, index) => (

                    el.room.length !== 0 && <Tab heading={el.building}
                      key={index}
                      actived
                      tabStyle={styles.tab}
                      textStyle={{ color: defaultColor }}
                      activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
                      activeTextStyle={styles.activeTextStyle}>
                      <View style={styles.containerInTab}>
                        <FlatList
                          keyExtractor={(item) => item.room_id}
                          style={styles.flatList}
                          numColumns={3}
                          data={el.room}
                          refreshing={this.state.refreshing}
                          onRefresh={() => this.refresh()}
                          contentContainerStyle={{ paddingBottom: 10 }}
                          renderItem={({ item, }) => <CardRuangan data={item} navigation={this.props.navigation} refresh={this.fetchData} />}
                        />
                      </View>
                    </Tab>
                  ))
                }

              </Tabs>
          }
        </View>

        {/* BUTTON ADD */}
        <TouchableOpacity style={styles.buttonAdd} onPress={() => this.props.navigation.navigate("CreateBookingRoom", {
          refresh: () => this.fetchData()
        })}>
          <Icon name="add" size={30} style={{ color: defaultTextColor }} />
        </TouchableOpacity>
      </View>
    )
  }
}

ruangan.navigationOptions = {
  header: null
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    padding: 5,
    height: '100%',
    marginBottom: 60
  },
  header: {
    backgroundColor: defaultColor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textColor: {
    color: defaultTextColor
  },
  sorting: {
    zIndex: 9,
    position: 'absolute',
    top: 15,
    right: 20,
    color: defaultTextColor
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: defaultBackgroundColor,
  },
  tab: {
    backgroundColor: defaultBackgroundColor
  },
  buttonAdd: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    width: 100,
    position: 'absolute',
    bottom: 60,
    right: 1 / 2 * width - 50,
    height: 100,
    backgroundColor: defaultColor,
    borderRadius: 130,
    paddingTop: 10
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTitleHeader: {
    color: defaultTextColor,
    marginLeft: 5,
    fontSize: 20
  },
  textTitleActive: {
    fontSize: 20,
    fontWeight: 'bold',
    color: defaultColor
  },
  textTitleInactive: {
    fontSize: 17,
    color: defaultColor
  },
  activeTextStyle: {
    color: defaultColor,
    fontWeight: 'normal'
  },
  tabsContainerStyle: {
    backgroundColor: defaultBackgroundColor,
    justifyContent: 'flex-start',
  },
  containerInTab: {
    backgroundColor: defaultBackgroundColor,
    paddingBottom: 5
  },
  flatList: {
    backgroundColor: defaultBackgroundColor,
    paddingTop: 10,
    height: '75%',
  }
})

const mapDispatchToProps = {
  fetchDataAllUser
}

export default connect(null, mapDispatchToProps)(ruangan)