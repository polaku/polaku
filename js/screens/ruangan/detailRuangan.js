import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Icon, Input, Item, Tabs, Tab, ScrollableTab } from 'native-base';
import CardBookingRuangan from '../../components/cardBookingRuangan';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';

export default class detailAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      test: 0,
      nameTab: ['Hari ini', 'Besok', 'Minggu ini'],
    }
  }

  componentDidMount() {
    let years = new Date().getFullYear()
    let month = new Date().getMonth() + 1

    this.fetchDate(years, month)
    // console.log(this.state.dates);
    console.log("ASDASDASDASDASDADASDASDADADSAD")
  }


  fetchDate = (years, month) => {
    let date = new Date(years, month, 0).getDate();
    let temp = []

    console.log(date);
    this.setState({
      test: date
    })

    for (let i = 1; i <= date; i++) {
      temp.push(String(i))
    }

    this.setState({
      dates: temp
    })
  }

  render() {
    return (
      <View>
        {/* NAVIGATION MONTH */}
        <View style={styles.header}>
          <Icon name='arrow-round-back' style={{color: defaultColor}} size={32} />
          <Text style={styles.textMonth} >Juli</Text>
          <Icon name='arrow-round-forward' style={{color: defaultColor}} size={32} />
        </View>
        <View style={styles.container}>
          <CardBookingRuangan />
        </View>
        {/* <Tabs renderTabBar={() => <ScrollableTab />} tabBarUnderlineStyle={{ backgroundColor: defaultColor }}>
          {
            this.state.dates.map(el => (
              // <ScrollView>
              <Tab heading={el} tabStyle={styles.tab} textStyle={{ color: '#B8B4B4' }} activeTabStyle={{ backgroundColor: '#F1F1F1' }} activeTextStyle={{ color: defaultColor, fontWeight: 'normal' }}>
                <View style={{ height: '100%', width: '100% alignItems: 'center', backgroundColor: '#F1F1F1' }}>
                  <CardKelompokAcara navigation={this.props.navigation} />
                </View>
              </Tab>
              // </ScrollView>
            ))
          }
        </Tabs> */}
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
    paddingTop:20,
    paddingBottom:20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height:50
  },
  userComments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
    marginBottom: 17
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center'
  },
  bookmark: {
    color: defaultColor
  },
  iconUserComment: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 30
  },
  iconUser: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 30
  },
  userComment: {
    fontWeight: 'bold'
  },
  dateComment: {
    fontSize: 12,
    color: '#C1C1C1'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  line: {
    borderWidth: 1,
    width: '100%',
    borderColor: 'gray',
    marginTop: 10,
    marginBottom: 10
  },
  footer: {
    flexDirection: 'row',
    marginTop: 5
  },
  footerItem: {
    fontSize: 12,
    color: defaultColor,
    marginRight: 5,
    alignItems: 'center'
  },
  isiAcara: {
    flexDirection: 'row',
    marginBottom: 5
  },
  textMonth: {
    color: defaultColor,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10
  }
})