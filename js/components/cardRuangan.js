import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image, Dimensions } from 'react-native';

export default class cardAcara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataImage: [],
      myRoom: ''
    }
  }

  componentDidMount() {
    if (this.props.myRoom) {
      this.setState({ myRoom: 'yes' })
    }
  }

  navigateDetailRuangan = () => {
    this.props.navigation.navigate('DetailRuangan', {
      room_id: this.props.data.room_id, room: this.props.data.room, myRoom: this.state.myRoom
    })
  }

  render() {
    return (
      <TouchableHighlight onPress={this.navigateDetailRuangan} style={styles.container} underlayColor="transparent">
        <View>
          <Image source={{ uri: this.props.data.thumbnail }} style={styles.image} />
          <Text>{this.props.data.room} </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: 1 / 3 * width - 3,
    height: 'auto',
    padding: 5,
  },
  image: {
    height: 1 / 3 * width,
    width: '100%',
    alignItems: 'center',
  }
})
