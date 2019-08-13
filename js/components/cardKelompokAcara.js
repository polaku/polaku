import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import CardAcara from './cardAcara';

export default class cardAcara extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <CardAcara navigation={this.props.navigation} data={this.props.data} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15
  }
})
