import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../defaultColor';

export default class cardAcara extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>

        <Image source={require('../../assest/icon_user.png')} style={styles.iconUserComment} />

        <View style={{ width: '70%', justifyContent: 'center' }}>
          <Text style={{ fontSize: 15 }}>{this.props.data.tbl_user.username}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>10:00 - 12:00</Text>
            <TouchableHighlight style={{ backgroundColor: defaultColor, padding: 8, justifyContent: 'center', borderRadius: 30 }}>
              <Text style={{ color: defaultTextColor, textAlign: 'center' }}> batal pesanan </Text>
            </TouchableHighlight>
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconUserComment: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 30
  },
})
