import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight, Image, Dimensions } from 'react-native'

export default class cardAcara extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('DetailRuangan')} style={{ width: 1 / 3 * width - 3, height: 1 / 3 * width + 30, padding: 5 }}>
        <View style={{}}>
          <Image source={require('../../assest/diskusi.png')} style={{
            height: 1 / 3 * width,
            width: '100%',
            alignItems: 'center',
          }} />
          <Text> {this.props.data.title} </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
    padding: 5,
    height: '100%',
    marginBottom: 60
  },
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 15,
    left: 20
  },
  textColor: {
    color: '#DBA89F'
  },
  sorting: {
    zIndex: 9,
    position: 'absolute',
    top: 15,
    right: 20,
    color: '#DBA89F'
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F1F1F1',
  },
  teksPengumuman: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 5
  },
  tab: {
    backgroundColor: '#F1F1F1'
  }
})
