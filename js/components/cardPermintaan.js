import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

export default class cardAcara extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight style={styles.container}>
        <View>
          <Text style={styles.divisi}>IT</Text>
          <Text style={styles.judulPermintaan}>JUDUL PERMINTAAN</Text>

          <View style={styles.keterangan}>
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
    margin: 10,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '80%'
  },
  divisi: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  judulPermintaan: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  keterangan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
