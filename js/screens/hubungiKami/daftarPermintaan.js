import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, RefreshControl } from 'react-native';
import { Header, Icon, Tab, Tabs, ScrollableTab } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardPermintaan from '../../components/cardPermintaan';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { API } from '../../../config/API';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../../components/loading';

export default class daftarPermintaan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ongoing: [],
      confirmation: [],
      done: [],
      cancel: [],
      refreshing: false
    }
  }

  componentDidMount() {
    console.log('daftar permintaan')
    this.fetchData()
  }

  fetchData = async () => {
    let token = await AsyncStorage.getItem('token')

    let getData, tempOngoing = [], tempConfirmation = [], tempDone = [], tempCancel = []
    this.setState({
      loading: true
    })
    try {
      getData = await API.get('/contactUs',
        {
          headers: { token }
        })
      console.log(getData)

      // ongoing(new, assigned, on going), confirmation, done, cancel
      getData.data.data.forEach(el => {
        if (el.status === 'confirmation') {
          tempConfirmation.push(el)
        } else if (el.status === 'done') {
          tempDone.push(el)
        } else if (el.status === 'cancel') {
          tempCancel.push(el)
        } else {
          tempOngoing.push(el)
        }
      });

      this.setState({
        data: getData.data.data,
        loading: false,
        ongoing: tempOngoing,
        confirmation: tempConfirmation,
        done: tempDone,
        cancel: tempCancel
      })
    } catch (err) {
      this.setState({
        loading: false
      })
      alert(err)
    }
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.fetchData()
    this.setState({ refreshing: false });
  }

  render() {
    return (
      <SafeAreaView>

        {/* HEADER - menu button drawer, title, icon sorting */}
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <Icon name='browsers' style={{ color: defaultColor }} size={32} />
            <Text style={styles.textTitleHeader}>Daftar Permintaan</Text>
          </View>
        </Header>

        {/* CONTENT */}
        <View style={styles.container}>

          <Tabs renderTabBar={() => <ScrollableTab />} tabBarUnderlineStyle={{ backgroundColor: defaultColor }}>
            <Tab heading="sedang berlangsung"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
              activeTextStyle={styles.activeTextStyle}>
              {
                this.state.loading
                  ? <Loading />
                  : <ScrollView style={styles.scrollView} refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}
                    />
                  }>
                    <View style={styles.containerItem}>
                      {
                        this.state.ongoing.length > 0
                          ? this.state.ongoing.map((el, index) => (
                            <CardPermintaan navigation={this.props.navigation} data={el} fetchData={this.fetchData} key={index} />
                          ))
                          : <View style={styles.placeImage}>
                            <Image source={require('../../../assest/permintaan_kosong.png')} style={styles.image} />
                          </View>
                      }
                    </View>
                  </ScrollView>
              }
            </Tab>
            <Tab heading="konfirmasi"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
              activeTextStyle={styles.activeTextStyle}>
              {
                this.state.loading
                  ? <Loading />
                  : <ScrollView style={styles.scrollView} refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}
                    />
                  }>
                    <View style={styles.containerItem}>
                      {
                        this.state.confirmation.length > 0
                          ? this.state.confirmation.map((el, index) => (
                            <CardPermintaan navigation={this.props.navigation} data={el} fetchData={this.fetchData} key={index} />
                          ))
                          : <View style={styles.placeImage}>
                            <Image source={require('../../../assest/permintaan_kosong.png')} style={styles.image} />
                          </View>
                      }
                    </View>
                  </ScrollView>
              }
            </Tab>
            <Tab heading="selesai"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
              activeTextStyle={styles.activeTextStyle}>
              {
                this.state.loading
                  ? <Loading />
                  : <ScrollView style={styles.scrollView} refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}
                    />
                  }>
                    <View style={styles.containerItem}>
                      {
                        this.state.done.length > 0
                          ? this.state.done.map((el, index) => (
                            <CardPermintaan navigation={this.props.navigation} data={el} fetchData={this.fetchData} key={index} />
                          ))
                          : <View style={styles.placeImage}>
                            <Image source={require('../../../assest/permintaan_kosong.png')} style={styles.image} />
                          </View>
                      }
                    </View>
                  </ScrollView>
              }
            </Tab>
            <Tab heading="dibatalkan"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
              activeTextStyle={styles.activeTextStyle}>
              {
                this.state.loading
                  ? <Loading />
                  : <ScrollView style={styles.scrollView} refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}
                    />
                  }>
                    <View style={styles.containerItem}>
                      {
                        this.state.cancel.length > 0
                          ? this.state.cancel.map((el, index) => (
                            <CardPermintaan navigation={this.props.navigation} data={el} fetchData={this.fetchData} key={index} />
                          ))
                          : <View style={styles.placeImage}>
                            <Image source={require('../../../assest/permintaan_kosong.png')} style={styles.image} />
                          </View>
                      }
                    </View>
                  </ScrollView>
              }
            </Tab>
          </Tabs>
        </View>

      </SafeAreaView>
    )
  }
}

//admin
// new, assigned, on going, confirmation, done, cancel

//user
// ongoing(new, assigned, on going), confirmation, done, cancel

daftarPermintaan.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    padding: 5,
    height: '100%',
    alignSelf: 'center',
    paddingBottom: 120
  },
  header: {
    backgroundColor: defaultColor,
    flexDirection: 'row',
    alignItems: 'center'
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
  sorting: {
    zIndex: 9,
    position: 'absolute',
    top: 15,
    right: 20,
    color: defaultTextColor
  },
  tab: {
    backgroundColor: defaultBackgroundColor
  },
  activeTextStyle: {
    color: defaultColor,
    fontWeight: 'normal'
  },
  containerItem: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: defaultBackgroundColor,
  },
  scrollView: {
    width: '100%',
    backgroundColor: defaultBackgroundColor
  },
  image: {
    height: 200,
    width: 250,
    resizeMode: 'stretch'
  },
  placeImage: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

