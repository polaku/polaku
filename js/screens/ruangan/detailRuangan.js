import React, { Component } from 'react'
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Text, Icon, Input, Item, Tabs, Tab, ScrollableTab } from 'native-base';
import CardComment from '../../components/cardComment';
import { TouchableHighlight } from 'react-native-gesture-handler';
import CardKelompokAcara from '../../components/cardKelompokAcara';
import CardBookingRuangan from '../../components/cardBookingRuangan';

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
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height:50 }}>
          <Icon name='arrow-round-back' style={styles.bookmark} size={32} />
          <Text style={{ ...styles.bookmark, marginRight: 15, marginLeft: 15, marginTop: 10, marginBottom: 10 }} >Juli</Text>
          <Icon name='arrow-round-forward' style={styles.bookmark} size={32} />
        </View>
        <View style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', backgroundColor: '#F1F1F1', paddingTop:20, paddingBottom:20 }}>
          <CardBookingRuangan />
        </View>
        {/* <Tabs renderTabBar={() => <ScrollableTab />} tabBarUnderlineStyle={{ backgroundColor: '#A6250F' }}>
          {
            this.state.dates.map(el => (
              // <ScrollView>
              <Tab heading={el} tabStyle={styles.tab} textStyle={{ color: '#B8B4B4' }} activeTabStyle={{ backgroundColor: '#F1F1F1' }} activeTextStyle={{ color: '#A6250F', fontWeight: 'normal' }}>
                <View style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', backgroundColor: '#F1F1F1' }}>
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

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  userComments: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
    marginBottom: 17
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center'
  },
  bookmark: {
    color: '#A6250F'
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
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5
  },
  footerItem: {
    fontSize: 12,
    color: '#A6250F',
    marginRight: 5,
    alignItems: 'center'
  },
  isiAcara: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5
  }
})