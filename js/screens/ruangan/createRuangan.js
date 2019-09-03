import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
import { Input, Header, Item, DatePicker, Label, Picker } from 'native-base';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MenuButton from '../../components/menuButton';
import { API } from '../../../config/API';
import AsyncStorage from '@react-native-community/async-storage';

export default class createRuangan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room_id: '',
      date_in: '',
      time_in: '',
      time_out: '',
      subject: '',
      count: '',
      isDateTimePickerVisible: false,
      startHour: '',
      startMinute: '',
      endHour: '',
      endMinute: '',
      listRoom: [],
      proses: false
    };
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem('token')
    API.get('/bookingRoom/listRoom', {
      headers: {
        token
      }
    })
      .then(({ data }) => {
        this.setState({
          listRoom: data.data
        })
      })
      .catch(err => {
        alert(err)
      })
  }

  setDateIn(newDate) {
    newDate = newDate.toString().substr(4, 12)
    let month = this.getMonth(newDate.substr(0, 3));

    this.setState({
      date_in: `${newDate.substr(7, 4)}-${month}-${newDate.substr(4, 2)}`
    });
  }

  getMonth(args) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months.indexOf(args) + 1
  }

  onValueChange(value) {
    this.setState({
      room_id: value
    });
  }

  createBookingRoom = async () => {
    this.setState({
      proses: true
    })

    let token = await AsyncStorage.getItem('token')
    let dateIn

    if (!this.state.room_id || !this.state.date_in || !this.state.startHour || !this.state.endHour || !this.state.subject || !this.state.count) {
      alert('Data incomplete!')
    } else if (Number(this.state.startHour) < 8) {
      alert('Time in must higher than 8')
    } else if (Number(this.state.startHour) > 17) {
      alert('Time in must smaller than 17')
    } else if (Number(this.state.endHour) < 8) {
      alert(`Time out must higher than ${Number(timeIn[0])}`)
    } else if (Number(this.state.endHour) > 17) {
      alert('Limit time out is 17')
    } else if (Number(this.state.startHour) > Number(this.state.endHour)) {
      alert('Time out must be higher than time in')
    } else {

      if (!this.state.startMinute) this.setState({ startMinute: '00' })
      if (!this.state.endMinute) this.setState({ endMinute: '00' })

      dateIn = this.state.date_in.split('-')
      if (Number(dateIn[[1]]) < 10) {
        dateIn[1] = `0${dateIn[1]}`
      }
      if (Number(dateIn[[2]]) < 10) {
        dateIn[2] = `0${dateIn[2]}`
      }

      dateIn = dateIn.join('-')

      let newData = {
        room_id: this.state.room_id,
        date_in: dateIn,
        time_in: `${this.state.startHour}:${this.state.startMinute}`,
        time_out: `${this.state.endHour}:${this.state.endMinute}`,
        subject: this.state.subject,
        count: this.state.count
      }

      API.post('/bookingRoom', newData,
        {
          headers: {
            token
          }
        }
      )
        .then(() => {
          alert(`Create booking room success`)
          this.props.navigation.goBack();
          this.setState({
            proses: true
          })
          this.resetForm()
        })
        .catch((err) => {
          if (err == 'Error: Request failed with status code 400') {
            alert("Waktu yang dipesan sudah terpesan oleh orang lain, harap menentukan waktu yang lain")
          } else {
            alert(err)
          }
          this.setState({
            proses: false
          })
        })
    }
  }

  validateCount = (text) => {
    this.state.listRoom.forEach(el => {
      if (el.room_id === this.state.room_id) {
        if (el.max >= text) {
          this.setState({
            count: text
          })
        } else {
          alert(`Jumlah orang melebihi batas ruangan, ${el.max} >= ${text}`)
        }
      }
    })
  }

  resetForm() {
    this.setState({
      room_id: '',
      date_in: '',
      time_in: '',
      time_out: '',
      subject: '',
      count: '',
    })
  }
  render() {
    return (
      <>

        {/* HEADER - menu button drawer, title, icon sorting */}
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <FontAwesome5 name="building" style={{ color: defaultTextColor }} size={25} />
            <Text style={styles.textTitleHeader}>Booking Room</Text>
          </View>
        </Header>

        <ScrollView style={{ height: height - 80, backgroundColor: 'green' }} >
          <View style={styles.container}>
            <View style={styles.form}>
              <Item stackedLabel style={{ marginTop: 10 }}>
                <Label style={{ color: defaultColor }}>Room</Label>
                <Item picker>
                  <Picker
                    mode="dropdown"
                    placeholder="Select the room"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    style={{ width: undefined }}
                    selectedValue={this.state.room_id}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    {
                      this.state.listRoom && this.state.listRoom.map(el =>
                        (<Picker.Item label={el.room} value={el.room_id} key={el.room_id} />)
                      )
                    }
                  </Picker>
                </Item>
              </Item>
              <Item stackedLabel style={{ marginTop: 10 }}>
                <Label style={{ color: defaultColor }}>Subject</Label>
                <Input id="subject"
                  placeholder="e.g., Meeting"
                  style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
                  value={this.state.subject}
                  onChangeText={(text) => this.setState({
                    subject: text
                  })} />
              </Item>
              <Item stackedLabel style={{ marginTop: 10, alignItems: 'flex-start' }}>
                <Label style={{ color: defaultColor }}>Date in</Label>
                <DatePicker
                  defaultDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
                  minimumDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
                  maximumDate={new Date(new Date().getFullYear(), new Date().getMonth() + 2, 31)}
                  locale={"id"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="dd/MM/yyyy"
                  placeHolderTextStyle={{ textAlign: 'left', color: '#535759' }}
                  onDateChange={(text) => this.setDateIn(text)}
                  disabled={false}
                />
              </Item>
              <Item stackedLabel>
                <Label style={{ color: defaultColor }}>Time Booking</Label>
                <View style={{ height: 'auto', flexDirection: 'row', alignItems: 'center' }} >
                  <Input id="startHour"
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder="08"
                    placeHolderTextStyle={{ textAlign: 'center' }}
                    style={{ textAlign: 'center' }}
                    value={this.state.startHour}
                    onChangeText={(text) => this.setState({
                      startHour: text
                    })} />
                  <Text> : </Text>
                  <Input id="startMinute"
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder="00"
                    placeHolderTextStyle={{ textAlign: 'center' }}
                    style={{ textAlign: 'center' }}
                    value={this.state.startMinute}
                    onChangeText={(text) => this.setState({
                      startMinute: text
                    })} />
                  <Text> s/d </Text>
                  <Input id="endHour"
                    type="text"
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder="17"
                    placeHolderTextStyle={{ textAlign: 'center' }}
                    style={{ textAlign: 'center' }}
                    value={this.state.endHour}
                    onChangeText={(text) => this.setState({
                      endHour: text
                    })} />
                  <Text margin> : </Text>
                  <Input id="endMinute"
                    type="text"
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder="00"
                    placeHolderTextStyle={{ textAlign: 'center' }}
                    style={{ textAlign: 'center' }}
                    value={this.state.endMinute}
                    onChangeText={(text) => this.setState({
                      endMinute: text
                    })} />
                </View>
              </Item>
              <Item stackedLabel style={{ marginTop: 10 }}>
                <Label style={{ color: defaultColor, margin: 0 }}>Partisipan</Label>
                <Input id="count"
                  keyboardType="numeric"
                  maxLength={2}
                  placeholder="e.g., 5"
                  style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
                  value={this.state.count}
                  onChangeText={(text) => this.validateCount(text)} />
              </Item>
            </View>
          </View>
          <TouchableHighlight onPress={this.createBookingRoom} style={{ width: "100%", height: 50, backgroundColor: defaultColor, alignItems: "center", justifyContent: "center" }} underlayColor="transparent">
            {
              this.state.proses
                ? <ActivityIndicator size="small" color="#fff" />
                : <Text style={{ color: defaultBackgroundColor, fontSize: 15, fontWeight: "bold" }}>Send</Text>
            }
          </TouchableHighlight>
        </ScrollView>
      </>
    )
  }
}

createRuangan.navigationOptions = {
  header: null
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    height: height - 130,
    justifyContent: 'space-between'
  },
  header: {
    backgroundColor: defaultColor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTitleHeader: {
    color: defaultTextColor,
    marginLeft: 5,
    fontSize: 20
  },
  form: {
    alignSelf: 'center',
    width: '90%'
  }
})