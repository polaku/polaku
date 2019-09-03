import React, { Component } from 'react';
import { Text, View, Image, Dimensions, StyleSheet, TouchableHighlight } from 'react-native';

export default class cardPolanews extends Component {
  constructor(props) {
    super(props);
  }

  navigateDetailPolanews = () => {
    this.props.navigation.navigate('DetailPolanews', { data: this.props.data })
  }

  render() {
    return (
      <TouchableHighlight onPress={this.navigateDetailPolanews} underlayColor="transparent">
        <View style={styles.container}>
          {
            this.props.data.thumbnail
              ? <Image source={{ uri: this.props.data.thumbnail }} style={styles.image} />
              : <Image source={require('../../assest/placeholder.jpeg')} style={styles.image} />
          }
          {/* <Image source={require("'" + this.props.data.image + "'")} style={{ width: '100%', height: 190, }} /> */}
          <Text> {this.props.data.title} </Text>
        </View>
      </TouchableHighlight>
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
  image: {
    width: '100%',
    height: 190,
  }
})