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
      proses: false
    }
  }

  componentDidMount() {
    let temp = []
    this.props.data.tbl_users.forEach(element => {
      if (element.tbl_event_responses.response === 'join') {
        temp.push(element)
      }
      if (Number(element.user_id) === Number(this.props.user_id) && element.tbl_event_responses.response === 'join') {
        this.setState({
          statusJoinUser: 'Join'
        })
      }
      if (Number(element.user_id) === Number(this.props.user_id)) {
        // console.log('responnya>>>>>>>>>>>>',element.tbl_event_responses.response);
      }
    });
    this.setState({
      joinEvent: temp
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data) {
      if (this.props.data.tbl_users != prevProps.data.tbl_users) {
        let temp = []
        this.props.data.tbl_users.forEach(element => {
          // console.log(element.tbl_event_responses.response)

          if (element.tbl_event_responses.response === 'join') {
            temp.push(element)
          }
          if (Number(element.user_id) === Number(this.props.user_id)) {
            // console.log('responnya>>>>>>>>>>>>',element.tbl_event_responses.response);
          }
          if (Number(element.user_id) === Number(this.props.user_id) && element.tbl_event_responses.response === 'join') {

            this.setState({
              statusJoinUser: 'Join'
            })
          } else if (Number(element.user_id) === Number(this.props.user_id) && element.tbl_event_responses.response === 'cancel join') {

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
    console.log('statusJoinUser ', this.state.statusJoinUser);
    console.log('args ', args);
    console.log("data lama ", this.props.data);
    console.log('this.props.data.event_id', this.props.data.event_id)
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
        console.log("atas", newPerson);

        newPerson.push('newPerson')

        this.setState({
          statusJoinUser: args,
          joinEvent: newPerson
        })
      } else {
        let newPerson = this.state.joinEvent
        newPerson.shift()
        console.log("bawah", newPerson);

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
      alert(err)
      this.setState({
        proses: false
      })
    }
  }


  render() {

    function getMonth(args) {
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      let month = months[new Date(args).getMonth()]
      return `${month}`
    }

    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate('DetailAcara', {
        detailAcara: this.props.data, statusJoin: this.state.statusJoinUser
      })} style={styles.container} underlayColor="transparent">
        <View>
          <View style={{ flexDirection: 'row' }}>

            <View style={styles.placeDateMonth}>
              <Text style={styles.date}>{new Date(this.props.data.start_date).getDate()}</Text>
              <Text style={styles.month}>{getMonth(this.props.data.start_date)}</Text>
            </View>

            <View style={{ marginLeft: 10 }}>
              <Text style={styles.titleAcara}>{this.props.data.event_name}</Text>
              <Text>{this.props.data.location}</Text>
              <Text>{new Date(this.props.data.start_date).getDate()} - {new Date(this.props.data.end_date).getDate()} {getMonth(this.props.data.start_date)}</Text>
              <Text>{this.props.data.tbl_users[0].tbl_account_detail.fullname}</Text>
            </View>
          </View>

          <View style={styles.bottom}>
            <Text> {this.state.joinEvent.length} Mengikuti </Text>
            {
              this.state.statusJoinUser != 'Join'
                ? <TouchableHighlight style={styles.button} onPress={() => this.joinEvent("Join")} underlayColor="transparent">
                  {
                    this.state.proses
                      ? <ActivityIndicator size="small" color="#fff" />
                      : <Text style={styles.textButton}> Ikuti </Text>
                  }
                </TouchableHighlight>
                : <TouchableHighlight style={styles.button} onPress={() => this.joinEvent("Cancel Join")} underlayColor="transparent">
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
      </TouchableHighlight>
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

const mapStateToProps = ({ user_id }) => {
  return {
    user_id
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(cardAcara)