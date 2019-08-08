import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from 'native-base';

export default class menuButton extends Component {
  render() {
    return (
      <Icon name='menu' style={styles.menuIcon} onPress={() => this.props.navigation.toggleDrawer()} size={32} />
    )
  }
}

const styles = StyleSheet.create({
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 15,
    left: 20,
    color: '#DBA89F'
  }
})
