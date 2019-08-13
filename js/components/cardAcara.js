import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

export default class cardAcara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      date: '',
      month: '',

    }
  }

  componentDidMount() {
    let startDate, endDate
    console.log('>>>>>>>>>>>>', this.props.data);

    // startDate = el.start_date.split('-')
    // endDate = el.end_date.split('-')


  }

  render() {
    function getDate(args) {
      let startDate = args.split('-')
      return startDate[2]
    }

    function getMonth(args) {
      let startDate = args.split('-')
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      let month = months[new Date(startDate[1]).getMonth()]
      return `${month}`
    }

    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('DetailAcara')}>
        <View>
          <View style={{ flexDirection: 'row' }}>

            <View style={styles.placeDateMonth}>
              <Text style={styles.date}>{getDate(this.props.data.start_date)}</Text>
              <Text style={styles.month}>{getMonth(this.props.data.start_date)}</Text>
            </View>

            <View style={{ marginLeft: 10 }}>
              <Text style={styles.titleAcara}>{this.props.data.event_name}</Text>
              <Text>{this.props.data.location}</Text>
              <Text>Jumat 10:00 - 12:00</Text>
              <Text>{this.props.data.tbl_user.username}</Text>
            </View>

          </View>

          <View style={styles.bottom}>
            <Text> 8 Mengikuti </Text>
            <TouchableHighlight style={styles.button}>
              <Text style={styles.textButton}> Ikuti </Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  placeDateMonth: {
    backgroundColor: '#7F7F7F',
    width: 80,
    height: 100,
    alignItems: 'center',
    borderRadius: 20
  },
  date: {
    color: 'white',
    fontSize: 40
  },
  month: {
    color: 'white',
    fontSize: 20
  },
  titleAcara: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    width: 100,
    backgroundColor: '#A2A2A2',
    padding: 8,
    justifyContent: 'center',
    borderRadius: 30
  },
  textButton: {
    color: 'white',
    textAlign: 'center'
  }
})
