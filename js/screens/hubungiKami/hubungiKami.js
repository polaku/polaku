import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, SafeAreaView } from 'react-native';
import { Header } from 'native-base';
import MenuButton from '../../components/menuButton';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class hubungiKami extends Component {
  constructor(props) {
    super(props)
  }

  navigateHubungiKamiDivisi1 = () => {
    this.props.navigation.navigate('HubungiKamiDivisi1')
  }

  navigateHubungiKamiDivisi2 = () => {
   this.props.navigation.navigate('HubungiKamiDivisi2', { keterangan : 'request'})
  }

  navigateDaftarPermintaan = () => {
    this.props.navigation.navigate('DaftarPermintaan')
  }

  render() {
    return (
      <SafeAreaView>

        {/* HEADER - menu button drawer, title */}
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <FontAwesome name="send-o" style={{ color: 'white' }} size={28} />
            <Text style={styles.textTitleHeader}>HUBUNGI KAMI</Text>
          </View>
        </Header>

        {/* CONTENT */}
        <View style={styles.container} >

          {/* MENU HUBUNGI KAMI */}
          <TouchableHighlight onPress={this.navigateDaftarPermintaan} style={styles.buttonDaftarPermintaan} underlayColor="transparent">
            <Text style={styles.textTitleInactive}> daftar permintaan </Text>
          </TouchableHighlight>

          <View style={{ backgroundColor: 'white', height: '100%', padding: 10 }}>
            <Text style={{ fontSize: 18 }}>Ada yang bisa kami bantu?</Text>
            <TouchableHighlight onPress={this.navigateHubungiKamiDivisi1} style={{ marginTop: 20 }} underlayColor="transparent">
              <View style={styles.containerItem} underlayColor="transparent">
                <Text style={{ color: 'white', fontSize: 18 }}>Ada yang ingin ditanyakan?</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.navigateHubungiKamiDivisi2} style={{ marginTop: 20 }} underlayColor="transparent">
              <View style={styles.containerItem} underlayColor="transparent">
                <Text style={{ color: 'white', fontSize: 18 }}>Ingin membuat permintaan?</Text>
              </View>
            </TouchableHighlight>


          </View>
        </View>

      </SafeAreaView>
    )
  }
}

hubungiKami.navigationOptions = {
  header: null
};

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
    color: defaultColor
  },
  buttonDaftarPermintaan: {
    alignSelf: 'flex-end',
    padding: 10,
    marginRight: 10,
    height: 50,
    justifyContent: 'center'
  }
})

