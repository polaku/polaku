import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, ScrollView, RefreshControl, Image } from 'react-native';
import { Header, Icon, Tab, Tabs, ScrollableTab, Input, Picker, Item } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardAcara from '../../components/cardAcara';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { fetchDataEvent } from '../../store/action';
import { connect } from 'react-redux';
import Loading from '../../components/loading';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class acara extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSortingMenu: false,
      checkBoxAll: false,
      checkBoxIT: false,
      checkBoxHRD: false,
      checkBoxTerbaru: false,
      checkBoxTerbanyak: false,
      selected2: '',
      month: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      refreshing: false
    }
  }

  componentDidMount() {
    this.props.fetchDataEvent()
  }

  sortingMenu = () => {
    this.setState({
      showSortingMenu: !this.state.showSortingMenu
    })
  }

  _onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.fetchDataEvent()
    this.setState({ refreshing: false });
  }

  navigateAcaraSaya = () => {
    this.props.navigation.navigate('AcaraSaya')
  }

  navigateCreateAcara = () => {
    this.props.navigation.navigate("CreateAcara")
  }

  render() {
    return (
      <View>

        {/* HEADER - menu button drawer, title, icon sorting */}
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <MaterialIcons name='event' style={styles.textColor} size={30} />
            <Text style={styles.textTitleHeader}>Acara</Text>
          </View>
          {/* <TouchableHighlight onPress={() => this.sortingMenu()} style={styles.sorting}>
            <MaterialCommunityIcons name='filter-outline' style={{ color: defaultTextColor }} size={30} />
          </TouchableHighlight> */}
        </Header>

        {/* {
          this.state.showSortingMenu && <View style={{
            zIndex: 9,
            position: 'absolute',
            top: 52,
            right: 0,
            width: 250,
            backgroundColor: defaultColor,
            padding: 20,
            paddingTop: 10
          }} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ marginTop: 5, alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>Tanggal</Text>
                <Input placeholderTextColor={defaultTextColor} width={150} style={styles.sortingTanggal} maxLength={2} />
              </View>
              <View style={{ marginTop: 5, alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>Bulan</Text>
                <Item picker>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: 150, backgroundColor: 'white', color: defaultColor, height: 35, marginTop: 10 }}
                    placeholder="Select your SIM"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor={defaultColor}
                    selectedValue={this.state.selected2}
                    onValueChange={this._onValueChange2.bind(this)}
                    itemStyle={{ height: 44 }}
                  >
                    {
                      this.state.month.map((el, index) => (
                        <Picker.Item label={el} value={index} />
                      ))
                    }
                  </Picker>
                </Item>
              </View>
            </View>
            <TouchableHighlight style={{ width: '50%', backgroundColor: 'white', height: 40, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderRadius: 5, marginTop: 10 }}>
              <Text style={{ color: defaultColor, fontSize: 15, alignSelf: 'center', fontWeight: 'bold' }}>Cari</Text>
            </TouchableHighlight>
          </View>
        } */}

        {/* CONTENT */}
        <View style={styles.container}>

          <View style={styles.title}>
            <Text style={styles.textTitleActive}> Semua Acara </Text>
            <TouchableHighlight onPress={this.navigateAcaraSaya} underlayColor="transparent">
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
                this.props.loading
                  ? <Loading/>
                  : <View style={styles.containerInTab}>
                    <ScrollView style={styles.scrollView}
                      refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                        />
                      }>
                      {
                        this.props.eventsToday.length === 0
                          ? <View style={styles.placeImageAcaraKosong}>
                            <Image source={require('../../../assest/acara_kosong.png')} style={styles.imageAcaraKosong} />
                            <Text style={{ color: 'gray' }}>Tidak ada acara pada hari ini</Text>
                          </View>
                          : <View>
                            <Text style={styles.textPullDownToRefresh}>Pull down to refresh</Text>
                            {
                              this.props.eventsToday.map((el, index) => (
                                <CardAcara navigation={this.props.navigation} data={el} key={index} />
                              ))
                            }
                          </View>
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
                this.props.loading
                  ? <Loading/>
                  : <View style={styles.containerInTab}>
                    <ScrollView style={styles.scrollView}
                      refreshControl={
                        <RefreshControl
                          refreshing={this.state.loading}
                          onRefresh={this._onRefresh}
                        />
                      }>
                      {
                        this.props.eventsTomorrow.length === 0
                          ? <View style={{ marginTop: 60, justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={require('../../../assest/acara_kosong.png')} style={styles.imageAcaraKosong} />
                            <Text style={{ color: 'gray' }}>Tidak ada acara pada esok hari</Text>
                          </View>
                          : <View>
                            <Text style={{ alignSelf: 'center', color: '#B4ACAA', fontSize: 12 }}>Pull down to refresh</Text>
                            {
                              this.props.eventsTomorrow.map((el, index) => (
                                <CardAcara navigation={this.props.navigation} data={el} key={index} />
                              ))
                            }
                          </View>
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
                this.props.loading
                  ? <Loading/>
                  : <View style={styles.containerInTab}>
                    <ScrollView style={styles.scrollView}
                      refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                        />
                      }>
                      {
                        this.props.eventsThisWeek.length === 0
                          ? <View style={{ marginTop: 60, justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={require('../../../assest/acara_kosong.png')} style={styles.imageAcaraKosong} />
                            <Text style={{ color: 'gray' }}>Tidak ada acara pada minggu hari</Text>
                          </View>
                          : <View>
                            <Text style={{ alignSelf: 'center', color: '#B4ACAA', fontSize: 12 }}>Pull down to refresh</Text>
                            {
                              this.props.eventsThisWeek.map((el, index) => (
                                <CardAcara navigation={this.props.navigation} data={el} key={index} />
                              ))
                            }
                          </View>
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
                this.props.loading
                  ? <Loading/>
                  : <View style={styles.containerInTab}>
                    <ScrollView style={styles.scrollView}
                      refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                        />
                      }>
                      {
                        this.props.eventsThisMonth.length === 0
                          ? <View style={{ marginTop: 60, justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={require('../../../assest/acara_kosong.png')} style={styles.imageAcaraKosong} />
                            <Text style={{ color: 'gray' }}>Tidak ada acara pada bulan hari</Text>
                          </View>
                          : <View>
                            <Text style={{ alignSelf: 'center', color: '#B4ACAA', fontSize: 12 }}>Pull down to refresh</Text>
                            {
                              this.props.eventsThisMonth.map((el, index) => (
                                <CardAcara navigation={this.props.navigation} data={el} key={index} />
                              ))
                            }
                          </View>
                      }
                    </ScrollView>
                  </View>
              }
            </Tab>
          </Tabs>

        </View>

        {/* BUTTON ADD */}
        <TouchableOpacity style={styles.buttonAdd} onPress={this.navigateCreateAcara}>
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
    right: 20
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
  },
  sortingTanggal: {
    backgroundColor: 'white',
    color: defaultColor,
    height: 35,
    width: 50,
    padding: 5,
    textAlign: 'center',
    marginTop: 10
  },
  imageAcaraKosong: {
    height: 200,
    width: 250,
    resizeMode: 'stretch'
  },
  placeImageAcaraKosong : {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textPullDownToRefresh:{
    alignSelf: 'center',
    color: '#B4ACAA',
    fontSize: 12
  }
})

const mapDispatchToProps = {
  fetchDataEvent
}

const mapStateToProps = ({ loading, dataAllEvent, eventsToday, eventsTomorrow, eventsThisWeek, eventsThisMonth }) => {
  return {
    loading,
    dataAllEvent,
    eventsToday,
    eventsTomorrow,
    eventsThisWeek,
    eventsThisMonth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(acara)