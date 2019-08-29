import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { defaultTextColor } from '../defaultColor';
import { DrawerActions } from 'react-navigation';

export default class menuButton extends Component {
  render() {
    return (
      <Icon name='menu' style={styles.menuIcon} onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())} size={32} />
    )
  }
}

const styles = StyleSheet.create({
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 15,
    left: 20,
    color: defaultTextColor
  }
})
