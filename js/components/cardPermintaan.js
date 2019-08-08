import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'

export default class cardAcara extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight style={{ margin: 10, backgroundColor: 'white', padding: 20, borderRadius: 20, width: '80%' }}>
        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>IT</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>JUDUL PERMINTAAN</Text>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text> tgl submit </Text>
            <Text> 3 hari </Text>
          </View>
        </View>
      </TouchableHighlight >
    )
  }
}

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
