import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, SafeAreaView, Image } from 'react-native';
import { Badge } from "native-base";
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import AsyncStorage from '@react-native-community/async-storage';

import { API } from '../../../config/API';

import { fetchDataMyTask } from '../../store/action';

class hubungiKamiPermintaan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adminMoreOne: false,
      isTugasOnPress: false,
      desain: false,
      hrd: false,
      it: false,
      counterTugas: [],
    }
  }

  componentDidMount() {
    if (this.props.isEvaluator) {
      this.setState({
        counterTugas: this.props.myTaskButuhTindakan
      })
    } else {
      this.setState({
        counterTugas: this.props.requestForMe
      })
    }
  }


  navigateHubungiKamiFormRequestDesain = () => this.props.navigation.navigate('FormRequest', { data: 'DESAIN', keterangan: 'request' })

  navigateHubungiKamiFormRequest = () => this.props.navigation.navigate('FormRequest', { data: 'IT', keterangan: 'request' })

  navigateDaftarHubungiKami = () => this.props.navigation.navigate('Daftar Hubungi Kami', { status: 'Permintaan' })

  navigateDaftarTugas = () => this.props.navigation.navigate('DaftarTugas')


  tugasOnPress = () => {
    let newDesain = false, newIT = false, newHRD = false
    let adminContactCategori
    if (this.props.adminContactCategori) adminContactCategori = this.props.adminContactCategori.split(',')

    // console.log(adminContactCategori);
    if (adminContactCategori && adminContactCategori.length > 1) {
      // Admin lebih dari satu categori
      adminContactCategori.forEach(element => {
        if (Number(element) === 1) {
          newDesain = true
        } else if (Number(element) === 2) {
          newIT = true
        } else if (Number(element) === 4) {
          newHRD = true
        }
      });

      this.setState({
        desain: newDesain,
        it: newIT,
        hrd: newHRD,
        isTugasOnPress: !this.state.isTugasOnPress
      })
    } else {
      // Admin satu categori
      if (this.props.isEvaluator) {
        this.props.navigation.navigate('DaftarRespon')
      } else if (Number(adminContactCategori[0]) === 1) { // desain
        this.props.navigation.navigate('DaftarTugas', { permintaan: true, status: 1 })
      } else if (Number(adminContactCategori[0]) === 2) { // it
        this.props.navigation.navigate('DaftarTugas', { permintaan: true, status: 2 })
      } else if (Number(adminContactCategori[0]) === 4) { // hrd
        this.props.navigation.navigate('DaftarRespon')
      }
    }
  }

  navigateTugas = args => {
    if (args === 'hrd') {
      this.props.navigation.navigate('DaftarRespon')
    } else if (args === 'desain') {
      this.props.navigation.navigate('DaftarTugas', { permintaan: true, status: 1 })
    } else if (args === 'it') {
      this.props.navigation.navigate('DaftarTugas', { permintaan: true, status: 2 })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.myTaskButuhTindakan != this.props.myTaskButuhTindakan) {
    //   console.log("baru", this.props.myTaskButuhTindakan);
    // }
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: defaultBackgroundColor, height: '100%' }}>
        {
          (this.props.adminContactCategori || this.props.isEvaluator)
            ? <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>

              <TouchableHighlight onPress={this.tugasOnPress} style={{
                padding: 5,
                margin: 10,
                height: 50,
                borderRadius: 5,
                backgroundColor: this.state.isTugasOnPress ? defaultColor : defaultBackgroundColor,
                justifyContent: 'center'
              }} underlayColor="transparent">
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: this.state.isTugasOnPress ? 'white' : defaultColor,
                  }}> Tugas </Text>
                  {
                    this.props.navigation.getParam("notif") != 0 && <Badge style={{ height: 'auto', marginLeft: 10, backgroundColor: this.state.isTugasOnPress ? 'white' : defaultColor }}>
                      <Text style={{ color: this.state.isTugasOnPress ? defaultColor : 'white' }}>{this.state.counterTugas.length}</Text>
                    </Badge>
                  }
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={this.navigateDaftarHubungiKami} style={styles.buttonDaftarPermintaan} underlayColor="transparent">
                <Text style={styles.textTitleInactive}> daftar permintaan </Text>
              </TouchableHighlight>
            </View>
            : <View style={{ alignSelf: 'flex-end' }}>
              <TouchableHighlight onPress={this.navigateDaftarHubungiKami} style={styles.buttonDaftarPermintaan} underlayColor="transparent">
                <Text style={styles.textTitleInactive}> daftar permintaan </Text>
              </TouchableHighlight>
            </View>
        }
        {
          !this.state.isTugasOnPress
            ? <>
              <Text style={{ marginTop: 5, marginLeft: 15, fontSize: 17, fontWeight: 'bold', color: defaultColor }}>Ingin membuat permintaan?</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <TouchableHighlight onPress={this.navigateHubungiKamiFormRequest} underlayColor="transparent">
                  <View style={styles.containerItem}>
                    <Image source={{ uri: "asset:/it.png" }} style={{ height: 80, width: 80 }} />
                    <Text style={{ marginTop: 10, fontWeight: 'bold' }}>IT</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.navigateHubungiKamiFormRequestDesain} underlayColor="transparent">
                  <View style={styles.containerItem}>
                    <Image source={{ uri: "asset:/design.png" }} style={{ height: 80, width: 80 }} />
                    <Text style={{ marginTop: 10, fontWeight: 'bold' }}>DESAIN</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </>
            : <>
              <Text style={{ marginTop: 15, marginLeft: 15, fontSize: 17, fontWeight: 'bold', color: defaultColor }}>Lihat daftar respons</Text>
              <View style={{ flexDirection: 'row' }}>
                {
                  this.state.desain && <TouchableHighlight onPress={() => this.navigateTugas('desain')} underlayColor="transparent">
                    <View style={styles.containerItem}>
                      <Image source={{ uri: "asset:/design.png" }} style={{ height: 80, width: 80 }} />
                      <Text style={{ marginTop: 10, fontWeight: 'bold' }}>DESAIN</Text>
                    </View>
                  </TouchableHighlight>
                }
                {
                  this.state.hrd && <TouchableHighlight onPress={() => this.navigateTugas('hrd')} underlayColor="transparent">
                    <View style={styles.containerItem}>
                      <Image source={{ uri: "asset:/hrd.png" }} style={{ height: 80, width: 80 }} />
                      <Text style={{ marginTop: 10, fontWeight: 'bold' }}>HRD</Text>
                    </View>
                  </TouchableHighlight>
                }

              </View>
            </>
        }

      </SafeAreaView>
    )
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    height: '100%',
    marginBottom: 60
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
  textColor: {
    color: defaultTextColor
  },
  flatList: {
    paddingTop: 10,
    marginBottom: 120,
    backgroundColor: defaultBackgroundColor
  },
  containerItem: {
    width: 1 / 2 * width - 10,
    height: 1 / 2 * width - 10,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    paddingTop: 5
  },
  textTitleInactive: {
    fontSize: 15,
    fontWeight: 'bold',
    color: defaultColor
  },
  buttonDaftarPermintaan: {
    padding: 10,
    marginRight: 10,
    height: 50,
    justifyContent: 'center'
  }
})

const mapDispatchToProps = {
  fetchDataMyTask
}

const mapStateToProps = ({ user_id, myTaskButuhTindakan, requestForMe, position_id, adminContactCategori, isEvaluator }) => {
  return {
    user_id,
    myTaskButuhTindakan,
    requestForMe,
    position_id,
    adminContactCategori,
    isEvaluator
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(hubungiKamiPermintaan)