import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

export default class cardComment extends Component {
  render() {
    return (
      <View style={styles.userComments}>
        <Image source={require('../../assest/icon_user.png')} style={styles.iconUserComment} />
        <View style={styles.headerRight}>
          <View style={{ width: '100%', paddingRight: 15 }}>
            <Text style={styles.userPost}>nama user</Text>
            <Text style={styles.datePost}>August 5, 2019</Text>
            <Text >Ini comment dan tidak lebih dari 100 kata. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </View>
          <Icon name='close' style={styles.close} size={32} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  userComments: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'flex-start'
  },
  close: {
    color: '#B4B4B4',
    marginTop: 5
  },
  iconUserComment: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 30
  },
  userPost: {
    fontWeight: 'bold',
    fontSize: 17
  },
  datePost: {
    fontSize: 12,
    color: '#C1C1C1'
  },
})