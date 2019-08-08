import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'

export default class cardAcara extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ display: 'flex', flexDirection: 'row', width: '80%', justifyContent: 'center', backgroundColor: 'white', borderRadius: 30, padding:10 }}>

        <View style={{ backgroundColor: '#7F7F7F', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
          <Text style={{ color: 'white', fontSize: 30 }}>30</Text>
          <Text style={{ color: 'white', fontSize: 20 }}>Jul</Text>
        </View>

        <View style={{ marginLeft: 20, width: '50%' }}>
          <Text style={{ fontSize: 15 }}>nama user</Text>
          <Text style={{ fontSize: 20, fontWeight:'bold' }}>10:00 - 12:00</Text>
          <TouchableHighlight style={{ backgroundColor: '#A2A2A2', padding: 8, justifyContent: 'center', display: 'flex', borderRadius: 30 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}> batal pesanan </Text>
          </TouchableHighlight>
        </View>

      </View>
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
