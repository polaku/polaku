import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import { Header, Icon, Tab, Tabs, ScrollableTab } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardKelompokAcara from '../../components/cardKelompokAcara';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { API } from '../../../config/API';

export default class acara extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
      eventsToday: [],
      eventsTomorrow: [],
      eventsThisWeek: [],
      eventsThisMonth: []
      // data: [
      //   { id: 1, image: '../../assest/placeholder.jpg', title: 'Tulip 1' },
      //   { id: 2, image: '../../assest/placeholder.jpg', title: 'Tulip 2' },
      //   { id: 3, image: '../../assest/placeholder.jpg', title: 'Tulip besar' }]
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    let getData, startDate, endDate, date, month, years
    let today = [], tomorrow = [], thisWeek = [], thisMonth = []

    this.setState({
      loading: true
    })
    date = new Date().getDate()
    month = new Date().getMonth() + 1
    years = new Date().getFullYear()

    try {
      getData = await API.get('/events',
        {
          headers: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3MzEsImlhdCI6MTU2NTY1NzkwMywiZXhwIjoxNTY1NzAxMTAzfQ.f2zqusZ_wR3Sg94HrdCWu6VMadqlQUZi8tnMpFedtDg' }
        })

      getData.data.data.forEach(el => {
        startDate = el.start_date.split('-')
        endDate = el.end_date.split('-')

        if ((Number(startDate[2]) === date && Number(startDate[1]) === month && Number(startDate[0]) === years) ||
          ((Number(startDate[2]) < date && Number(startDate[1]) <= month && Number(startDate[0]) <= years) && (Number(endDate[2]) > date && Number(endDate[1]) >= month && Number(startDate[0]) <= years))) {
          today.push(el)
        } else if ((Number(startDate[2]) === date + 1 && Number(startDate[1]) === month && Number(startDate[0]) === years) ||
          ((Number(startDate[2]) < date + 1 && Number(startDate[1]) <= month && Number(startDate[0]) <= years) && Number((endDate[2]) > date + 1 && Number(endDate[1]) >= month && Number(startDate[0]) <= years))) {
          tomorrow.push(el)
        }
        if ((Number(startDate[2]) >= date && Number(startDate[1]) <= month && Number(startDate[0]) <= years) && Number((endDate[2]) >= date && Number(endDate[1]) >= month && Number(startDate[0]) <= years)) {
          thisMonth.push(el)
        }
      })

      this.setState({
        data: getData.data.data,
        loading: false,
        eventsToday: today,
        eventsTomorrow: tomorrow,
        eventsThisMonth: thisMonth
      })

    } catch (err) {
      this.setState({
        loading: false
      })
      alert('Fetch data failed')
    }
  }

  render() {
    return (
      <View>

        {/* HEADER - menu button drawer, title, icon sorting */}
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <Icon name='browsers' style={styles.textColor} size={32} />
            <Text style={styles.textTitleHeader}>Acara</Text>
          </View>
          <Icon name='funnel' style={styles.sorting} size={32} />
        </Header>

        {/* CONTENT */}
        <View style={styles.container}>

          <View style={styles.title}>
            <Text style={styles.textTitleActive}> Semua Acara </Text>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('AcaraSaya')}>
              <Text style={styles.textTitleInactive}> acara saya </Text>
            </TouchableHighlight>
          </View>

          <Tabs renderTabBar={() => <ScrollableTab />} tabBarUnderlineStyle={{ backgroundColor: defaultColor }}>
            <Tab heading="Hari ini"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
              activeTextStyle={styles.activeTextStyle}>
              {
                this.state.loading
                  ? <Text>Loading</Text>
                  : <View style={styles.containerInTab}>
                    <ScrollView style={styles.scrollView}>
                      {
                        this.state.eventsToday.map(el => (
                          <CardKelompokAcara navigation={this.props.navigation} data={el} />
                        ))
                      }
                    </ScrollView>
                  </View>
              }
            </Tab>
            <Tab heading="Besok"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
              activeTextStyle={styles.activeTextStyle}>
              {
                this.state.loading
                  ? <Text>Loading</Text>
                  : <View style={styles.containerInTab}>
                    <ScrollView style={styles.scrollView}>
                      {
                        this.state.eventsTomorrow.map(el => (
                          <CardKelompokAcara navigation={this.props.navigation} data={el} />
                        ))
                      }
                    </ScrollView>
                  </View>
              }
            </Tab>
            <Tab heading="Minggu ini"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
              activeTextStyle={styles.activeTextStyle}>
              {
                this.state.loading
                  ? <Text>Loading</Text>
                  : <View style={styles.containerInTab}>
                    <ScrollView style={styles.scrollView}>
                      {
                        this.state.eventsThisMonth.map(el => (
                          <CardKelompokAcara navigation={this.props.navigation} data={el} />
                        ))
                      }
                    </ScrollView>
                  </View>
              }
            </Tab>
            <Tab heading="Bulan ini"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
              activeTextStyle={styles.activeTextStyle}>
              {
                this.state.loading
                  ? <Text>Loading</Text>
                  : <View style={styles.containerInTab}>
                    <ScrollView style={styles.scrollView}>
                      {
                        this.state.eventsThisMonth.map(el => (
                          <CardKelompokAcara navigation={this.props.navigation} data={el} />
                        ))
                      }
                    </ScrollView>
                  </View>
              }
            </Tab>
          </Tabs>

        </View>

        {/* BUTTON ADD */}
        <TouchableOpacity style={styles.buttonAdd} >
          <Icon name="add" size={30} style={{ color: defaultTextColor }} />
        </TouchableOpacity>
      </View>
    )
  }
}

acara.navigationOptions = {
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
    fontSize: 18,
    fontWeight: 'bold',
    color: defaultColor
  },
  textTitleInactive: {
    fontSize: 15,
    fontWeight: 'bold',
    color: defaultColor
  },
  activeTextStyle: {
    color: defaultColor,
    fontWeight: 'normal'
  },
  containerInTab: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: defaultBackgroundColor,
    marginBottom: 300
  },
  scrollView: {
    width: '100%',
    marginBottom: 160
  }
})

