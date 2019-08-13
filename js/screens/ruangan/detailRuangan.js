import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, TouchableHighlight, FlatList } from 'react-native';
import { Text, Icon, Header, Item, Tabs, Tab, ScrollableTab } from 'native-base';
import CardBookingRuangan from '../../components/cardBookingRuangan';
import CardKelompokAcara from '../../components/cardKelompokAcara';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { API } from '../../../config/API';

export default class detailAnnouncement extends Component {
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

    if (this.props.myRoom) this.fetchDataPerMonth(years, month, this.props.navigation.getParam('room_id'), 'myRoom')
    else this.fetchDataPerMonth(years, month, this.props.navigation.getParam('room_id'))

  }

  fetchDataPerMonth = async (years, month, idRoom, myRoom) => {
    let getData, data = []
    let date = new Date(years, month, 0).getDate();

    this.setState({
      loading: true
    })

    try {
      if (myRoom) {
        getData = await API.get(`/bookingRoom/${idRoom}/${month}/myRoom`,
          {
            headers: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3MzEsImlhdCI6MTU2NTY1NzkwMywiZXhwIjoxNTY1NzAxMTAzfQ.f2zqusZ_wR3Sg94HrdCWu6VMadqlQUZi8tnMpFedtDg' }
          })
      } else {
        getData = await API.get(`/bookingRoom/${idRoom}/${month}`,
          {
            headers: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3MzEsImlhdCI6MTU2NTY1NzkwMywiZXhwIjoxNTY1NzAxMTAzfQ.f2zqusZ_wR3Sg94HrdCWu6VMadqlQUZi8tnMpFedtDg' }
          })
      }
      for (let i = 1; i <= date; i++) {
        let temp = []
        getData.data.data.forEach(dataElement => {
          let date_in = dataElement.date_in.split('-')

          if (Number(i) === Number(date_in[2])) {
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
      alert(err)
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

  render() {
    function getMonth(args) {
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return months[args]
    }

    return (
      <View style={styles.container}>

        {/* NAVIGATION MONTH */}
        <View style={styles.header}>
          <TouchableHighlight onPress={() => this.prevMonth()}>
            <Icon name='arrow-round-back' style={{ color: defaultColor }} size={32} />
          </TouchableHighlight>
          <Text style={styles.textMonth} >{getMonth(this.state.month)}</Text>
          <TouchableHighlight onPress={() => this.nextMonth()}>
            <Icon name='arrow-round-forward' style={{ color: defaultColor }} size={32} />
          </TouchableHighlight>
        </View>

        {
          this.state.loading
            ? <Text>Loading</Text>
            : <Tabs renderTabBar={() => <ScrollableTab tabsContainerStyle={styles.tabsContainerStyle} />} tabBarUnderlineStyle={{ backgroundColor: defaultColor }}>
              {
                this.state.dates.map(el => (
                  <Tab heading={el.key}
                    tabStyle={styles.tab}
                    textStyle={{ color: defaultColor }}
                    activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
                    activeTextStyle={styles.activeTextStyle}>
                    <FlatList
                      style={{ paddingTop: 15 }}
                      data={el.data}
                      ItemSeparatorComponent={this.renderSeparator}
                      renderItem={({ item }) => <CardBookingRuangan navigation={this.props.navigation} data={item} />}
                    />
                  </Tab>
                ))
              }
            </Tabs>
        }
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: defaultBackgroundColor,
    paddingBottom: 20
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
  }
})