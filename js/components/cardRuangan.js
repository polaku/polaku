import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image, Dimensions } from 'react-native';
import { defaultColor } from '../defaultColor'

export default class cardAcara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataImage: [],
      myRoom: '',
      statusRuangan: 'tutup',
      isDisplay: false
    }
  }

  componentDidMount() {
    if (this.props.myRoom) {
      this.setState({ myRoom: 'yes' })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.statusRuangan != this.props.data.statusRuangan) {
      this.setState({
        isDisplay: true
      })
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
          {/* {
            this.state.isDisplay && <> */}
          <Image source={{ uri: this.props.data.thumbnail }} style={styles.image} />
          <Text>{this.props.data.room} </Text>
          {
            this.props.data.statusRuangan === 'tersedia sekarang'
              ? <View style={{ borderRadius: 10, backgroundColor: '#EEBBC3', paddingLeft: 5, paddingRight: 5, }}>
                <Text style={{ margin: 3, fontSize: 11, color: defaultColor, alignSelf: 'center' }}>{this.props.data.statusRuangan}</Text>
              </View>
              : <View style={{ borderRadius: 10, backgroundColor: defaultColor, paddingLeft: 5, paddingRight: 5, }}>
                <Text style={{ margin: 3, fontSize: 11, color: 'white', alignSelf: 'center' }}>{this.props.data.statusRuangan}</Text>
              </View>
          }
          {/* </>
          } */}
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
