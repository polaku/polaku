import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableHighlight, Dimensions, Image, RefreshControl, BackHandler, Alert } from 'react-native';
import { Header, Icon, CheckBox } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardAnnouncement from '../../components/cardAnnouncement';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { API } from '../../../config/API';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigationFocus } from 'react-navigation';
import Loading from '../../components/loading';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

class announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataPilihan: [],
      loading: false,
      showSortingMenu: false,
      checkBoxAll: false,
      checkBoxIT: false,
      checkBoxHRD: false,
      checkBoxTerbaru: false,
      checkBoxTerbanyak: false,
      indexSlide: 1,
      refreshing: false,
      page: 1,
      loadingText: false
    }
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem('token')

    if (token) {
      this.setState({
        loading: true
      })
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      await this.fetchData()
      this.setState({
        loading: false
      })
    } else {
      this.props.navigation.navigate('Login')
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.token !== this.props.token) {
      this.setState({
        loading: true
      })
      await this.fetchData()
      this.setState({
        loading: false
      })
    }
  }


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    // BackHandler.exitApp()
    if (this.props.isFocused === true && this.props.navigation.state.routeName === 'Announcement') {
      //   this.handleBackPress()
      BackHandler.exitApp()
    }
  }

  fetchData = async () => {
    let token = await AsyncStorage.getItem('token')
    let getData

    try {
      getData = await API.get(`/announcement?page=1`,
        {
          headers: { token }
        })
      this.setState({
        data: getData.data.data,
        dataPilihan: getData.data.dataPilihan
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

  fetchDataLoadMore = async () => {
    let token = await AsyncStorage.getItem('token')
    let getData

    try {
      getData = await API.get(`/announcement?page=${this.state.page}`,
        {
          headers: { token }
        })
      this.setState({
        data: [...this.state.data, ...getData.data.data],
        dataPilihan: getData.data.dataPilihan
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

  sortingMenu = () => {
    this.setState({
      showSortingMenu: !this.state.showSortingMenu
    })
  }

  pressedCheckBox = (args) => {
    this.setState({ [args]: !this.state[args] });
  }

  handleScroll = (event) => {
    this.setState({
      indexSlide: (event.nativeEvent.contentOffset.x / width) + 1
    })
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData()
    this.setState({ refreshing: false });
  }

  loadMore = async () => {
    this.setState({
      page: this.state.page + 1,
      loadingText: true
    })

    await this.fetchDataLoadMore()

    this.setState({
      loadingText: false
    })
  }

  navigatePolanews = () => {
    this.props.navigation.navigate('Polanews')
  }

  render() {
    return (
      <SafeAreaView>

        {/* HEADER - menu button drawer, title, icon sorting */}
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <FontAwesome name='newspaper-o' style={styles.textColor} size={28} />
            <Text style={styles.textTitleHeader}>Berita</Text>
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
            <Text style={{ color: defaultTextColor, fontSize: 18 }}>Category</Text>
            <View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <CheckBox checked={this.state.checkBoxAll} color='white' onPress={() => this.pressedCheckBox('checkBoxAll')} />
                <Text style={{ marginLeft: 17, color: 'white' }}>Semua</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <CheckBox checked={this.state.checkBoxIT} color='white' onPress={() => this.pressedCheckBox('checkBoxIT')} />
                <Text style={{ marginLeft: 17, color: 'white' }}>IT</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <CheckBox checked={this.state.checkBoxHRD} color='white' onPress={() => this.pressedCheckBox('checkBoxHRD')} />
                <Text style={{ marginLeft: 17, color: 'white' }}>HRD</Text>
              </View>
            </View>
            <Text style={{ color: defaultTextColor, fontSize: 18, marginTop: 5 }}>Sortir</Text>
            <View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <CheckBox checked={this.state.checkBoxTerbaru} color='white' onPress={() => this.pressedCheckBox('checkBoxTerbaru')} />
                <Text style={{ marginLeft: 17, color: 'white' }}>Paling Baru</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <CheckBox checked={this.state.checkBoxTerbanyak} color='white' onPress={() => this.pressedCheckBox('checkBoxTerbanyak')} />
                <Text style={{ marginLeft: 17, color: 'white' }}>Paling banyak dilihat</Text>
              </View>
            </View>
          </View>
        } */}

        {/* CONTENT */}
        <View style={styles.container}>
          {
            this.state.loading
              ? <Loading />
              : <View>
                <View style={styles.title}>
                  <Text style={styles.textTitleActive}> Pengumuman </Text>
                  <TouchableHighlight onPress={this.navigatePolanews} underlayColor="transparent">
                    <Text style={styles.textTitleInactive}>polanews</Text>
                  </TouchableHighlight>
                </View>

                <ScrollView style={{ marginBottom: 160 }}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}
                    />
                  }
                  onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                      this.loadMore()
                    }
                  }}
                  scrollEventThrottle={400}

                >
                  {
                    this.state.dataPilihan.length != 0 && <Fragment>
                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true} onMomentumScrollEnd={this.handleScroll}>
                        {
                          this.state.dataPilihan.map((el, index) => (<CardAnnouncement navigation={this.props.navigation} data={el} key={index} />
                          ))
                        }
                      </ScrollView>
                      <Text style={styles.indexSlideHorizontal}>{this.state.indexSlide} / {this.state.dataPilihan.length}</Text>
                    </Fragment>
                  }
                  <View style={styles.teksPengumuman}>
                    <Icon name='megaphone' size={18} style={{ marginRight: 10 }} />
                    <Text>Pengumuman terbaru</Text>
                  </View>
                  {
                    this.state.data.map((el, index) => (<CardAnnouncement navigation={this.props.navigation} data={el} key={index} />
                    ))
                  }
                  {
                    this.state.loadingText && <Text style={{ alignSelf: 'center', margin: 5 }}>Loading more...</Text>
                  }

                </ScrollView>
              </View>
          }
        </View>
      </SafeAreaView>
    )
  }
}

announcement.navigationOptions = {
  header: null
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
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
    marginLeft: 8,
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
  container: {
    backgroundColor: defaultBackgroundColor,
    height: '100%',
  },
  textColor: {
    color: defaultTextColor
  },
  sorting: {
    zIndex: 9,
    position: 'absolute',
    top: 15,
    right: 15,
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  teksPengumuman: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 5
  },
  indexSlideHorizontal: {
    alignSelf: "center",
    color: defaultColor,
    fontWeight: 'bold'
  }
})

const mapStateToProps = ({ token }) => {
  return {
    token
  }
}

export default connect(mapStateToProps)(withNavigationFocus(announcement))