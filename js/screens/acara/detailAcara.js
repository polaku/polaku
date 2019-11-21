import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Text, Icon, Input } from 'native-base';
import { defaultColor } from '../../defaultColor';
import { API } from '../../../config/API';
import { fetchDataEvent, fetchDataMyEvent } from '../../store/action';
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
// import CardComment from '../../components/cardComment';

class detailAcara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      statusJoinUser: 'Not Join',
      creator: {}
    }
  }

  componentDidMount() {
    this.setState({
      data: this.props.navigation.getParam('detailAcara'),
      statusJoinUser: this.props.navigation.getParam('statusJoin'),
      creator: this.props.navigation.getParam('creator')
    })
  }

  joinEvent = async (args) => {
    this.setState({
      proses: true
    })
    let token = await AsyncStorage.getItem('token')

    try {
      getData = await API.post(`/events/follow`,
        {
          event_id: this.state.data.event_id, response: args.toLowerCase(),
        },
        {
          headers: { token }
        })

      this.setState({
        statusJoinUser: args,
      })

      if (getData) {
        this.props.fetchDataEvent()
        this.props.fetchDataMyEvent()
        alert(`${args} Success`)
        this.setState({
          proses: false
        })
      }
    } catch (err) {
      this.setState({
        proses: false
      })
      if (err.message === 'Request failed with status code 403') {
        alert('Waktu login telah habis, silahkan login kembali')
        this.props.navigation.navigate('Login')
        AsyncStorage.clear()
      } else {
        alert(err)
      }
    }
  }

  join = () => {
    this.joinEvent("Join")
  }

  cancelJoin = () => {
    this.joinEvent("Cancel Join")
  }

  render() {
    function getDates(args) {
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let date = new Date(args).getDate()
      let month = months[new Date(args).getMonth()]
      let years = new Date(args).getFullYear()

      return `${month} ${date}, ${years}`
    }

    function getMonth(args) {
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      let month = months[new Date(args).getMonth()]
      return `${month}`
    }

    function getMonthDate(args) {
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let month = months[new Date(args).getMonth()]
      return `${new Date(args).getDate()} ${month}`
    }

    return (
      <ScrollView>
        <View style={styles.container} >

          {/* UP SECTION */}
          <View style={styles.header}>
            {
              this.state.creator.tbl_account_detail && <Image source={{ uri: this.state.creator.tbl_account_detail.avatar }} style={styles.iconUser} />
            }
            <View style={styles.headerRight}>
              <View>
                {
                  this.state.creator.tbl_account_detail &&
                  <Text style={styles.userComment}>{this.state.creator.tbl_account_detail.fullname}</Text>
                }
                <Text style={styles.dateComment}>{getDates(this.state.data.created_at)}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.title}>{this.state.data.event_name}</Text>
          <View style={styles.imagePlace}>
            <Image source={{ uri: "asset:/index.jpeg" }} style={styles.image} />
          </View>
          <View style={styles.dateMonthButtonPlace}>
            <View style={styles.dateMonthPlace}>
              {
                this.state.data.start_date &&
                <Text style={styles.month}>{getMonth(this.state.data.start_date)}</Text>
              }
              {
                this.state.data.start_date &&
                <Text style={styles.date}>{new Date(this.state.data.start_date).getDate()}</Text>
              }
            </View>
            <View style={{ width: '79%' }}>
              {
                this.state.statusJoinUser != 'Join'
                  ? <TouchableHighlight style={styles.buttonIkut} onPress={this.join} underlayColor="transparent">
                    {
                      this.state.proses
                        ? <ActivityIndicator size="small" color="#fff" />
                        : <Text style={styles.textButtonIkut}>IKUT</Text>
                    }
                  </TouchableHighlight>
                  : <TouchableHighlight style={styles.buttonIkut} onPress={this.cancelJoin} underlayColor="transparent">
                    {
                      this.state.proses
                        ? <ActivityIndicator size="small" color="#fff" />
                        : <Text style={styles.textButtonIkut}>BATAL IKUT</Text>
                    }
                  </TouchableHighlight>
              }
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <View style={styles.isiAcara}>
              <Icon name='time' size={32} style={{ marginRight: 15 }} />
              <View>
                {
                  this.state.data.start_date &&
                    (this.state.data.start_date != this.state.data.end_date)
                    ? <Text style={{ fontSize: 15 }}>{getMonthDate(this.state.data.start_date)} - {getMonthDate(this.state.data.end_date)}</Text>
                    : <Text style={{ fontSize: 15 }}>{getMonthDate(this.state.data.end_date)}</Text>

                }
              </View>
            </View>
            <View style={styles.isiAcara}>
              <Icon name='map' size={32} style={{ marginRight: 15 }} />
              <Text>{this.state.data.location}</Text>
            </View>
            <View style={styles.isiAcara}>
              <Icon name='list-box' size={32} style={{ marginRight: 15 }} />
              <Text>{this.state.data.description}</Text>
            </View>
          </View>

          {/* <View style={styles.line}></View> */}

          {/* BOTTOM SECTION */}
          {/* <View>
            <Text style={styles.keteranganKomen}>3 Komentar</Text>
            <View style={styles.userComments}>
              <Image source={{ uri: this.props.data.tbl_user.tbl_account_detail.avatar }} style={styles.iconUserComment} />
              <View style={styles.headerRight}>
                <View style={styles.spaceInputKomen}>
                  <Input placeholder='Tambah komentar ...' style={styles.columnComment} />
                </View>
                <Icon name='send' style={{ color: defaultColor }} size={32} />
              </View>
            </View>
            <CardComment />
            <CardComment />
          </View> */}

        </View>
      </ScrollView >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
  },
  userComments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
    marginBottom: 17
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center'
  },
  iconUserComment: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 30
  },
  iconUser: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 30
  },
  userComment: {
    fontWeight: 'bold'
  },
  dateComment: {
    fontSize: 12,
    color: '#C1C1C1'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  line: {
    borderWidth: 1,
    width: '100%',
    borderColor: 'gray',
    marginTop: 10,
    marginBottom: 10
  },
  isiAcara: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center'
  },
  columnComment: {
    borderWidth: 0.7,
    borderColor: 'gray'
  },
  imagePlace: {
    marginTop: 10,
    marginBottom: 10
  },
  image: {
    resizeMode: 'cover',
    height: 200,
    width: '100%',
    alignItems: 'center',
  },
  dateMonthButtonPlace: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    marginBottom: 10
  },
  dateMonthPlace: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  month: {
    color: defaultColor,
    fontWeight: 'bold',
    fontSize: 25
  },
  date: {
    fontWeight: 'bold',
    fontSize: 20
  },
  keteranganKomen: {
    fontSize: 17,
    color: defaultColor
  },
  spaceInputKomen: {
    width: '100%',
    paddingRight: 15
  },
  buttonIkut: {
    backgroundColor: defaultColor,
    width: '100%',
    height: 55,
    margin: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButtonIkut: {
    color: 'white',
    fontWeight: 'bold'
  }
})

const mapDispatchToProps = {
  fetchDataEvent,
  fetchDataMyEvent
}

export default connect(null, mapDispatchToProps)(detailAcara)