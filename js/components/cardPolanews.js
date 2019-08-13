import React, { Component } from 'react';
import { Text, View, Image, Dimensions, StyleSheet } from 'react-native';

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
        <Image source={require('../../assest/placeholder.jpg')} style={styles.image} />
        {/* <Image source={require("'" + this.props.data.image + "'")} style={{ width: '100%', height: 190, }} /> */}
        <Text> {this.props.data.title} </Text>
      </View>
    )
  }
}

const { width } = Dimensions.get('window');

const defaultBackgroundColor = '#F1F1F1'

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    width: 1 / 3 * width,
    height: 'auto',
    padding: 5,
  },
  image : {
    width: '100%',
    height: 190,
  }
})