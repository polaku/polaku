import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, SafeAreaView, FlatList, Image } from 'react-native';
import { Header, Icon, Accordion, Badge } from "native-base";
import { defaultColor, defaultBackgroundColor, defaultTextColor } from '../../defaultColor';
import MenuButton from '../../components/menuButton';
import CardContent from '../../components/cardContent';

import { fetchDataMyContactUs } from '../../store/action';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

class menuPermintaanHRD extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { id: 1, image: 'asset:/ijin.png', title: 'Ijin Absen' },
        { id: 2, image: 'asset:/cuti.png', title: 'Cuti' },
        { id: 3, image: 'asset:/imp.png', title: 'IMP' }],
      dataPertanyaan: []
    }
  }

  navigateDaftarHubungiKami = () => {
    this.props.navigation.navigate('Daftar Hubungi Kami', { status: 'Pertanyaan' })
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    let newMyPengajuanIjin = []

    await this.props.fetchDataMyContactUs()

    newMyPengajuanIjin = this.props.myPengajuanIjin
    await newMyPengajuanIjin.forEach(element => {
      element.pengajuanIjin = true
      element.navigation = this.props.navigation
    })

    this.setState({
      dataPertanyaan: [
        { title: "Daftar pengajuan ijin", data: newMyPengajuanIjin }
      ]
    })
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

  _renderContentPertanyaan(item) {
    return (
      <View style={{ margin: 15, marginTop: 5 }}>
        {
          item.data.map((el, index) => <CardContent key={index} data={el} />)
        }
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: defaultBackgroundColor, height: '100%' }}>
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <Icon name='browsers' style={{ color: defaultColor }} size={32} />
            <Text style={styles.textTitleHeader}>HR</Text>
          </View>
        </Header>
        <View style={{ maxHeight: 150 }}>
          <Accordion
            dataArray={this.state.dataPertanyaan}
            expanded={this.state.expanded}
            renderHeader={this._renderHeaderPertanyaan}
            renderContent={this._renderContentPertanyaan}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: 15 }}>
          <Text style={{
            fontSize: 18,
            color: defaultColor
          }}> Sisa cuti </Text>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: defaultColor
          }}>{this.props.sisaCuti} hari</Text>
        </View>
        <FlatList
          keyExtractor={(item) => item.id}
          style={styles.flatList}
          numColumns={2}
          data={this.state.data}
          renderItem={({ item }) => <TouchableHighlight onPress={() => this.props.navigation.navigate('FormRequestHRD', {
            data: item.title,
            fetchData: () => this.fetchData()
          })} underlayColor="transparent">
            <View style={styles.containerItem}>
              <Image source={{ uri: item.image }} style={{ height: 80, width: 80 }} />
              <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{item.title}</Text>
            </View>
          </TouchableHighlight>}
        />
      </SafeAreaView>
    )
  }
}

menuPermintaanHRD.navigationOptions = {
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
    marginLeft: 5,
    fontSize: 20
  },
  container: {
    backgroundColor: defaultBackgroundColor,
    height: '100%',
    marginBottom: 60
  },
  flatList: {
    paddingTop: 10,
    backgroundColor: defaultBackgroundColor,
    height: '100%'
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
  textTitle: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 17,
    fontWeight: 'bold',
    color: defaultColor
  },
  buttonDaftarPermintaan: {
    padding: 10,
    marginRight: 10,
    height: 50,
    justifyContent: 'center'
  },
  textTitleInactive: {
    fontSize: 15,
    fontWeight: 'bold',
    color: defaultColor
  },
})


const mapDispatchToProps = {
  fetchDataMyContactUs
}

const mapStateToProps = ({ sisaCuti, myPengajuanIjin }) => {
  return {
    sisaCuti,
    myPengajuanIjin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(menuPermintaanHRD)