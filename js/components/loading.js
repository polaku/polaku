import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'

export default class loading extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Image source={require('../../assest/loading.gif')} style={{ height: 80, width: 80 }} />
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '80%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})