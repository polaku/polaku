import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

export default class cardAcara extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('DetailAcara')}>
        <View>
          <View style={{ flexDirection: 'row' }}>

            <View style={styles.placeDateMonth}>
              <Text style={styles.date}>30</Text>
              <Text style={styles.month}>Jul</Text>
            </View>

            <View style={{ marginLeft: 10 }}>
              <Text style={styles.titleAcara}>1 baris saja kalau Panjang</Text>
              <Text>Alamat 1 baris juga</Text>
              <Text>Jumat 10:00 - 12:00</Text>
              <Text>Nama Creator</Text>
            </View>

          </View>

          <View style={styles.bottom}>
            <Text> 8 Mengikuti </Text>
            <TouchableHighlight style={styles.button}>
              <Text style={styles.textButton}> Ikuti </Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  placeDateMonth: {
    backgroundColor: '#7F7F7F',
    width: 80,
    height: 100,
    alignItems: 'center',
    borderRadius: 20
  },
  date: {
    color: 'white',
    fontSize: 40
  },
  month: {
    color: 'white',
    fontSize: 20
  },
  titleAcara: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    width: 100,
    backgroundColor: '#A2A2A2',
    padding: 8,
    justifyContent: 'center',
    borderRadius: 30
  },
  textButton: {
    color: 'white',
    textAlign: 'center'
  }
})
