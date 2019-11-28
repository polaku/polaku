import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, RefreshControl, TouchableHighlight, TouchableOpacity, Dimensions, Alert } from 'react-native';
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
      dataQuestion: [],
      dataRequest: [],
      ongoing: [],
      confirmation: [],
      done: [],
      cancel: [],
      refreshing: false,
      category: [],
      // category: ['Semua', 'IT', 'HRD', 'DESAIN', 'LAINNYA'],
      // categorySelected: 'Semua',
    }
  }

  componentDidMount() {
    this.fetchData()

    // if (this.props.navigation.getParam('status') === 'Pertanyaan') {
    //   this.setState({
    //     category: ['Semua', 'IT', 'HRD', 'DESAIN', 'LAINNYA']
    //   })
    // } else {
    //   this.setState({
    //     category: ['Semua', 'HRD', 'DESAIN']
    //   })
    // }

  }

  fetchData = async () => {
    let token = await AsyncStorage.getItem('token')

    let getData, tempOngoing = [], tempConfirmation = [], tempDone = [], tempCancel = [], question = [], request = [], typeContact = ''
    this.setState({
      loading: true
    })

    this.props.navigation.getParam('status') === 'Pertanyaan' ? typeContact = 'contact_us' : typeContact = 'request' 

    try {
      getData = await API.get('/contactUs',
        {
          headers: { token }
        })

      // ongoing(new, assigned, on going), confirmation, done, cancel
      getData.data.data.forEach(el => {
        if (el.status === 'confirmation' && el.type===typeContact) {
          tempConfirmation.push(el)
        } else if (el.status === 'done' && el.type===typeContact) {
          tempDone.push(el)
        } else if (el.status === 'cancel' && el.type===typeContact) {
          tempCancel.push(el)
        } else if (el.type===typeContact){
          tempOngoing.push(el)
        }
      });

      this.setState({
        dataQuestion: question,
        dataRequest: request,
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
      if (err.message === 'Request failed with status code 403') {
        Alert.alert('Error', 'waktu login telah habis, silahkan login kembali')
        this.props.navigation.navigate('Login')
        AsyncStorage.clear()
      } else {
        Alert.alert('Error', `${err}`)

      }
    }
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.fetchData()
    this.setState({ refreshing: false });
  }

  changeCategory = args => {
    this.setState({
      categorySelected: args
    })
  }

  navigateCreate = () => {

    this.props.navigation.getParam('status') === 'Pertanyaan'
    ? this.props.navigation.navigate("Pertanyaan")
    : this.props.navigation.navigate("Permintaan")
  }

  render() {
    return (
      <SafeAreaView>

        {/* HEADER - menu button drawer, title, icon sorting */}
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <Icon name='browsers' style={{ color: defaultColor }} size={32} />
            <Text style={styles.textTitleHeader}>Daftar {this.props.navigation.getParam('status')}</Text>
          </View>
        </Header>

        {/* CONTENT */}
        <View style={styles.container}>

          {/* <Tabs renderTabBar={() => <ScrollableTab />} tabBarUnderlineStyle={{ backgroundColor: defaultColor }} locked={true}> */}
          <Tabs renderTabBar={() => <ScrollableTab />} tabBarUnderlineStyle={{ backgroundColor: defaultColor }}>
            <Tab heading="sedang berlangsung"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
              activeTextStyle={styles.activeTextStyle}>
              {
                this.state.loading
                  ? <Loading />
                  : <View style={{ backgroundColor: defaultBackgroundColor }}>
                    {/* {
                      this.state.ongoing.length > 0
                      && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={this.handleScroll} style={{ height: 50 }}>
                        {
                          this.state.category.map((el, index) =>
                            this.state.categorySelected === el
                              ? <TouchableHighlight key={index} style={{ paddingLeft: 5, paddingRight: 5, borderRadius: 10, borderWidth: 1, borderColor: defaultColor, margin: 10, alignItems: 'center', minWidth: 50, backgroundColor: '#F9BCBC' }} underlayColor="transparent" onPress={() => this.changeCategory(el)}>
                                <Text style={styles.textTitleInactive}> {el} </Text>
                              </TouchableHighlight>
                              : <TouchableHighlight key={index} style={{ paddingLeft: 5, paddingRight: 5, borderRadius: 10, borderWidth: 1, borderColor: '#B7B7B7', margin: 10, alignItems: 'center', minWidth: 50 }} underlayColor="transparent" onPress={() => this.changeCategory(el)}>
                                <Text style={{ color: '#B7B7B7' }}> {el} </Text>
                              </TouchableHighlight>
                          )
                        }
                      </ScrollView>
                    } */}
                    <ScrollView style={styles.scrollView} refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                      />
                    }>

                      <View style={styles.containerItem}>
                        {
                          this.state.ongoing.length > 0
                            ? this.state.ongoing.map((el, index) => (
                              <CardPermintaan navigation={this.props.navigation} data={el} fetchData={this.fetchData} key={index} ongoing={true}/>
                            ))
                            : <View style={styles.placeImage}>
                              <Image source={{ uri: "asset:/permintaan_kosong.png" }} style={styles.image} />
                              <Text>Bellum ada daftar {this.props.navigation.getParam('status')}</Text>
                            </View>
                        }
                      </View>
                    </ScrollView>
                  </View>
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
                  : <View style={{ backgroundColor: defaultBackgroundColor }}>
                    {/* {
                      this.state.confirmation.length > 0
                      && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={this.handleScroll} style={{ height: 50 }}>
                        {
                          this.state.category.map((el, index) =>
                            this.state.categorySelected === el
                              ? <TouchableHighlight key={index} style={{ paddingLeft: 5, paddingRight: 5, borderRadius: 10, borderWidth: 1, borderColor: defaultColor, margin: 10, alignItems: 'center', minWidth: 50, backgroundColor: '#F9BCBC' }} underlayColor="transparent" onPress={() => this.changeCategory(el)}>
                                <Text style={styles.textTitleInactive}> {el} </Text>
                              </TouchableHighlight>
                              : <TouchableHighlight key={index} style={{ paddingLeft: 5, paddingRight: 5, borderRadius: 10, borderWidth: 1, borderColor: '#B7B7B7', margin: 10, alignItems: 'center', minWidth: 50 }} underlayColor="transparent" onPress={() => this.changeCategory(el)}>
                                <Text style={{ color: '#B7B7B7' }}> {el} </Text>
                              </TouchableHighlight>
                          )
                        }
                      </ScrollView>
                    } */}
                    <ScrollView style={styles.scrollView} refreshControl={
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
                              <Image source={{ uri: "asset:/permintaan_kosong.png" }} style={styles.image} />
                              <Text>Bellum ada daftar {this.props.navigation.getParam('status')}</Text>
                            </View>
                        }
                      </View>
                    </ScrollView>
                  </View>
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
                  : <View style={{ backgroundColor: defaultBackgroundColor }}>
                    {/* {
                      this.state.done.length > 0
                      && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={this.handleScroll} style={{ height: 50 }}>
                        {
                          this.state.category.map((el, index) =>
                            this.state.categorySelected === el
                              ? <TouchableHighlight key={index} style={{ paddingLeft: 5, paddingRight: 5, borderRadius: 10, borderWidth: 1, borderColor: defaultColor, margin: 10, alignItems: 'center', minWidth: 50, backgroundColor: '#F9BCBC' }} underlayColor="transparent" onPress={() => this.changeCategory(el)}>
                                <Text style={styles.textTitleInactive}> {el} </Text>
                              </TouchableHighlight>
                              : <TouchableHighlight key={index} style={{ paddingLeft: 5, paddingRight: 5, borderRadius: 10, borderWidth: 1, borderColor: '#B7B7B7', margin: 10, alignItems: 'center', minWidth: 50 }} underlayColor="transparent" onPress={() => this.changeCategory(el)}>
                                <Text style={{ color: '#B7B7B7' }}> {el} </Text>
                              </TouchableHighlight>
                          )
                        }
                      </ScrollView>
                    } */}
                    <ScrollView style={styles.scrollView} refreshControl={
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
                              <Image source={{ uri: "asset:/permintaan_kosong.png" }} style={styles.image} />
                              <Text>Bellum ada daftar {this.props.navigation.getParam('status')}</Text>
                            </View>
                        }
                      </View>
                    </ScrollView>
                  </View>
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
                  : <View style={{ backgroundColor: defaultBackgroundColor }}>
                    {/* {
                      this.state.cancel.length > 0
                      && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={this.handleScroll} style={{ height: 50 }}>
                        {
                          this.state.category.map((el, index) =>
                            this.state.categorySelected === el
                              ? <TouchableHighlight key={index} style={{ paddingLeft: 5, paddingRight: 5, borderRadius: 10, borderWidth: 1, borderColor: defaultColor, margin: 10, alignItems: 'center', minWidth: 50, backgroundColor: '#F9BCBC' }} underlayColor="transparent" onPress={() => this.changeCategory(el)}>
                                <Text style={styles.textTitleInactive}> {el} </Text>
                              </TouchableHighlight>
                              : <TouchableHighlight key={index} style={{ paddingLeft: 5, paddingRight: 5, borderRadius: 10, borderWidth: 1, borderColor: '#B7B7B7', margin: 10, alignItems: 'center', minWidth: 50 }} underlayColor="transparent" onPress={() => this.changeCategory(el)}>
                                <Text style={{ color: '#B7B7B7' }}> {el} </Text>
                              </TouchableHighlight>
                          )
                        }
                      </ScrollView>
                    } */}
                    <ScrollView style={styles.scrollView} refreshControl={
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
                              <Image source={{ uri: "asset:/permintaan_kosong.png" }} style={styles.image} />
                              <Text>Bellum ada daftar {this.props.navigation.getParam('status')}</Text>
                            </View>
                        }
                      </View>
                    </ScrollView>
                  </View>
              }
            </Tab>
          </Tabs>
        </View>
        <TouchableOpacity style={styles.buttonAdd} onPress={this.navigateCreate}>
          <Icon name="add" size={30} style={{ color: defaultTextColor }} />
        </TouchableOpacity>
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

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    padding: 5,
    height: '100%',
    alignSelf: 'center',
    paddingBottom: 110
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
    paddingBottom: 50
  },
  scrollView: {
    width: '100%',
    height: '100%',
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
    alignItems: 'center',
    backgroundColor: defaultBackgroundColor
  },
  textTitleInactive: {
    color: defaultColor
  },
  buttonAdd: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    width: 100,
    position: 'absolute',
    bottom: 0,
    right: 1 / 2 * width - 50,
    height: 100,
    backgroundColor: defaultColor,
    borderRadius: 130,
    paddingTop: 10
  },
})

