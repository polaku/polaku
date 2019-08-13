import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image, Dimensions } from 'react-native';

export default class cardAcara extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('DetailRuangan', {
        room_id: this.props.data.room_id
      })} style={styles.container}>
        <View style={{}}>
          <Image source={require('../../assest/diskusi.png')} style={styles.image} />
          <Text> {this.props.data.room} </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: 1 / 3 * width - 3,
    height: 1 / 3 * width + 30,
    padding: 5
  },
  image: {
    height: 1 / 3 * width,
    width: '100%',
    alignItems: 'center',
  }
})
