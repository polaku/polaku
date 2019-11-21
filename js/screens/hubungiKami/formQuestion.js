import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { Item, Input, Label, Textarea, Picker, Icon } from 'native-base';
import { defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { API } from '../../../config/API';
import AsyncStorage from '@react-native-community/async-storage';

export default class formQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: '',
      message: '',
      category: '',
      type: 'contact_us',
      categories: [],
      proses: false,
      contactCategoresId: '',
      editableInput: true
    }
  }

  async componentDidMount() {
    let token = await AsyncStorage.getItem('token')
    let division = ''
    if (this.props.navigation.getParam('data') === 'DESAIN') division = 1
    else if (this.props.navigation.getParam('data') === 'IT') division = 2
    else if (this.props.navigation.getParam('data') === 'HRD') division = 4

    API.get('/contactUs/categories', {
      headers: {
        token
      }
    })
      .then(({ data }) => {
        let datas = data.data.filter(element => element.contact_categories_id === division);
        this.setState({
          categories: datas,
          contactCategoresId: division
        })
      })
  }

  _onValueChange2(value) {
    this.setState({
      category: value
    });
  }

  createContactUs = async () => {
    this.setState({
      proses: true,
      editableInput: false
    })
    let token = await AsyncStorage.getItem('token')

    if (this.state.subject !== '' || this.state.message !== '') {
      alert('Data incomplete')
      this.setState({
        proses: false,
        editableInput: true
      })
    } else {
      let newData = {
        subject: this.state.subject,
        message: this.state.message,
        contactCategoriesId: this.state.contactCategoresId,
        categoriId: this.state.category,
        type: this.state.type
      }

      API.post('/contactUs', newData, {
        headers: {
          token
        }
      })
        .then(() => {
          alert("Terima kasih. Mohon menunggu untuk dibantu")
          this.props.navigation.goBack()
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
          } else {
            alert('Error. Please try again')
          }
          this.setState({
            proses: false,
            editableInput: true
          })
        })
    }

  }

  resetForm() {
    this.setState({
      subject: '',
      message: '',
      category: ''
    })
  }

  render() {
    return (
      <ScrollView style={{ height: '100%', backgroundColor: defaultBackgroundColor }} >
        <View style={styles.container} >
          <View style={{ padding: 10 }}>
            <View style={{ margin: 10 }}>
              <Text style={styles.title}>Pertanyaan untuk {this.props.navigation.getParam('data')}</Text>
            </View>
            <Item stackedLabel style={{ marginTop: 10 }}>
              <Label style={{ color: defaultColor, margin: 0 }}>Subject</Label>
              <Input id="subject"
                style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
                value={this.state.subject}
                onChangeText={(text) => this.setState({ subject: text })}
                editable={this.state.editableInput} />
            </Item>
            {
              this.props.navigation.getParam('data') != 'LAINNYA' && <Item picker stackedLabel>
                <Label style={{ color: defaultColor, margin: 0 }}>Category</Label>
                <Picker
                  mode="dropdown"
                  placeholder=" "
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: '100%', height: 35, marginTop: 10 }}
                  placeholderStyle={{ color: "#bfc6ea" }}
                  selectedValue={this.state.category}
                  onValueChange={this._onValueChange2.bind(this)}
                  itemStyle={{ height: 44 }}
                  editable={this.state.editableInput}
                >
                  {
                    this.state.categories.map((el, index) => (
                      <Picker.Item label={el.sub_categori} value={el.categori_id} key={index} />
                    ))
                  }
                </Picker>
              </Item>
            }

            <Item stackedLabel style={{ marginTop: 10 }}>
              <Label style={{ color: defaultColor, margin: 0 }}>Message</Label>
              <Textarea rowSpan={5} bordered style={{ width: '100%' }} onChangeText={(text) => this.setState({ message: text })} editable={this.state.editableInput} />
            </Item>

          </View>
          <TouchableHighlight style={{ width: "100%", height: 50, backgroundColor: defaultColor, alignItems: "center", justifyContent: "center" }} onPress={this.createContactUs} underlayColor="transparent">
            {
              this.state.proses
                ? <ActivityIndicator size="small" color="#fff" />
                : <Text style={{ color: defaultBackgroundColor, fontSize: 15, fontWeight: "bold" }}>Send</Text>
            }
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    height: height - 80,
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

