import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, RefreshControl, TouchableHighlight, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Header, Icon, Tab, Tabs, ScrollableTab } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardRespon from '../../components/cardResponPermintaan';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { API } from '../../../config/API';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../../components/loading';

import { fetchDataMyTask } from '../../store/action';

class responPermintaanHRD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      butuhTindakan: [],
      pengajuan: [],
      disetujui: [],
      ditolak: [],
      category: ['Semua', 'Cuti', 'IMP', 'IJIN ABSEN'],
      categorySelected: 'Semua',
      refreshing: false
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    let token = await AsyncStorage.getItem('token')

    let getData, tempButuhTindakan = [], tempPengajuan = [], tempDisetujui = [], tempDitolak = []
    this.setState({
      loading: true
    })

    try {
      getData = await API.get('/contactUs/allContactUs',
        {
          headers: { token }
        })

      //request disetujui  new->new2->approved/rejected
      await getData.data.data.forEach(el => {
        if (this.props.isEvaluator) {
          if (
            (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
            el.type === 'request' &&
            ((el.status === 'new' && el.evaluator_1 === this.props.user_id) || (el.status === 'new2' && el.evaluator_2 === this.props.user_id))) {
            tempButuhTindakan.push(el)
          } else if (
            (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
            el.type === 'request' && el.status === 'approved' &&
            (el.evaluator_1 === this.props.user_id || el.evaluator_2 === this.props.user_id)) {
            tempDisetujui.push(el)
          } else if (
            (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
            el.type === 'request' && el.status === 'rejected' &&
            (el.evaluator_1 === this.props.user_id || el.evaluator_2 === this.props.user_id)) {
            tempDitolak.push(el)
          }

          if (
            (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
            el.type === 'request' && (el.status === 'new' || el.status === 'new2') &&
            (el.evaluator_1 === this.props.user_id || el.evaluator_2 === this.props.user_id)) {
            tempPengajuan.push(el)
          }
        } else {
          if (
            (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
            el.type === 'request' && el.status === 'approved') {
            tempDisetujui.push(el)
          } else if (
            (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
            el.type === 'request' && el.status === 'rejected') {
            tempDitolak.push(el)
          }

          if (
            (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
            el.type === 'request' && (el.status === 'new' || el.status === 'new2')) {
            tempPengajuan.push(el)
          }
        }
      });

      this.setState({
        data: getData.data.data,
        butuhTindakan: tempButuhTindakan,
        pengajuan: tempPengajuan,
        disetujui: tempDisetujui,
        ditolak: tempDitolak,
        loading: false,
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

  changeCategory = async args => {
    let keterangan, tempButuhTindakan = [], tempPengajuan = [], tempDisetujui = [], tempDitolak = []
    this.setState({
      categorySelected: args,
      loading: true,
    })

    if (args === 'Cuti') {
      keterangan = 'leave_date'
    } else if (args === 'IMP') {
      keterangan = 'date_imp'
    } else if (args === 'IJIN ABSEN') {
      keterangan = 'date_ijin_absen_start'
    }

    await this.state.data.forEach(el => {
      if (this.props.isEvaluator) {
        if (
          (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
          el.type === 'request' &&
          ((el.status === 'new' && el.evaluator_1 === this.props.user_id) || (el.status === 'new2' && el.evaluator_2 === this.props.user_id))) {
          tempButuhTindakan.push(el)
        } else if (
          (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
          el.type === 'request' && el.status === 'approved' &&
          (el.evaluator_1 === this.props.user_id || el.evaluator_2 === this.props.user_id)) {
          tempDisetujui.push(el)
        } else if (
          (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
          el.type === 'request' && el.status === 'rejected' &&
          (el.evaluator_1 === this.props.user_id || el.evaluator_2 === this.props.user_id)) {
          tempDitolak.push(el)
        }

        if (
          (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
          el.type === 'request' && (el.status === 'new' || el.status === 'new2') &&
          (el.evaluator_1 === this.props.user_id || el.evaluator_2 === this.props.user_id)) {
          tempPengajuan.push(el)
        }
      } else {
        if (
          (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
          el.type === 'request' && el.status === 'approved') {
          tempDisetujui.push(el)
        } else if (
          (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
          el.type === 'request' && el.status === 'rejected') {
          tempDitolak.push(el)
        }

        if (
          (el.date_imp !== null || el.leave_date !== null || el.date_ijin_absen_start !== null) &&
          el.type === 'request' && (el.status === 'new' || el.status === 'new2')) {
          tempPengajuan.push(el)
        }
        
      }
    });

    this.setState({
      butuhTindakan: tempButuhTindakan,
      pengajuan: tempPengajuan,
      disetujui: tempDisetujui,
      ditolak: tempDitolak,
      loading: false,
    })
  }

  refresh = () => {
    this.fetchData()
    let newData = {
      user_id: this.props.user_id,
      adminContactCategori: this.props.adminContactCategori
    }
    this.props.fetchDataMyTask(newData)
  }

  render() {
    return (
      <SafeAreaView>

        {/* HEADER - menu button drawer, title, icon sorting */}
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <Icon name='browsers' style={{ color: defaultColor }} size={32} />
            <Text style={styles.textTitleHeader}>RESPONS PERMINTAAN</Text>
          </View>
        </Header>

        {/* CONTENT */}
        <View style={styles.container}>

          {/* <Tabs renderTabBar={() => <ScrollableTab tabsContainerStyle={styles.tabsContainerStyle} />} tabBarUnderlineStyle={{ backgroundColor: defaultColor }} locked={true}> */}
          <Tabs renderTabBar={() => <ScrollableTab tabsContainerStyle={styles.tabsContainerStyle} />} tabBarUnderlineStyle={{ backgroundColor: defaultColor }}>
            {
              this.props.isEvaluator && <Tab heading="butuh tindakan"
                tabStyle={styles.tab}
                textStyle={{ color: defaultColor }}
                activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
                activeTextStyle={styles.activeTextStyle}>
                {
                  this.state.loading
                    ? <Loading />
                    : <View style={{ backgroundColor: defaultBackgroundColor }}>
                      {/* {
                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={this.handleScroll} style={{ height: 50 }}>
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
                            this.state.butuhTindakan.length > 0
                              ? this.state.butuhTindakan.map((el, index) => (
                                <CardRespon navigation={this.props.navigation} data={el} status={0} key={index} refresh={this.refresh} />
                              ))
                              : <View style={styles.placeImage}>
                                <Image source={{ uri: "asset:/permintaan_kosong.png" }} style={styles.image} />
                                <Text>Belum ada daftar {this.props.navigation.getParam('status')}</Text>
                              </View>
                          }
                        </View>
                      </ScrollView>
                    </View>
                }
              </Tab>
            }
            <Tab heading="pengajuan"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
              activeTextStyle={styles.activeTextStyle}>
              {
                this.state.loading
                  ? <Loading />
                  : <View style={{ backgroundColor: defaultBackgroundColor }}>
                    {/* {
                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={this.handleScroll} style={{ height: 50 }}>
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
                          this.state.pengajuan.length > 0
                            ? this.state.pengajuan.map((el, index) => (
                              <CardRespon navigation={this.props.navigation} data={el} status={1} key={index} refresh={this.refresh} />
                            ))
                            : <View style={styles.placeImage}>
                              <Image source={{ uri: "asset:/permintaan_kosong.png" }} style={styles.image} />
                              <Text>Belum ada daftar {this.props.navigation.getParam('status')}</Text>
                            </View>
                        }
                      </View>
                    </ScrollView>
                  </View>
              }
            </Tab>
            <Tab heading="disetujui"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
              activeTextStyle={styles.activeTextStyle}>
              {
                this.state.loading
                  ? <Loading />
                  : <View style={{ backgroundColor: defaultBackgroundColor }}>
                    {/* {
                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={this.handleScroll} style={{ height: 50 }}>
                        {
                          this.state.category.map((el, index) =>
                            this.state.categorySelected === el
                              ? <TouchableHighlight key={index} style={{ paddingLeft: 5, paddingRight: 5, borderRadius: 10, borderWidth: 1, borderColor: defaultColor, margin: 10, alignItems: 'center', minWidth: 50, backgroundColor: '#F9BCBC' }} underlayColor="transparent" onPress={() => this.changeCategory(el)} underlayColor="transparent">
                                <Text style={styles.textTitleInactive}> {el} </Text>
                              </TouchableHighlight>
                              : <TouchableHighlight key={index} style={{ paddingLeft: 5, paddingRight: 5, borderRadius: 10, borderWidth: 1, borderColor: '#B7B7B7', margin: 10, alignItems: 'center', minWidth: 50 }} underlayColor="transparent" onPress={() => this.changeCategory(el)} underlayColor="transparent">
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
                          this.state.disetujui.length > 0
                            ? this.state.disetujui.map((el, index) => (
                              <CardRespon navigation={this.props.navigation} data={el} status={2} key={index} refresh={this.refresh} />
                            ))
                            : <View style={styles.placeImage}>
                              <Image source={{ uri: "asset:/permintaan_kosong.png" }} style={styles.image} />
                              <Text>Belum ada daftar</Text>
                            </View>
                        }
                      </View>
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
                  ? <Loading />
                  : <View style={{ backgroundColor: defaultBackgroundColor }}>
                    {/* {
                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onMomentumScrollEnd={this.handleScroll} style={{ height: 50 }}>
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
                          this.state.ditolak.length > 0
                            ? this.state.ditolak.map((el, index) => (
                              <CardRespon navigation={this.props.navigation} data={el} status={3} key={index} refresh={this.refresh} />
                            ))
                            : <View style={styles.placeImage}>
                              <Image source={{ uri: "asset:/permintaan_kosong.png" }} style={styles.image} />
                              <Text>Belum ada </Text>
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

responPermintaanHRD.navigationOptions = {
  header: null
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    padding: 5,
    paddingBottom: 0,
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
    bottom: -60,
    right: 1 / 2 * width - 50,
    height: 100,
    backgroundColor: defaultColor,
    borderRadius: 130,
    paddingTop: 10
  },
  tabsContainerStyle: {
    backgroundColor: defaultBackgroundColor,
    justifyContent: 'flex-start',
  },
})

const mapDispatchToProps = {
  fetchDataMyTask
}

const mapStateToProps = ({ user_id, adminContactCategori, isEvaluator }) => {
  return {
    user_id,
    adminContactCategori,
    isEvaluator
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(responPermintaanHRD)