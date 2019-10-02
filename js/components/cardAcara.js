import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native';
import { API } from '../../config/API'
import { connect } from 'react-redux'
import { fetchDataEvent, fetchDataMyEvent } from '../store/action';
import AsyncStorage from '@react-native-community/async-storage';

class cardAcara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      month: '',
      joinEvent: [],
      statusJoinUser: 'Not Join',
      proses: false,
      creator: {}
    }
  }

  async componentDidMount() {
    let user_id = await AsyncStorage.getItem('user_id')
    let temp = []
    this.props.data.tbl_users.forEach(element => {
      if (element.tbl_event_responses.response === 'join') {
        temp.push(element)
      }
      if (Number(element.user_id) === Number(user_id) && element.tbl_event_responses.response === 'join') {
        this.setState({
          statusJoinUser: 'Join'
        })
      }
      if (element.tbl_event_responses.creator == '1') {
        this.setState({
          creator: element
        })

      }
    });
    this.setState({
      joinEvent: temp
    })
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.data) {
      if (this.props.data.tbl_users != prevProps.data.tbl_users) {

        let user_id = await AsyncStorage.getItem('user_id')
        let temp = []
        this.props.data.tbl_users.forEach(element => {

          if (element.tbl_event_responses.response === 'join') {
            temp.push(element)
          }
          if (Number(element.user_id) === Number(user_id) && element.tbl_event_responses.response === 'join') {

            this.setState({
              statusJoinUser: 'Join'
            })
          } else if (Number(element.user_id) === Number(user_id) && element.tbl_event_responses.response === 'cancel join') {

            this.setState({
              statusJoinUser: 'Cancel Join'
            })
          }

        });
        this.setState({
          joinEvent: temp
        })


      }
    }
  }

  joinEvent = async (args) => {
    this.setState({
      proses: true
    })
    let token = await AsyncStorage.getItem('token')
    try {
      getData = await API.post(`/events/follow`,
        {
          event_id: this.props.data.event_id, response: args.toLowerCase(),
        },
        {
          headers: { token }
        })

      if (args === "Join") {
        let newPerson = this.state.joinEvent
        newPerson.push('newPerson')

        this.setState({
          statusJoinUser: args,
          joinEvent: newPerson
        })
      } else {
        let newPerson = this.state.joinEvent
        newPerson.shift()
        this.setState({
          statusJoinUser: args,
          joinEvent: newPerson
        })
      }
      if (getData) {
        this.props.fetchDataEvent()
        this.props.fetchDataMyEvent()

        alert(`${args} Success`)
        this.setState({
          proses: false
        })
      }
    } catch (err) {
      if (err.message === 'Request failed with status code 403') {
        alert('Waktu login telah habis, silahkan login kembali')
        this.props.navigation.navigate('Login')
        AsyncStorage.clear()
      } else {
        alert(err)
      }
      this.setState({
        proses: false
      })
    }
  }

  join = () => {
    this.joinEvent("Join")
  }

  cancelJoin = () => {
    this.joinEvent("Cancel Join")
  }

  navigateDetail = () => {
    this.props.navigation.navigate('DetailAcara', {
      detailAcara: this.props.data, statusJoin: this.state.statusJoinUser, creator: this.state.creator
    })
  }

  render() {

    function getMonth(args) {
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      let month = months[new Date(args).getMonth()]
      return `${month}`
    }

    return (
      <TouchableHighlight onPress={this.navigateDetail} style={styles.container} underlayColor="transparent">
        <View>
          <View style={{ flexDirection: 'row' }}>

            <View style={styles.placeDateMonth}>
              <Text style={styles.date}>{new Date(this.props.data.start_date).getDate()}</Text>
              <Text style={styles.month}>{getMonth(this.props.data.start_date)}</Text>
            </View>

            <View style={{ marginLeft: 10 }}>
              <Text style={styles.titleAcara}>{this.props.data.event_name}</Text>
              <Text>{this.props.data.location}</Text>
              {
                new Date(this.props.data.start_date).getDate() === new Date(this.props.data.end_date).getDate()
                  ? <Text>{new Date(this.props.data.start_date).getDate()} {getMonth(this.props.data.start_date)}</Text>
                  : <Text>{new Date(this.props.data.start_date).getDate()} - {new Date(this.props.data.end_date).getDate()} {getMonth(this.props.data.start_date)}</Text>
              }
              { this.state.creator.tbl_account_detail && <Text>{this.state.creator.tbl_account_detail.fullname}</Text> }
            </View>
          </View>

          <View style={styles.bottom}>
            <Text> {this.state.joinEvent.length} Mengikuti </Text>
            {
              this.state.statusJoinUser != 'Join'
                ? <TouchableHighlight style={styles.button} onPress={this.join} underlayColor="transparent">
                  {
                    this.state.proses
                      ? <ActivityIndicator size="small" color="#fff" />
                      : <Text style={styles.textButton}> Ikuti </Text>
                  }
                </TouchableHighlight>
                : <TouchableHighlight style={styles.button} onPress={this.cancelJoin} underlayColor="transparent">
                  {
                    this.state.proses
                      ? <ActivityIndicator size="small" color="#fff" />
                      :
                      <Text style={styles.textButton}> Batal Ikuti </Text>
                  }
                </TouchableHighlight>
            }
          </View>
        </View>
      </TouchableHighlight >
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
  },
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

const mapDispatchToProps = {
  fetchDataEvent,
  fetchDataMyEvent
}

export default connect(null, mapDispatchToProps)(cardAcara)