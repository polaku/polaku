import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import { Header, Icon, Tab, Tabs, ScrollableTab } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardKelompokAcara from '../../components/cardKelompokAcara';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { API } from '../../../config/API';

export default class acaraSaya extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      eventsMengikuti: [],
      eventsDiajukan: [],
      eventsDitolak: []
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    let getData
    let mengikuti = [], diajukan = [], ditolak = []

    this.setState({
      loading: true
    })
    try {
      getData = await API.get('/events/myevents',
        {
          headers: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3MzEsImlhdCI6MTU2NTY1NzkwMywiZXhwIjoxNTY1NzAxMTAzfQ.f2zqusZ_wR3Sg94HrdCWu6VMadqlQUZi8tnMpFedtDg' }
        })

      console.log('on process', getData.data.data);

      getData.data.data.forEach(el => {
        if (el.status === 0) {
          diajukan.push(el)
        } else if (el.status === 2) {
          ditolak.push(el)
        }
      })

      this.setState({
        data: getData.data.data,
        loading: false,
        eventsMengikuti: mengikuti,
        eventsDiajukan: diajukan,
        eventsDitolak: ditolak
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
          <View style={styles.titleHeader}>
            <Icon name='browsers' style={styles.textColor} size={32} />
            <Text style={styles.textTitleHeader}>Acara</Text>
          </View>
          <MenuButton navigation={this.props.navigation} />
          <Icon name='funnel' style={styles.sorting} size={32} />
        </Header>

        {/* CONTENT */}
        <View style={styles.container}>

          {/* MENU ACARA */}
          <View style={styles.title}>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Acara')}>
              <Text style={styles.textTitleInactive}> semua acara </Text>
            </TouchableHighlight>
            <Text style={styles.textTitleActive}> Acara Saya </Text>
          </View>

          <Tabs renderTabBar={() => <ScrollableTab />} tabBarUnderlineStyle={{ backgroundColor: defaultColor }}>
            <Tab heading="mengikuti"
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
                        this.state.data
                          ? this.state.data.map(el => (
                            <CardKelompokAcara navigation={this.props.navigation} data={el} />
                          ))
                          : <Text style={{ alignSelf: 'center' }}>Empty</Text>
                      }
                    </ScrollView>
                  </View>
              }
            </Tab>
            <Tab heading="semua"
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
                        this.state.data.length > 0
                          ? this.state.data.map(el => (
                            <CardKelompokAcara navigation={this.props.navigation} data={el} />
                          ))
                          : <Text style={{ alignSelf: 'center' }}>Empty</Text>
                      }
                    </ScrollView>
                  </View>
              }
            </Tab>
            <Tab heading="diajukan"
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
                        this.state.eventsDiajukan.length > 0
                          ? this.state.eventsDiajukan.map(el => (
                            <CardKelompokAcara navigation={this.props.navigation} data={el} />
                          ))
                          : <Text style={{ alignSelf: 'center' }}>Empty</Text>
                      }
                    </ScrollView>
                  </View>
              }
            </Tab>
            <Tab heading="ditolak"
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
                        this.state.eventsDitolak.length > 0
                          ? this.state.eventsDitolak.map(el => (
                            <CardKelompokAcara navigation={this.props.navigation} data={el} />
                          ))
                          : <Text style={{ alignSelf: 'center' }}>Empty</Text>
                      }
                    </ScrollView>
                  </View>
              }
            </Tab>
          </Tabs>
        </View>

        {/* BUTTON ADD */}
        <TouchableOpacity style={styles.buttonAdd}>
          <Icon name="add" size={30} style={{ color: defaultTextColor }} />
        </TouchableOpacity>
      </View>
    )
  }
}

acaraSaya.navigationOptions = {
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
    backgroundColor: defaultBackgroundColor
  },
  scrollView: {
    width: '100%',
    marginBottom: 160
  }
})
