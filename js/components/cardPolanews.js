import React, { Component } from 'react'
import { Text, View, Image, Dimensions, StyleSheet } from 'react-native'
// import test from '../../assest/placeholder.jpg'

export default class cardPolanews extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log(this.props.data.image)
    console.log("OKE")
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assest/placeholder.jpg')} style={{ width: '100%', height: 190, }} />
        {/* <Image source={require("'" + this.props.data.image + "'")} style={{ width: '100%', height: 190, }} /> */}
        <Text> {this.props.data.title} </Text>
      </View>
    )
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
    width: 1 / 3 * width,
    height: 230,
    padding: 5,
  }
})