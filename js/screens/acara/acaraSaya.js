import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, ScrollView, Image, RefreshControl } from 'react-native';
import { Header, Icon, Tab, Tabs, ScrollableTab } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardAcara from '../../components/cardAcara';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { fetchDataMyEvent } from '../../store/action';
import { connect } from 'react-redux';
import Loading from '../../components/loading';

class acaraSaya extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      currentTab: 0
    }
  }

  componentDidMount() {
    this.props.fetchDataMyEvent()
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.fetchDataMyEvent()
    this.setState({ refreshing: false });
  }

  navigateAcara = () => {
    this.props.navigation.navigate('Acara')
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
            <Icon name='browsers' style={styles.textColor} size={32} />
            <Text style={styles.textTitleHeader}>Acara</Text>
          </View>
          {/* <Icon name='filter' style={styles.sorting} size={32} /> */}
        </Header>

        {/* CONTENT */}
        <View style={styles.container}>

          {/* MENU ACARA */}
          <View style={styles.title}>
            <TouchableHighlight onPress={this.navigateAcara} underlayColor="transparent">
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
                this.props.loading
                  ? <Loading />
                  : <View style={styles.containerInTab}>
                    <ScrollView style={styles.scrollView}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                      />
                    }>
                      {
                        this.props.eventsMengikuti.length === 0
                          ? <View style={styles.placeImageAcaraKosong}>
                            <Image source={{ uri: "asset:/acara_kosong.png" }} style={styles.imageAcaraKosong} />
                            <Text style={{ color: 'gray' }}>Tidak ada acara yang diikuti</Text>
                          </View>
                          : <View>
                            <Text style={styles.textPullDownToRefresh}>Pull down to refresh</Text>
                            {
                              this.props.eventsMengikuti.map((el, index) => (
                                <CardAcara navigation={this.props.navigation} data={el} key={el.event_id} />
                              ))
                            }
                          </View>
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
                this.props.loading
                  ? <Loading />
                  : <View style={styles.containerInTab}>
                    <ScrollView style={styles.scrollView}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                      />
                    }>
                      {
                        this.props.myEvents.length === 0
                          ? <View style={styles.placeImageAcaraKosong}>
                            <Image source={{ uri: "asset:/acara_kosong.png" }} style={styles.imageAcaraKosong} />
                            <Text style={{ color: 'gray' }}>Tidak ada acara</Text>
                          </View>
                          : <View>
                            <Text style={styles.textPullDownToRefresh}>Pull down to refresh</Text>
                            {
                              this.props.myEvents.map((el, index) => (
                                <CardAcara navigation={this.props.navigation} data={el} key={el.event_id} />
                              ))
                            }
                          </View>
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
                this.props.loading
                  ? <Loading />
                  : <View style={styles.containerInTab}>
                    <ScrollView style={styles.scrollView}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                      />
                    }>
                      {
                        this.props.eventsDiajukan.length === 0
                          ? <View style={styles.placeImageAcaraKosong}>
                            <Image source={{ uri: "asset:/acara_kosong.png" }} style={styles.imageAcaraKosong} />
                            <Text style={{ color: 'gray' }}>Tidak ada acara yang diajukan</Text>
                          </View>
                          : <View>
                            <Text style={styles.textPullDownToRefresh}>Pull down to refresh</Text>
                            {
                              this.props.eventsDiajukan.map((el, index) => (
                                <CardAcara navigation={this.props.navigation} data={el} key={el.event_id} />
                              ))
                            }
                          </View>
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
                this.props.loading
                  ? <Loading />
                  : <View style={styles.containerInTab}>
                    <ScrollView style={styles.scrollView}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                      />
                    }>
                      {
                        this.props.eventsDitolak.length === 0
                          ? <View style={styles.placeImageAcaraKosong}>
                            <Image source={{ uri: "asset:/acara_kosong.png" }} style={styles.imageAcaraKosong} />
                            <Text style={{ color: 'gray' }}>Tidak ada acara yang ditolak</Text>
                          </View>
                          : <View>
                            <Text style={styles.textPullDownToRefresh}>Pull down to refresh</Text>
                            {
                              this.props.eventsDitolak.map((el, index) => (
                                <CardAcara navigation={this.props.navigation} data={el} key={el.event_id} />
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
    backgroundColor: defaultBackgroundColor
  },
  scrollView: {
    width: '100%',
    marginBottom: 160
  },
  imageAcaraKosong : {
    height: 200,
    width: 250,
    resizeMode: 'stretch'
  },
  placeImageAcaraKosong: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textPullDownToRefresh : {
    alignSelf: 'center',
    color: '#B4ACAA',
    fontSize: 12
  }
})


const mapDispatchToProps = {
  fetchDataMyEvent
}

const mapStateToProps = ({ loading, myEvents, eventsMengikuti, eventsDiajukan, eventsDitolak }) => {
  return {
    loading,
    myEvents,
    eventsMengikuti,
    eventsDiajukan,
    eventsDitolak
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(acaraSaya)
