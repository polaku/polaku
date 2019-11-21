import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableHighlight, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
import { Input, Header, Item, DatePicker, Label, Picker } from 'native-base';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MenuButton from '../../components/menuButton';
import { API } from '../../../config/API';
import AsyncStorage from '@react-native-community/async-storage';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

class createBookingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room_id: this.props.navigation.getParam('room_id'),
      date_in: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
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
      proses: false,
      editableInput: true,
      selectedItems: [],
      dataUser: [],
      defaultDate: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
    };
  }

  async componentDidMount() {
    console.log(this.props.navigation.getParam('room_id'));
    let token = await AsyncStorage.getItem('token')
    let newDataUser = this.props.dataAllUser

    API.get('/bookingRoom/rooms', {
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
        if (err.message === 'Request failed with status code 403') {
          alert('Waktu login telah habis, silahkan login kembali')
          this.props.navigation.navigate('Login')
          AsyncStorage.clear()
        } else {
          alert(err)
        }
      })
    await newDataUser.forEach(el => {
      el.name = el.tbl_account_detail.fullname
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

  createBooking = async () => {
    let idPartisipan = []
    this.setState({
      proses: true,
      editableInput: false
    })

    let token = await AsyncStorage.getItem('token')
    let dateIn
    if (!this.state.startHour) this.setState({ startHour: `${new Date().getHours()}` })
    if (!this.state.endHour) this.setState({ endHour: `${new Date().getHours() + 1}` })

    if (!this.state.room_id || !this.state.date_in || !this.state.subject) {
      alert('Data incomplete!')
      this.setState({
        proses: false,
        editableInput: true
      })
    } else if (Number(this.state.startHour) < 8) {
      alert('Time in must higher than 8')
      this.setState({
        proses: false,
        editableInput: true
      })
    } else if (Number(this.state.startHour) > 17) {
      alert('Time in must smaller than 17')
      this.setState({
        proses: false,
        editableInput: true
      })
    } else if (Number(this.state.endHour) < 8) {
      alert(`Time out must higher than ${Number(timeIn[0])}`)
      this.setState({
        proses: false,
        editableInput: true
      })
    } else if (Number(this.state.endHour) > 17) {
      alert('Limit time out is 17')
      this.setState({
        proses: false,
        editableInput: true
      })
    } else if (Number(this.state.startHour) > Number(this.state.endHour)) {
      alert('Time out must be higher than time in')
      this.setState({
        proses: false,
        editableInput: true
      })
    } else {

      if (!this.state.startMinute) this.setState({ startMinute: '00' })
      if (!this.state.endMinute) this.setState({ endMinute: '00' })

      dateIn = this.state.date_in.split('-')
      if (Number(dateIn[[1]]) < 10) {
        dateIn[1] = `0${Number(dateIn[1])}`
      }
      if (Number(dateIn[[2]]) < 10) {
        dateIn[2] = `0${Number(dateIn[2])}`
      }

      dateIn = dateIn.join('-')

      let newData = {
        room_id: this.state.room_id,
        date_in: dateIn,
        time_in: `${this.state.startHour}:${this.state.startMinute}`,
        time_out: `${this.state.endHour}:${this.state.endMinute}`,
        subject: this.state.subject,
        count: this.state.selectedItems.length
      }

      if (this.state.selectedItems.length !== 0) {
        newData.partisipan = this.state.selectedItems
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
          this.props.navigation.state.params && this.props.navigation.state.params.refresh()
          this.props.navigation.goBack();
          this.setState({
            proses: true,
            editableInput: true
          })
          this.resetForm()
        })
        .catch((err) => {
          if (err == 'Error: Request failed with status code 400') {
            alert("Waktu yang dipesan sudah terpesan oleh orang lain, harap menentukan waktu yang lain")
          } else if (err.message === 'Request failed with status code 403') {
            alert('Waktu login telah habis, silahkan login kembali')
            this.props.navigation.navigate('Login')
            AsyncStorage.clear()
          } else {
            alert(err)
          }
          this.setState({
            proses: false,
            editableInput: true
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

  onSelectedItemsChange = selectedItems => {
    console.log(selectedItems);
    this.setState({ selectedItems });
  };

  render() {
    return (
      <View style={{ height: '100%', backgroundColor: defaultBackgroundColor }}>

        {/* HEADER - menu button drawer, title, icon sorting */}
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <FontAwesome5 name="building" style={{ color: defaultTextColor }} size={25} />
            <Text style={styles.textTitleHeader}>Booking Room</Text>
          </View>
        </Header>

        <ScrollView style={{ height: '100%' }} >
          <View style={styles.container}>
            <View style={styles.form}>
              <Item stackedLabel style={{ marginTop: 10 }}>
                <Label style={{ color: defaultColor }}>Ruangan</Label>
                <Item picker>
                  <Picker
                    mode="dropdown"
                    placeholder="Select the room"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    style={{ width: undefined }}
                    selectedValue={this.state.room_id}
                    onValueChange={this.onValueChange.bind(this)}
                    editable={this.state.editableInput}
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
                <Label style={{ color: defaultColor }}>Agenda</Label>
                <Input id="subject"
                  placeholder="isi agenda rapat"
                  style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
                  value={this.state.subject}
                  onChangeText={(text) => this.setState({
                    subject: text
                  })}
                  editable={this.state.editableInput} />
              </Item>
              <Item stackedLabel style={{ marginTop: 10, alignItems: 'flex-start' }}>
                <Label style={{ color: defaultColor }}>Tanggal pesanan</Label>
                <DatePicker
                  defaultDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
                  minimumDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
                  maximumDate={new Date(new Date().getFullYear(), new Date().getMonth() + 2, 31)}
                  locale={"id"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText={this.state.defaultDate}
                  placeHolderTextStyle={{ textAlign: 'left', color: '#535759' }}
                  onDateChange={(text) => this.setDateIn(text)}
                  disabled={false}
                  editable={this.state.editableInput}
                />
              </Item>
              <Item stackedLabel>
                <Label style={{ color: defaultColor }}>Waktu pesanan</Label>
                <View style={{ height: 'auto', flexDirection: 'row', alignItems: 'center' }} >
                  <Input id="startHour"
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder={`${new Date().getHours()}`}
                    placeHolderTextStyle={{ textAlign: 'center' }}
                    style={{ textAlign: 'center' }}
                    value={this.state.startHour}
                    onChangeText={(text) => this.setState({
                      startHour: text
                    })}
                    editable={this.state.editableInput} />
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
                    })}
                    editable={this.state.editableInput} />
                  <Text> s/d </Text>
                  <Input id="endHour"
                    type="text"
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder={`${new Date().getHours() + 1}`}
                    placeHolderTextStyle={{ textAlign: 'center' }}
                    style={{ textAlign: 'center' }}
                    value={this.state.endHour}
                    onChangeText={(text) => this.setState({
                      endHour: text
                    })}
                    editable={this.state.editableInput} />
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
                    })}
                    editable={this.state.editableInput} />
                </View>
              </Item>
              {/* <Item stackedLabel style={{ marginTop: 10 }}>
                <Label style={{ color: defaultColor, margin: 0 }}>Partisipan</Label>
                <Input id="count"
                  keyboardType="numeric"
                  maxLength={2}
                  placeholder="e.g., 5"
                  style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
                  value={this.state.count}
                  onChangeText={(text) => this.validateCount(text)}
                  editable={this.state.editableInput} />
              </Item> */}
              <SectionedMultiSelect
                items={this.props.dataAllUser}
                uniqueKey="user_id"
                // subKey="children"
                selectText="Undang partisipan..."
                showDropDowns={true}
                // readOnlyHeadings={true}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={this.state.selectedItems}
                showCancelButton={true}
              // onSelectedItemsChange={item => console.log(item)}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableHighlight onPress={this.createBooking} style={{ width: "100%", height: 50, backgroundColor: defaultColor, alignItems: "center", justifyContent: "center" }} underlayColor="transparent">
          {
            this.state.proses
              ? <ActivityIndicator size="small" color="#fff" />
              : <Text style={{ color: defaultBackgroundColor, fontSize: 15, fontWeight: "bold" }}>Pesan Ruangan</Text>
          }
        </TouchableHighlight>
      </View>
    )
  }
}

createBookingRoom.navigationOptions = {
  header: null
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    // height: height - 100,
    // height: height,
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
  },
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 8,
  },
  input: { maxHeight: 40 },
  inputContainer: {
    display: "flex",
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#c7c6c1",
    paddingVertical: 13,
    paddingLeft: 12,
    paddingRight: "5%",
    width: "100%",
    justifyContent: "flex-start",
  },
  plus: {
    position: "absolute",
    left: 15,
    top: 10,
  },
})

const mapStateToProps = ({ dataAllUser }) => {
  return {
    dataAllUser
  }
}

export default connect(mapStateToProps)(createBookingRoom)