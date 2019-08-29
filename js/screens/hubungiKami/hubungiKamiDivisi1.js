import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, SafeAreaView, FlatList, Image } from 'react-native';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';

export default class HubungiKamiDivisi1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { id: 1, image: require('../../../assest/it.png'), title: 'IT' },
        { id: 2, image: require('../../../assest/hrd.png'), title: 'HRD' },
        { id: 3, image: require('../../../assest/design.png'), title: 'DESAIN' },
        { id: 4, image: require('../../../assest/other.png'), title: 'LAINNYA' }]
    }
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: defaultBackgroundColor, height: '100%' }}>
        <Text style={{ marginTop: 15, marginLeft: 15, fontSize: 17, fontWeight:'bold', color: defaultColor }}>Ada yang ingin ditanyakan?</Text>
        <FlatList
          keyExtractor={(item) => item.id}
          style={styles.flatList}
          numColumns={2}
          data={this.state.data}
          renderItem={({ item }) => <TouchableHighlight onPress={() => this.props.navigation.navigate('hubungiKamiFormQuestion', {
            data: item.title,
            keterangan : 'contact_us'
          })} underlayColor="transparent">
            <View style={styles.containerItem}>
              <Image source={item.image} style={{ height: 80, width: 80 }} />
              <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{item.title}</Text>
            </View>
          </TouchableHighlight>}
        />
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
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 15,
    left: 20
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

