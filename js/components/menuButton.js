import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { defaultTextColor } from '../defaultColor';
import { DrawerActions } from 'react-navigation';

export default class menuButton extends Component {
  drawerToggle = () =>{
    this.props.navigation.dispatch(DrawerActions.toggleDrawer())
  }

  render() {
    return (
      <Icon name='menu' style={styles.menuIcon} onPress={this.drawerToggle} size={32} />
    )
  }
}

const styles = StyleSheet.create({
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 14,
    left: 20,
    color: defaultTextColor
  }
})
