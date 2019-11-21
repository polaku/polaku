import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, RefreshControl, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import { Header, Icon, Tab, Tabs, ScrollableTab } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardTugas from '../../components/cardTugas';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { API } from '../../../config/API';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../../components/loading';

class daftarTugas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      daftarPertanyaan: [],
      daftarTugas: [],
      tugasku: [],
      ongoing: [],
      confirmation: [],
      done: [],
      cancel: [],
      daftarPertanyaanHRD: [],
      daftarPertanyaanIt: [],
      daftarPertanyaanDesain: [],
      refreshing: false,
      // category: [],
      // categorySelected: 'Semua',
      isPertanyaan: false,
    }
  }

  componentDidMount() {
    let arrayAdminContactCategori = this.props.adminContactCategori.split(',')
    if (this.props.navigation.getParam('pertanyaan') === true) {
      let newCategori = []
      this.fetchData()
      // 'Semua', 'IT', 'HRD', 
      if (arrayAdminContactCategori.length > 1) {
        arrayAdminContactCategori.forEach(el => {
          if (Number(el) === 1) {
            newCategori.push('Desain')
          } else if (Number(el) === 2) {
            newCategori.push('IT')
          } else if (Number(el) === 4) {
            newCategori.push('HRD')
          }
        })
        newCategori.unshift('Semua')
      }
      this.setState({
        isPertanyaan: true,
        // category: newCategori
      })
    } else {
      console.log(this.props.navigation.getParam('permintaan'));
      this.fetchData()
    }
  }

  fetchData = async () => {
    let token = await AsyncStorage.getItem('token')
    let arrayAdminContactCategori = this.props.adminContactCategori.split(',')

    let getData, tempDaftarPertanyaan = [], tempDaftarTugas = [], tempTugasku = [], tempOngoing = [], tempKonfirmasi = [], tempDone = [], pertanyaanIt = [], pertanyaanHRD = [], pertanyaanDesain = [], typeContact = ''
    this.setState({
      loading: true
    })

    this.props.navigation.getParam('pertanyaan') === true ? typeContact = 'contact_us' : typeContact = 'request'

    try {
      getData = await API.get('/contactUs/allContactUs',
        {
          headers: { token }
        })

      // STATUS PERTANYAAN
      if (this.props.navigation.getParam('pertanyaan') === true) {
        getData.data.data.forEach(el => {
          arrayAdminContactCategori.forEach(idAdminContactCategori => {
            if (el.type === typeContact && el.contact_categories_id === Number(idAdminContactCategori)) {
              if (el.status === 'new' && typeContact === 'contact_us') {
                tempDaftarPertanyaan.push(el)
              } else if (el.status === 'assigned' && Number(el.taken_by) === this.props.user_id) {
                tempTugasku.push(el)
              } else if (el.status === 'ongoing' && Number(el.taken_by) === this.props.user_id) {
                tempOngoing.push(el)
              } else if (el.status === 'confirmation' && Number(el.taken_by) === this.props.user_id) {
                tempKonfirmasi.push(el)
              } else if (el.status === 'done' && Number(el.taken_by) === this.props.user_id) {
                tempDone.push(el)
              }
            }
          })
        });

        tempDaftarPertanyaan.forEach(el => {
          if (el.contact_categories_id === 1) {
            pertanyaanDesain.push(el)
          } else if (el.contact_categories_id === 2) {
            pertanyaanIt.push(el)
          } else if (el.contact_categories_id === 4) {
            pertanyaanHRD.push(el)
          }
        })
      } else {      // STATUS PERMINTAAN
        await getData.data.data.forEach(el => {
          if (el.type === typeContact && el.contact_categories_id === Number(this.props.navigation.getParam('status'))) {
            if (el.status === 'new' && el.contact_categories_id !== 4) {
              tempDaftarTugas.push(el)
            } else if (el.status === 'assigned' && Number(el.taken_by) === this.props.user_id) {
              tempTugasku.push(el)
            } else if (el.status === 'ongoing' && Number(el.taken_by) === this.props.user_id) {
              tempOngoing.push(el)
            } else if (el.status === 'confirmation' && Number(el.taken_by) === this.props.user_id) {
              tempKonfirmasi.push(el)
            } else if (el.status === 'done' && Number(el.taken_by) === this.props.user_id) {
              tempDone.push(el)
            }
          }
        });
      }

      this.setState({
        data: getData.data.data,
        daftarPertanyaan: tempDaftarPertanyaan,
        daftarPertanyaanHRD: pertanyaanHRD,
        daftarPertanyaanIt: pertanyaanIt,
        daftarPertanyaanDesain: pertanyaanDesain,
        daftarTugas: tempDaftarTugas,
        tugasku: tempTugasku,
        ongoing: tempOngoing,
        confirmation: tempKonfirmasi,
        done: tempDone,
        loading: false,
      })
    } catch (err) {
      this.setState({
        loading: false
      })
      if (err.message === 'Request failed with status code 403') {
        alert('Waktu login telah habis, silahkan login kembali')
        this.props.navigation.navigate('Login')
        AsyncStorage.clear()
      } else {
        alert(err)
        console.log(err);
      }
    }
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.fetchData()
    this.setState({ refreshing: false });
  }

  changeCategory = args => {
    let idFilter = null
    let arrayAdminContactCategori = this.props.adminContactCategori.split(',')

    let tempDaftarPertanyaan = [], tempDaftarTugas = [], tempTugasku = [], tempOngoing = [], tempKonfirmasi = [], tempDone = [], pertanyaanIt = [], pertanyaanHRD = [], pertanyaanDesain = [], typeContact = ''
    this.setState({
      categorySelected: args
    })

    if (args === 'Desain') {
      idFilter = 1
    } else if (args === 'IT') {
      idFilter = 2
    } else if (args === 'HRD') {
      idFilter = 4
    }

    this.props.navigation.getParam('pertanyaan') === true ? typeContact = 'contact_us' : typeContact = 'request'

    this.state.data.forEach(el => {
      if (args === 'Semua') {
        arrayAdminContactCategori.forEach(idAdminContactCategori => {
          if (el.type === typeContact && el.contact_categories_id === Number(idAdminContactCategori)) {
            if (el.status === 'new') {
              if (typeContact === 'contact_us') {
                tempDaftarPertanyaan.push(el)
              } else if (typeContact === 'request' && el.contact_categories_id !== 4) {
                tempDaftarTugas.push(el)
              }
            } else if (el.status === 'assigned' && Number(el.taken_by) === this.props.user_id) {
              tempTugasku.push(el)
            } else if (el.status === 'ongoing' && Number(el.taken_by) === this.props.user_id) {
              tempOngoing.push(el)
            } else if (el.status === 'confirmation' && Number(el.taken_by) === this.props.user_id) {
              tempKonfirmasi.push(el)
            } else if (el.status === 'done' && Number(el.taken_by) === this.props.user_id) {
              tempDone.push(el)
            }
          }
        })
      } else {
        if (el.type === typeContact && el.contact_categories_id === Number(idFilter)) {
          if (el.status === 'new') {
            if (typeContact === 'contact_us') {
              tempDaftarPertanyaan.push(el)
            } else if (typeContact === 'request' && el.contact_categories_id !== 4) {
              tempDaftarTugas.push(el)
            }
          } else if (el.status === 'assigned' && Number(el.taken_by) === this.props.user_id) {
            tempTugasku.push(el)
          } else if (el.status === 'ongoing' && Number(el.taken_by) === this.props.user_id) {
            tempOngoing.push(el)
          } else if (el.status === 'confirmation' && Number(el.taken_by) === this.props.user_id) {
            tempKonfirmasi.push(el)
          } else if (el.status === 'done' && Number(el.taken_by) === this.props.user_id) {
            tempDone.push(el)
          }
        }
      }
    });

    this.setState({
      daftarPertanyaan: tempDaftarPertanyaan,
      daftarPertanyaanHRD: pertanyaanHRD,
      daftarPertanyaanIt: pertanyaanIt,
      daftarPertanyaanDesain: pertanyaanDesain,
      daftarTugas: tempDaftarTugas,
      tugasku: tempTugasku,
      ongoing: tempOngoing,
      confirmation: tempKonfirmasi,
      done: tempDone,
      loading: false,
    })
  }

  render() {
    return (
      <SafeAreaView>

        {/* HEADER - menu button drawer, title, icon sorting */}
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <Icon name='browsers' style={{ color: defaultColor }} size={32} />
            <Text style={styles.textTitleHeader}>Tugas</Text>
          </View>
        </Header>

        {/* CONTENT */}
        <View style={styles.container}>

          {/* <Tabs renderTabBar={() => <ScrollableTab tabsContainerStyle={styles.tabsContainerStyle} />} tabBarUnderlineStyle={{ backgroundColor: defaultColor }} locked={true}> */}
          <Tabs renderTabBar={() => <ScrollableTab tabsContainerStyle={styles.tabsContainerStyle} />} tabBarUnderlineStyle={{ backgroundColor: defaultColor }}>
            {
              this.state.isPertanyaan
                ? <Tab heading="daftar pertanyaan"
                  tabStyle={styles.tab}
                  textStyle={{ color: defaultColor }}
                  activeTabStyle={{ backgroundColor: defaultBackgroundColor, height: '100%' }}
                  activeTextStyle={styles.activeTextStyle}>
                  {
                    this.state.loading
                      ? <Loading />
                      : <View style={{ backgroundColor: defaultBackgroundColor, height: '100%' }}>
                        {/* {
                          this.state.category.length > 1 && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={this.handleScroll} style={{ height: 50 }}>
                            {
                              this.state.category.map((el, index) =>
                                this.state.categorySelected === el
                                  ? <TouchableHighlight key={index} style={{ paddingLeft: 5, paddingRight: 5, borderRadius: 10, borderWidth: 1, borderColor: defaultColor, margin: 10, alignItems: 'center', minWidth: 50, backgroundColor: '#F9BCBC', justifyContent: 'center', alignItems: 'center' }} underlayColor="transparent" onPress={() => this.changeCategory(el)}>
                                    <Text style={styles.textTitleInactive}> {el} </Text>
                                  </TouchableHighlight>
                                  : <TouchableHighlight key={index} style={{ paddingLeft: 5, paddingRight: 5, borderRadius: 10, borderWidth: 1, borderColor: '#B7B7B7', margin: 10, alignItems: 'center', minWidth: 50, justifyContent: 'center', alignItems: 'center' }} underlayColor="transparent" onPress={() => this.changeCategory(el)}>
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
                              this.state.daftarPertanyaan.length > 0
                                ? this.state.daftarPertanyaan.map((el, index) => (
                                  <CardTugas navigation={this.props.navigation} data={el} key={index} index={0} />
                                ))
                                : <View style={styles.placeImage}>
                                  <Image source={{ uri: "asset:/permintaan_kosong.png" }} style={styles.image} />
                                  <Text>Belum ada pertanyaan baru</Text>
                                </View>
                            }
                          </View>
                        </ScrollView>
                      </View>
                  }
                </Tab>
                : <Tab heading="daftar tugas"
                  tabStyle={styles.tab}
                  textStyle={{ color: defaultColor }}
                  activeTabStyle={{ backgroundColor: defaultBackgroundColor, height: '100%' }}
                  activeTextStyle={styles.activeTextStyle}>
                  {
                    this.state.loading
                      ? <Loading />
                      : <View style={{ backgroundColor: defaultBackgroundColor, height: '100%' }}>
                        {/* {
                          this.state.category.length > 1 && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={this.handleScroll} style={{ height: 50 }}>
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
                              this.state.daftarTugas.length > 0
                                ? this.state.daftarTugas.map((el, index) => (
                                  <CardTugas navigation={this.props.navigation} fetchData={this.fetchData} data={el} key={index} index={0} />
                                ))
                                : <View style={styles.placeImage}>
                                  <Image source={{ uri: "asset:/permintaan_kosong.png" }} style={styles.image} />
                                  <Text>Belum ada tugas baru</Text>
                                </View>
                            }
                          </View>
                        </ScrollView>
                      </View>
                  }
                </Tab>
            }
            <Tab heading="tugasku"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor, height: '100%' }}
              activeTextStyle={styles.activeTextStyle}>
              {
                this.state.loading
                  ? <Loading />
                  : <View style={{ backgroundColor: defaultBackgroundColor, height: '100%' }}>
                    {/* {
                      this.state.category.length > 1 && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={this.handleScroll} style={{ height: 50 }}>
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
                          this.state.tugasku.length > 0
                            ? this.state.tugasku.map((el, index) => (
                              <CardTugas navigation={this.props.navigation} data={el} fetchData={this.fetchData} key={index} index={1} />
                            ))
                            : <View style={styles.placeImage}>
                              <Image source={{ uri: "asset:/permintaan_kosong.png" }} style={styles.image} />
                              <Text>Belum ada tugas baru</Text>
                            </View>
                        }

                      </View>
                    </ScrollView>
                  </View>
              }
            </Tab>
            <Tab heading="sedang berlangsung"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor, height: '100%' }}
              activeTextStyle={styles.activeTextStyle}>
              {
                this.state.loading
                  ? <Loading />
                  : <View style={{ height: '100%', backgroundColor: defaultBackgroundColor }}>
                    {/* {
                      this.state.category.length > 1 && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={this.handleScroll} style={{ height: 50 }}>
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
                              <CardTugas navigation={this.props.navigation} data={el} fetchData={this.fetchData} key={index} index={2} />
                            ))
                            : <View style={styles.placeImage}>
                              <Image source={{ uri: "asset:/permintaan_kosong.png" }} style={styles.image} />
                              <Text>Belum ada tugas yang sedang dikerjakan</Text>
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
              activeTabStyle={{ backgroundColor: defaultBackgroundColor, height: '100%' }}
              activeTextStyle={styles.activeTextStyle}>
              {
                this.state.loading
                  ? <Loading />
                  : <View style={{ height: '100%', backgroundColor: defaultBackgroundColor }}>
                    {/* {
                      this.state.category.length > 1 && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={this.handleScroll} style={{ height: 50 }}>
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
                              <CardTugas navigation={this.props.navigation} data={el} fetchData={this.fetchData} key={index} index={3} />
                            ))
                            : <View style={styles.placeImage}>
                              <Image source={{ uri: "asset:/permintaan_kosong.png" }} style={styles.image} />
                              <Text>Belum ada tugas baru</Text>
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
              activeTabStyle={{ backgroundColor: defaultBackgroundColor, height: '100%' }}
              activeTextStyle={styles.activeTextStyle}>
              {
                this.state.loading
                  ? <Loading />
                  : <View style={{ height: '100%', backgroundColor: defaultBackgroundColor }}>
                    {/* {
                      this.state.category.length > 1 && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={this.handleScroll} style={{ height: 50 }}>
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
                              <CardTugas navigation={this.props.navigation} data={el} fetchData={this.fetchData} key={index} index={4} />
                            ))
                            : <View style={styles.placeImage}>
                              <Image source={{ uri: "asset:/permintaan_kosong.png" }} style={styles.image} />
                              <Text>Belum ada tugas baru</Text>
                            </View>
                        }
                      </View>
                    </ScrollView>
                  </View>
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

daftarTugas.navigationOptions = {
  header: null
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    padding: 5,
    height: '100%',
    alignSelf: 'center',
    paddingBottom: 105
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
    height: '90%',
    backgroundColor: defaultBackgroundColor,
    paddingBottom: 50
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
  tabsContainerStyle: {
    backgroundColor: defaultBackgroundColor,
    justifyContent: 'flex-start',
  },
})

const mapStateToProps = ({ user_id, adminContactCategori }) => {
  return {
    user_id,
    adminContactCategori
  }
}

export default connect(mapStateToProps)(daftarTugas)