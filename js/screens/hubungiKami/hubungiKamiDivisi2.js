import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, SafeAreaView, Image } from 'react-native';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';

export default class HubungiKamiDivisi1 extends Component {
  constructor(props) {
    super(props)
  }

  navigateHubungiKamiFormRequest = () => this.props.navigation.navigate('hubungiKamiFormRequest', { data: 'DESAIN' })

  navigateHubungiKamiFormQuestion = () => this.props.navigation.navigate('hubungiKamiFormQuestion', { data: 'LAINNYA', keterangan: 'request' })
  
  render() {
    return (
      <SafeAreaView style={{ backgroundColor: defaultBackgroundColor, height: '100%' }}>
        <Text style={{ marginTop: 15, marginLeft: 15, fontSize: 17, fontWeight: 'bold', color: defaultColor }}>Ingin membuat permintaan?</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableHighlight onPress={this.navigateHubungiKamiFormRequest} underlayColor="transparent">
            <View style={styles.containerItem}>
              <Image source={require('../../../assest/design.png')} style={{ height: 80, width: 80 }} />
              <Text style={{ marginTop: 10, fontWeight: 'bold' }}>DESAIN</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.navigateHubungiKamiFormQuestion} underlayColor="transparent">
            <View style={styles.containerItem}>
              <Image source={require('../../../assest/other.png')} style={{ height: 80, width: 80 }} />
              <Text style={{ marginTop: 10, fontWeight: 'bold' }}>LAINNYA</Text>
            </View>
          </TouchableHighlight>
        </View>
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
})

