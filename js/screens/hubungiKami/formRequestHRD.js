import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Item, Input, Label, Textarea, DatePicker } from 'native-base';
import { defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { API } from '../../../config/API';
import AsyncStorage from '@react-native-community/async-storage';

export default class formRequestHRD extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forIMP: false,
      forCuti: false,
      forIA: false,
      textarea: '',
      IMP_date: '',
      start_date: '',
      end_date: '',
      limitDate: '',
      limitMonth: '',
      limitYear: '',
      startHour: '',
      startMinute: '',
      endHour: '',
      endMinute: '',
      lamaCuti: '',
      type: 'request',
      proses: false,
      editableInput: true
    }
  }

  componentDidMount() {
    if (this.props.navigation.getParam('data') === 'IMP') {
      this.setState({
        forIMP: true
      })
    } else if (this.props.navigation.getParam('data') === 'Cuti') {
      this.setState({
        forCuti: true
      })
    } else if (this.props.navigation.getParam('data') === 'Ijin Absen') {
      this.setState({
        forIA: true
      })
    }
  }

  createContactUs = async () => {
    this.setState({
      proses: true,
      editableInput: false
    })
    let newData, token = await AsyncStorage.getItem('token')

    if (this.state.forIMP) {
      if (!this.state.startMinute) this.setState({ startMinute: '00' })
      if (!this.state.endMinute) this.setState({ endMinute: '00' })

      if (Number(this.state.startHour) > Number(this.state.endHour)) {
        this.setState({
          proses: false,
          editableInput: true
        })
        return alert("waktu selesai harus lebih besar dari waktu mulai")
      }

      newData = {
        date_imp: this.normalitationDate(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`),
        start_time_imp: `${this.state.startHour}:${this.state.startMinute}`,
        end_time_imp: `${this.state.endHour}:${this.state.endMinute}`,
        message: this.state.textarea,
        categoriId: 7
      }
    } else if (this.state.forCuti) {
      newData = {
        leave_date: this.normalitationDate(this.state.start_date),
        leave_request: this.state.lamaCuti,
        message: this.state.textarea,
        categoriId: 6
      }
    } else if (this.state.forIA) {
      newData = {
        date_ijin_absen_start: this.normalitationDate(this.state.start_date),
        date_ijin_absen_end: this.normalitationDate(this.state.end_date),
        message: this.state.textarea,
        categoriId: 8
      }
    }

    newData.type = 'request'
    newData.contactCategoriesId = 4
    console.log(newData);
    API.post('/contactUs', newData, {
      headers: {
        token
      }
    })
      .then(() => {
        alert("Terima kasih. Mohon menunggu untuk direspon")
        this.props.navigation.state.params.fetchData && this.props.navigation.state.params.fetchData()
        this.props.navigation.goBack()
        this.setState({
          proses: false,
          editableInput: true
        })
      })
      .catch(err => {
        this.setState({
          editableInput: true
        })
        if (err.message === 'Request failed with status code 403') {
          alert('Waktu login telah habis, silahkan login kembali')
          this.props.navigation.navigate('Login')
          AsyncStorage.clear()
        } else {
          alert('Error. Please try again')
        }
        console.log(err);
      })
  }

  normalitationDate = args => {
    let newDate = args.split('-')
    if (Number(newDate[[1]]) < 10) {
      newDate[1] = `0${Number(newDate[1])}`
    }
    if (Number(newDate[[2]]) < 10) {
      newDate[2] = `0${Number(newDate[2])}`
    }

    newDate = newDate.join('-')

    return newDate
  }

  setStartDate(newDate) {
    newDate = newDate.toString().substr(4, 12)
    let month = this.getMonth(newDate.substr(0, 3));

    this.setState({
      start_date: `${newDate.substr(7, 4)}-${month}-${newDate.substr(4, 2)}`,
      limitDate: newDate.substr(4, 2),
      limitMonth: month - 1,
      limitYear: newDate.substr(7, 4)
    });
  }

  setEndDate(newDate) {
    newDate = newDate.toString().substr(4, 12)
    let month = this.getMonth(newDate.substr(0, 3));

    this.setState({
      end_date: `${newDate.substr(7, 4)}-${month}-${newDate.substr(4, 2)}`,
    });
  }

  setIMPDate(newDate) {
    newDate = newDate.toString().substr(4, 12)
    let month = this.getMonth(newDate.substr(0, 3));

    this.setState({
      IMP_date: `${newDate.substr(7, 4)}-${month}-${newDate.substr(4, 2)}`
    });
  }

  getMonth(args) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months.indexOf(args) + 1
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={{ padding: 10 }}>
          <View style={{ margin: 10 }}>
            <Text style={styles.title}>Permintaan untuk {this.props.navigation.getParam('data')}</Text>
          </View>
          {
            this.state.forIA && <>
              <Item stackedLabel style={{ marginTop: 10, alignItems: 'flex-start' }}>
                <Label style={{ color: defaultColor }}>Tanggal</Label>
                <View style={{ height: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' }} >
                  <DatePicker
                    defaultDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
                    minimumDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7)}
                    maximumDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7)}
                    locale={"id"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText={`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}
                    placeHolderTextStyle={{ textAlign: 'left', color: '#535759' }}
                    onDateChange={(text) => this.setStartDate(text)}
                    disabled={false}
                    editable={this.state.editableInput}
                  />
                  <Text style={{ marginLeft: 10, marginRight: 10 }}> s/d </Text>
                  <DatePicker
                    defaultDate={new Date(this.state.limitYear, this.state.limitMonth, this.state.limitDate)}
                    minimumDate={new Date(this.state.limitYear, this.state.limitMonth, this.state.limitDate)}
                    maximumDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7)}
                    locale={"id"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText={`${new Date().getDate() + 1}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}
                    placeHolderTextStyle={{ textAlign: 'left', color: '#535759' }}
                    onDateChange={(text) => this.setEndDate(text)}
                    disabled={false}
                    editable={this.state.editableInput}
                  />
                </View>
              </Item>
              <Item stackedLabel style={{ marginTop: 10 }}>
                <Label style={{ color: defaultColor, margin: 0 }}>Alasannya</Label>
                <Textarea rowSpan={5} bordered style={{ width: '100%' }}
                  onChangeText={(text) => this.setState({ textarea: text })}
                  editable={this.state.editableInput} />
              </Item>
            </>
          }
          {
            this.state.forCuti && <>
              <Item stackedLabel style={{ marginTop: 10 }}>
                <Label style={{ color: defaultColor, margin: 0 }}>Lama cuti</Label>
                <Input id="lamaCuti"
                  keyboardType='numeric'
                  style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
                  value={this.state.designStyle}
                  onChangeText={(text) => this.setState({ lamaCuti: text })}
                  editable={this.state.editableInput} />
              </Item>
              <Item stackedLabel style={{ marginTop: 10, alignItems: 'flex-start' }}>
                <Label style={{ color: defaultColor }}>Tanggal</Label>
                <DatePicker
                  defaultDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7)}
                  minimumDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7)}
                  maximumDate={new Date(new Date().getFullYear(), new Date().getMonth() + 2, 31)}
                  locale={"id"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText={`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}
                  placeHolderTextStyle={{ textAlign: 'left', color: '#535759' }}
                  onDateChange={(text) => this.setStartDate(text)}
                  disabled={false}
                  editable={this.state.editableInput}
                />
              </Item>
              <Item stackedLabel style={{ marginTop: 10 }}>
                <Label style={{ color: defaultColor, margin: 0 }}>Alasannya</Label>
                <Textarea rowSpan={5} bordered style={{ width: '100%' }}
                  onChangeText={(text) => this.setState({ textarea: text })}
                  editable={this.state.editableInput} />
              </Item>
            </>
          }
          {
            this.state.forIMP && <>
              <View stackedLabel style={{ marginTop: 10, alignItems: 'flex-start' }}>
                <Label style={{ color: defaultColor, marginBottom: 5 }}>Tanggal IMP</Label>
                <Text style={{ marginLeft: 10, fontSize: 16, marginBottom: 10 }}>{JSON.stringify(new Date()).slice(1, 11)}</Text>
              </View>
              <Item stackedLabel>
                <Label style={{ color: defaultColor }}>Waktu IMP</Label>
                <View style={{ height: 'auto', flexDirection: 'row', alignItems: 'center' }} >
                  <Input id="startHour"
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder={`${new Date().getHours()}`}
                    placeholderTextColor="#B0B0B0"
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
                    placeholderTextColor="#B0B0B0"
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
                    placeholderTextColor="#B0B0B0"
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
                    placeholderTextColor="#B0B0B0"
                    placeHolderTextStyle={{ textAlign: 'center' }}
                    style={{ textAlign: 'center' }}
                    value={this.state.endMinute}
                    onChangeText={(text) => this.setState({
                      endMinute: text
                    })}
                    editable={this.state.editableInput} />
                </View>
              </Item>
              <Item stackedLabel style={{ marginTop: 10 }}>
                <Label style={{ color: defaultColor, margin: 0 }}>Alasannya</Label>
                <Textarea rowSpan={5} bordered style={{ width: '100%' }}
                  onChangeText={(text) => this.setState({ textarea: text })}
                  editable={this.state.editableInput} />
              </Item>
            </>
          }
        </View>
        <TouchableHighlight onPress={this.createContactUs} style={{ width: "100%", height: 50, backgroundColor: defaultColor, alignItems: "center", justifyContent: "center" }} underlayColor="transparent">
          {
            this.state.proses
              ? <ActivityIndicator size="small" color="#fff" />
              : <Text style={{ color: defaultBackgroundColor, fontSize: 15, fontWeight: "bold" }}>Send</Text>
          }
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    height: '100%',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: defaultColor
  },
  button: {
    height: 100,
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 15
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})

