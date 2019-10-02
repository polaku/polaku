import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight, Image, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
import { Input, Header, Item, DatePicker, Label } from 'native-base';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MenuButton from '../../components/menuButton';
import ImagePicker from 'react-native-image-picker';
import { API } from '../../../config/API';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import { fetchDataEvent, fetchDataMyEvent } from '../../store/action';

class createAcara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event_name: '',
      description: '',
      start_date: '',
      end_date: '',
      location: '',
      thumbnail: null,
      startDate: '',
      endDate: '',
      limitDate: '',
      limitMonth: '',
      limitYear: '',
      proses: '',
      editableInput: true,
    };
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

  getMonth(args) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months.indexOf(args) + 1
  }

  selectImage = () => {
    const options = {
      noData: true,
    }

    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ thumbnail: response })
      }
    })

  }

  createAcara = async () => {
    this.setState({
      proses: true,
      editableInput: false
    })
    
    let token = await AsyncStorage.getItem('token')

    let startDate, endDate

    startDate = this.state.start_date.split('-')
    if (Number(startDate[[1]]) < 10) {
      startDate[1] = `0${startDate[1]}`
    }
    if (Number(startDate[[2]]) < 10) {
      startDate[2] = `0${startDate[2]}`
    }
    endDate = this.state.end_date.split('-')
    if (Number(endDate[[1]]) < 10) {
      endDate[1] = `0${endDate[1]}`
    }
    if (Number(endDate[[2]]) < 10) {
      endDate[2] = `0${endDate[2]}`
    }

    startDate = startDate.join('-')
    endDate = endDate.join('-')

    var formData = new FormData();

    formData.append("event_name", this.state.event_name)
    formData.append("description", this.state.description)
    formData.append("start_date", startDate)
    formData.append("end_date", endDate)
    formData.append("location", this.state.location)
    
    this.state.thumbnail && formData.append("thumbnail", {
      name: this.state.thumbnail.fileName,
      type: 'image/jpeg',
      uri: this.state.thumbnail.uri
    })


    API.post('/events', formData,
      {
        headers: {
          token
        }
      }
    )
      .then(() => {
        this.props.fetchDataEvent()
        this.props.fetchDataMyEvent()
        this.props.navigation.goBack(null);
        alert(`Create event success`)
        this.setState({
          proses: false,
          editableInput: true
        })
        this.resetForm()
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 403') {
          alert('Waktu login telah habis, silahkan login kembali')
          this.props.navigation.navigate('Login')
          AsyncStorage.clear()
        }else{
          alert(err)
        }
        this.resetForm()
        this.setState({
          proses: false,
          editableInput: true
        })
      })
  }

  resetForm() {
    this.setState({
      event_name: '',
      description: '',
      start_date: '',
      end_date: '',
      location: '',
      thumbnail: null,
    })
  }

  render() {
    return (
      <>
        {/* HEADER - menu button drawer, title, icon sorting */}
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <MaterialIcons name='event' style={{ color: defaultTextColor }} size={30} />
            <Text style={styles.textTitleHeader}>Buat Acara</Text>
          </View>
        </Header>

        <ScrollView style={{ height: height}} >
          <View style={styles.container}>
            <View style={styles.form}>
              <Item stackedLabel style={{ marginTop: 10 }}>
                <Label style={{ color: defaultColor }}>Nama Acara</Label>
                <Input id='event_name'
                  value={this.state.event_name}
                  style={styles.input}
                  onChangeText={(text) => this.setState({
                    event_name: text
                  })} 
                  editable={this.state.editableInput}/>
              </Item>
              <Item stackedLabel style={{ marginTop: 10 }}>
                <Label style={{ color: defaultColor }}>Keterangan</Label>
                <Input id='description'
                  value={this.state.description}
                  style={styles.input}
                  onChangeText={(text) => this.setState({
                    description: text
                  })}
                  editable={this.state.editableInput}/>
              </Item>
              <Item stackedLabel style={{ marginTop: 10, alignItems: 'flex-start' }}>
                <Label style={{ color: defaultColor }}>Tanggal</Label>
                <View style={{ height: 'auto', flexDirection: 'row', alignItems: 'center' }} >
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
                    onDateChange={(text) => this.setStartDate(text)}
                    disabled={false}
                    editable={this.state.editableInput}
                  />
                  <Text style={{ marginLeft: 10, marginRight: 10 }}> s/d </Text>
                  <DatePicker
                    defaultDate={new Date(this.state.limitYear, this.state.limitMonth, this.state.limitDate)}
                    minimumDate={new Date(this.state.limitYear, this.state.limitMonth, this.state.limitDate)}
                    maximumDate={new Date(this.state.limitYear, this.state.limitMonth + 2, 31)}
                    locale={"id"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="dd/MM/yyyy"
                    placeHolderTextStyle={{ textAlign: 'left', color: '#535759' }}
                    onDateChange={(text) => this.setEndDate(text)}
                    disabled={false}
                    editable={this.state.editableInput}
                  />
                </View>
              </Item>
              <Item stackedLabel style={{ marginTop: 10 }}>
                <Label style={{ color: defaultColor }}>Lokasi</Label>
                <Input id='location'
                  value={this.state.location}
                  style={styles.input}
                  onChangeText={(text) => this.setState({
                    location: text
                  })}
                  editable={this.state.editableInput}/>
              </Item>
              <Item>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: defaultColor, fontSize: 15 }}>Gambar</Text>
                  <TouchableHighlight onPress={this.selectImage} style={styles.buttonChooseImage} underlayColor="transparent">
                    <Text style={{ color: defaultBackgroundColor, fontSize: 15 }}>Choose Image</Text>
                  </TouchableHighlight>
                </View>
              </Item>
              <Image source={this.state.thumbnail} style={{
                alignSelf: 'center',
                width: 150,
                height: 150,
                margin: 20
              }} resizeMode={'stretch'} />
            </View>
          </View>
          <TouchableHighlight onPress={this.createAcara} style={styles.buttonCreateAcara} underlayColor="transparent">
            {
              this.state.proses
                ? <ActivityIndicator size="small" color="#fff" />
                : <Text style={styles.textButton}>Send</Text>
            }
          </TouchableHighlight>
        </ScrollView>
      </>
    )
  }
}

createAcara.navigationOptions = {
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
  },
  buttonChooseImage: {
    width: 150,
    height: 40,
    borderRadius: 15,
    backgroundColor: defaultColor,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginLeft: 20
  },
  buttonCreateAcara: {
    width: '100%',
    height: 50,
    backgroundColor: defaultColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    color: defaultBackgroundColor,
    fontSize: 15,
    fontWeight: "bold"
  },
  input: {
    alignSelf: 'flex-start',
    width: '100%',
    padding: 0
  }
})



const mapDispatchToProps = {
  fetchDataEvent,
  fetchDataMyEvent
}

export default connect(null, mapDispatchToProps)(createAcara)