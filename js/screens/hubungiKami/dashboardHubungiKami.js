import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, SafeAreaView } from 'react-native';
import { Header, Accordion, Badge } from "native-base";
import MenuButton from '../../components/menuButton';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CardContent from '../../components/cardContent';
import Loading from '../../components/loading';

import { fetchDataMyTask, fetchDataMyContactUs } from '../../store/action';
import { ScrollView } from 'react-native-gesture-handler';

class dashboardPertanyaan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'Daftar',
      expanded: false,
      dataPermintaan: [],
      dataPertanyaan: [],
      isAdmin: false
    }
  }

  async componentDidMount() {
    if (this.props.adminContactCategori) {
      this.setState({
        isAdmin: true
      })
    }
    await this.fetchData()
  }

  fetchData = async () => {

    let newTaskButuhTindakan = [], newPertanyaanForMe = [], newMyPermintaan = [], newMyPertanyaan = [], newPermintaanForMe = []
    let newData = {
      user_id: this.props.user_id,
      adminContactCategori: this.props.adminContactCategori
    }

    await this.props.fetchDataMyTask(newData)
    await this.props.fetchDataMyContactUs()

    //for dashboard tugas
    newTaskButuhTindakan = this.props.myTaskButuhTindakan
    await newTaskButuhTindakan.forEach(element => {
      element.butuhTindakan = true
      element.navigation = this.props.navigation
    });

    newPermintaanForMe = this.props.requestForMe
    await newPermintaanForMe.forEach(element => {
      element.permintaanForMe = true
      element.navigation = this.props.navigation
    });

    newPertanyaanForMe = this.props.questionForMe
    await newPertanyaanForMe.forEach(element => {
      element.pertanyaanForMe = true
      element.navigation = this.props.navigation
    });
    //================================

    //for dashboard daftar saya
    newMyPermintaan = this.props.myPermintaan
    await newMyPermintaan.forEach(element => {
      element.permintaan = true
      element.navigation = this.props.navigation
    })

    newMyPertanyaan = this.props.myPertanyaan
    await newMyPertanyaan.forEach(element => {
      element.pertanyaan = true
      element.navigation = this.props.navigation
    })
    //================================

    // this.props.isEvaluator && this.props.adminContactCategori
    //   ? this.setState({
    //     dataPermintaan: [
    //       { title: "Butuh tindakan", data: newTaskButuhTindakan },
    //       { title: "Daftar permintaan baru", data: newPermintaanForMe },
    //       { title: "Daftar pertanyaan baru", data: newPertanyaanForMe }
    //     ],
    //     dataPertanyaan: [
    //       { title: "Daftar pertanyaan", data: newMyPertanyaan },
    //       { title: "Daftar permintaan", data: newMyPermintaan }
    //     ]
    //   })
    // : this.props.adminContactCategori
    this.props.adminContactCategori
      ? this.setState({
        dataPermintaan: [
          { title: "Daftar permintaan baru", data: newPermintaanForMe },
          { title: "Daftar pertanyaan baru", data: newPertanyaanForMe }
        ],
        dataPertanyaan: [
          { title: "Daftar pertanyaan", data: newMyPertanyaan },
          { title: "Daftar permintaan", data: newMyPermintaan }
        ]
      })
      : this.props.isEvaluator
        ? this.setState({
          dataPermintaan: [
            { title: "Butuh tindakan", data: newTaskButuhTindakan },
          ],
          dataPertanyaan: [
            { title: "Daftar pertanyaan", data: newMyPertanyaan },
            { title: "Daftar permintaan", data: newMyPermintaan }
          ]
        })
        : this.setState({
          dataPertanyaan: [
            { title: "Daftar pertanyaan", data: newMyPertanyaan },
            { title: "Daftar permintaan", data: newMyPermintaan }
          ]
        })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.myTaskButuhTindakan.length != this.props.myTaskButuhTindakan.length) {
      if (prevProps.myTaskButuhTindakan.length != 0) {
        this.fetchData()
      }
    }
  }

  navigateHubungiKamiPertanyaan = () => {
    this.props.navigation.navigate('Pertanyaan')
  }

  navigateHubungiKamiPermintaan = () => {
    if (this.props.isEvaluator && !this.state.isAdmin ) { // HARUS DI NOTICE LAGI
      this.props.navigation.navigate('Permintaan', { keterangan: 'request', notif: this.props.myTaskButuhTindakan.length })
    } else {
      this.props.navigation.navigate('Permintaan', { keterangan: 'request', notif: this.props.requestForMe.length })
    }
  }

  _renderHeaderPertanyaan(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        marginBottom: 5
      }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 14 }}>
            {" "}{item.title}
          </Text>
          {
            item.data.length != 0 && <Badge style={{ height: 'auto', marginLeft: 10, backgroundColor: defaultColor }}>
              <Text style={{ color: 'white' }}>{item.data.length}</Text>
            </Badge>
          }
        </View>
        {expanded
          ? <View><SimpleLineIcons style={{ fontSize: 18 }} name="arrow-up" /></View>
          : <SimpleLineIcons style={{ fontSize: 18 }} name="arrow-down" />}
      </View>
    );
  }

  _renderHeaderPermintaan(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        marginBottom: 5
      }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 14 }}>
            {" "}{item.title}
          </Text>
          {
            item.data.length != 0 && <Badge style={{ height: 'auto', marginLeft: 10, backgroundColor: defaultColor }}>
              <Text style={{ color: 'white' }}>{item.data.length}</Text>
            </Badge>
          }
        </View>
        {expanded
          ? <View><SimpleLineIcons style={{ fontSize: 18 }} name="arrow-up" /></View>
          : <SimpleLineIcons style={{ fontSize: 18 }} name="arrow-down" />}
      </View>
    );
  }

  _renderContentPertanyaan(item) {
    return (
      <View style={{ margin: 15, marginTop: 5 }}>
        {
          item.data.map((el, index) => <CardContent key={index} data={el} />)
        }
      </View>
    );
  }

  _renderContentPermintaan(item) {
    return (
      <View style={{ margin: 15, marginTop: 5 }}>
        {
          item.data.map((el, index) => <CardContent key={index} data={el} tugas={true} />)
        }
      </View>
    );
  }

  navigate = arg => {
    this.setState({
      status: arg,
      expanded: false
    })
  }

  render() {
    return (
      // <View style={{ height: height, backgroundColor: defaultBackgroundColor }}>
      <View style={{ height: '100%', backgroundColor: defaultBackgroundColor }}>

        {/* HEADER - menu button drawer, title */}
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <FontAwesome name="send-o" style={{ color: 'white' }} size={28} />
            <Text style={styles.textTitleHeader}>HUBUNGI KAMI</Text>
          </View>
        </Header>


        <View style={{ backgroundColor: defaultColor, height: 150, flexDirection: 'row', alignItems: 'center' }}>
          {/* Pertanyaan */}
          <TouchableHighlight
            onPress={this.navigateHubungiKamiPertanyaan}
            style={styles.buttonDaftarPermintaan}
            underlayColor="transparent"
            style={{ width: '50%', backgroundColor: defaultColor, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <SimpleLineIcons name="bubbles" style={{ color: 'white' }} size={80} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.textTitleInactive}> Pertanyaan </Text>
                {
                  (this.state.isAdmin || this.props.isEvaluator) && this.props.questionForMe.length !== 0 && <Badge style={{ height: 'auto', marginLeft: 10, backgroundColor: 'white' }}>
                    <Text style={{ color: defaultColor }}>{this.props.questionForMe.length}</Text>
                  </Badge>
                }
              </View>

            </View>
          </TouchableHighlight>

          <View style={{ borderLeftWidth: 1, height: 100, borderLeftColor: 'white' }} />
          {/* Permintaan */}
          <TouchableHighlight
            onPress={this.navigateHubungiKamiPermintaan}
            style={styles.buttonDaftarPermintaan}
            underlayColor="transparent"
            style={{ width: '50%', backgroundColor: defaultColor, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ height: 80 }}>
                <FontAwesome5 name="hand-holding" style={{ color: 'white' }} size={60} />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.textTitleInactive}> Permintaan </Text>
                {/* { // Admin + Evaluator
                  this.state.isAdmin && this.props.isEvaluator && (this.props.requestForMe.length !== 0 || this.props.myTaskButuhTindakan.length !== 0) && <Badge style={{ height: 'auto', marginLeft: 10, backgroundColor: 'white' }}>
                    <Text style={{ color: defaultColor }}>{this.props.requestForMe.length + this.props.myTaskButuhTindakan.length}</Text>
                  </Badge>
                } */}
                { // Admin
                  ((this.state.isAdmin && this.props.isEvaluator) || (this.state.isAdmin && !this.props.isEvaluator)) && this.props.requestForMe.length !== 0 && <Badge style={{ height: 'auto', marginLeft: 10, backgroundColor: 'white' }}>
                    <Text style={{ color: defaultColor }}>{this.props.requestForMe.length}</Text>
                  </Badge>
                }
                { // Evaluator  
                  !this.state.isAdmin && this.props.isEvaluator && this.props.myTaskButuhTindakan.length !== 0 && <Badge style={{ height: 'auto', marginLeft: 10, backgroundColor: 'white' }}>
                    <Text style={{ color: defaultColor }}>{this.props.myTaskButuhTindakan.length}</Text>
                  </Badge>
                }
              </View>
            </View>
          </TouchableHighlight>
        </View>

        <View style={{ backgroundColor: defaultBackgroundColor, flexDirection: 'row', alignItems: 'center', height: 60 }}>
          <TouchableHighlight onPress={() => this.navigate('Daftar')} style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }} underlayColor="transparent">
            {
              this.state.status === 'Daftar'
                ? <Text style={{ color: defaultColor, fontWeight: 'bold', fontSize: 23 }}> Daftar saya </Text>
                : <Text style={{ color: defaultColor, fontWeight: 'bold', fontSize: 17 }}> daftar saya </Text>
            }
          </TouchableHighlight>
          {
            (this.state.isAdmin || this.props.isEvaluator) && <>
              <View style={{ borderLeftWidth: 1, height: 30, borderLeftColor: defaultColor }} />
              <TouchableHighlight onPress={() => this.navigate('Tugas')} style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }} underlayColor="transparent">
                {
                  this.state.status === 'Daftar'
                    ? <Text style={{ color: defaultColor, fontWeight: 'bold', fontSize: 17 }}> tugas saya </Text>
                    : <Text style={{ color: defaultColor, fontWeight: 'bold', fontSize: 23 }}> Tugas saya </Text>
                }
              </TouchableHighlight>
            </>
          }
        </View>

        {/* CONTENT */}

        {
          this.state.status === 'Daftar'
            ? <ScrollView style={styles.container} >
              {
                this.props.loading
                  ? <Loading />
                  : <Accordion
                    dataArray={this.state.dataPertanyaan}
                    expanded={this.state.expanded}
                    renderHeader={this._renderHeaderPertanyaan}
                    renderContent={this._renderContentPertanyaan}
                  />
              }

            </ScrollView>
            : <ScrollView style={styles.container} >
              {
                this.props.loading
                  ? <Loading />
                  : <Accordion
                    dataArray={this.state.dataPermintaan}
                    expanded={this.state.expanded}
                    renderHeader={this._renderHeaderPermintaan}
                    renderContent={this._renderContentPermintaan}
                  />
              }
            </ScrollView>
        }
      </View>
    )
  }
}

dashboardPertanyaan.navigationOptions = {
  header: null
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
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
  containerItem: {
    width: 95 / 100 * width,
    height: 1 / 3 * width,
    backgroundColor: defaultColor,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5
  },
  textTitleInactive: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  },
  buttonDaftarPermintaan: {
    padding: 10,
    marginRight: 10,
    height: 50,
    justifyContent: 'center'
  }
})

const mapDispatchToProps = {
  fetchDataMyTask,
  fetchDataMyContactUs
}

const mapStateToProps = ({ loading, user_id, myTaskButuhTindakan, myTaskPengajuan, MyTaskDisetujui, MyTaskDitolak, adminContactCategori, questionForMe, requestForMe, myPengajuanIjin, myPermintaan, myPertanyaan, isEvaluator }) => {
  return {
    loading,
    user_id,
    myTaskButuhTindakan,
    myTaskPengajuan,
    MyTaskDisetujui,
    MyTaskDitolak,
    adminContactCategori,
    questionForMe,
    requestForMe,
    myPengajuanIjin,
    myPermintaan,
    myPertanyaan,
    isEvaluator,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dashboardPertanyaan)