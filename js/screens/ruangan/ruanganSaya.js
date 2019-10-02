import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, FlatList } from 'react-native';
import { Header, Tab, Tabs, ScrollableTab, Icon } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardRuangan from '../../components/cardRuangan';
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
      roomsP40: [],
      loading: false
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    let token = await AsyncStorage.getItem('token')

    let getData
    let P40 = []

    this.setState({
      loading: true
    })

    try {
      getData = await API.get('/bookingRoom/rooms',
        {
          headers: { token }
        })

      getData.data.data.forEach(el => {
        if (el.company_building_id === 1) {
          P40.push(el)
        }
      })

      this.setState({
        data: getData.data.data,
        loading: false,
        roomsP40: P40,
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

  navigateRuangan = () => this.props.navigation.navigate('Ruangan')

  navigateCreateRuangan = () => this.props.navigation.navigate("CreateRuangan")

  render() {
    return (
      <View>

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

          {/* MENU ACARA */}
          <View style={styles.title}>
            <TouchableHighlight onPress={this.navigateRuangan} underlayColor="transparent">
              <Text style={styles.textTitleInactive}> ruangan </Text>
            </TouchableHighlight>
            <Text style={styles.textTitleActive}> Pesanan Saya </Text>
          </View>

          {
            this.state.loading
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
                      data={this.state.data}
                      renderItem={({ item }) => <CardRuangan data={item} myRoom='yes' navigation={this.props.navigation} />}
                    />
                  </View>
                </Tab>
                <Tab heading="P40"
                  tabStyle={styles.tab}
                  textStyle={{ color: defaultColor }}
                  activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
                  activeTextStyle={styles.activeTextStyle}>
                  <View style={styles.containerInTab}>
                    <FlatList
                      keyExtractor={(item) => item.room_id}
                      style={styles.flatList}
                      numColumns={3}
                      data={this.state.roomsP40}
                      renderItem={({ item }) => <CardRuangan data={item} myRoom='yes' navigation={this.props.navigation} />}
                    />
                  </View>
                </Tab>
              </Tabs>
          }

        </View>

        {/* BUTTON ADD */}
        <TouchableOpacity style={styles.buttonAdd} onPress={this.navigateCreateRuangan}>
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
  flatList: {
    backgroundColor: defaultBackgroundColor,
    paddingTop: 10,
    height: '100%'
  }
})
