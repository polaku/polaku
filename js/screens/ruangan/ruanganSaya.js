import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { Header, Icon } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardBookingRuangan from '../../components/cardBookingRuangan';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { API } from '../../../config/API';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Loading from '../../components/loading';

export default class ruanganSaya extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    let token = await AsyncStorage.getItem('token')

    let getData

    this.setState({
      loading: true
    })

    try {
      getData = await API.get(`/bookingRoom/myRoom`,
        {
          headers: { token }
        })

      this.setState({
        data: getData.data.data,
        loading: false,
      })

    } catch (err) {
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

  navigateRuangan = () => this.props.navigation.navigate('Ruangan')

  navigateCreateBookingRoom = () => this.props.navigation.navigate("CreateBookingRoom")

  renderSeparator = () => {
    return (
      <View
        style={styles.separator}
      />
    );
  }

  render() {
    return (
      <View style={{ height: '100%', backgroundColor: defaultBackgroundColor }}>

        {/* HEADER - menu button drawer, title, icon sorting */}
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <FontAwesome5 name="building" style={styles.textColor} size={25} />
            <Text style={styles.textTitleHeader}>Ruang Rapat</Text>
          </View>
        </Header>

        <View style={styles.title}>
          <TouchableHighlight onPress={this.navigateRuangan} underlayColor="transparent">
            <Text style={styles.textTitleInactive}> ruangan </Text>
          </TouchableHighlight>
          <Text style={styles.textTitleActive}> Pesanan Saya </Text>
        </View>
        {/* CONTENT */}
        {/* <View style={styles.container}> */}

        {/* MENU ACARA */}

        {
          this.state.loading
            ? <Loading />
            : <>
              {
                this.state.data.length === 0
                  ? <View style={{ height: '80%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: "asset:/ruang_kosong.png" }} style={{ height: 200, width: 200 }} />
                    <Text style={{ color: 'gray' }}>Belum ada ruangan yang dibooking!</Text>
                  </View>
                  : <FlatList
                    contentContainerStyle={{ paddingBottom: 15 }}
                    keyExtractor={(item) => String(item.room_booking_id)}
                    style={{ paddingTop: 15, backgroundColor: 'white', marginEnd: 15, width: '100%' }}
                    data={this.state.data}
                    ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({ item }) => <CardBookingRuangan navigation={this.props.navigation} data={item} deleteRoom={this.fetchData} myRoom={true} />} />
              }
            </>
        }

        {/* </View> */}

        {/* BUTTON ADD */}
        <TouchableOpacity style={styles.buttonAdd} onPress={this.navigateCreateBookingRoom}>
          <Icon name="add" size={30} style={{ color: defaultTextColor }} />
        </TouchableOpacity>
      </View>
    )
  }
}

ruanganSaya.navigationOptions = {
  header: null
};

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: 'red',
  //   padding: 5,
  //   height: '100%',
  //   marginBottom: 60
  // },
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
    bottom: -60,
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
  flatList: {
    backgroundColor: defaultBackgroundColor,
    paddingTop: 10,
    height: '100%'
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "#CED0CE",
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'center'
  },
})
