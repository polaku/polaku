import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { defaultColor, defaultBackgroundColor } from '../../defaultColor';

export default class acara extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={{ margin: 10 }}>
          <Text style={styles.title}> IT </Text>
        </View>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.textButton}>pertanyaan</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.textButton}>permintaan khusus</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.textButton}>hubungii divisi lain</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    height: '100%',
    marginBottom: 60,
    padding: 10
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: defaultColor
  },
  button: {
    height: 100,
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 15
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})

