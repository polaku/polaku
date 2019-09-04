import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, ScrollView, ActivityIndicator } from 'react-native';
import { Item, Input, Label, Textarea, DatePicker } from 'native-base';
import { defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { API } from '../../../config/API';

export default class hubungiKamiFormRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      designStyle: '',
      tujuan: '',
      designType: '',
      ukuran: '',
      otherSpecs: '',
      deadline: '',
      message: '',
      type: this.props.navigation.getParam('keterangan'),
      proses: false,
      editableInput: true
    }
  }

  _onValueChange2(value) {
    this.setState({
      category: value
    });
  }

  setDeadline(newDate) {
    newDate = newDate.toString().substr(4, 12)
    let month = this.getMonth(newDate.substr(0, 3));

    this.setState({
      deadline: `${newDate.substr(7, 4)}-${month}-${newDate.substr(4, 2)}`
    });
  }

  createContactUs = () => {
    this.setState({
      proses: true,
      editableInput: false
    })
    let newData = {
      message: this.state.message,
      type: this.state.type,
      tujuan: this.state.tujuan,
      designStyle: this.state.designStyle,
      desainType: this.state.desainType,
      ukuran: this.state.ukuran,
      otherSpecs: this.state.otherSpecs,
      deadline: this.state.deadline,
    }

    API.post('/contactUs', newData, {
      headers: {
        token
      }
    })
      .then(() => {
        alert("input question success")
        this.props.navigation.goBack()
        this.setState({
          proses: false,
          editableInput: true
        })
        this.resetForm()
      })
      .catch(err => {
        this.setState({
          editableInput: true
        })
        alert("Error. Please try again")
      })

  }

  getMonth(args) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months.indexOf(args) + 1
  }

  resetForm() {
    this.setState({
      designStyle: '',
      tujuan: '',
      designType: '',
      ukuran: '',
      otherSpecs: '',
      deadline: '',
      message: '',
    })
  }
  
  render() {
    return (
      <ScrollView style={styles.container} >
        <View style={{ padding: 10 }}>
          <View style={{ margin: 10 }}>
            <Text style={styles.title}>Permintaan untuk {this.props.navigation.getParam('data')}</Text>
          </View>
          <Item stackedLabel style={{ marginTop: 10 }}>
            <Label style={{ color: defaultColor, margin: 0 }}>Design Style</Label>
            <Input id="designStyle"
              style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
              value={this.state.designStyle}
              onChangeText={(text) => this.setState({ designStyle: text })}
              editable={this.state.editableInput} />
          </Item>
          <Item stackedLabel style={{ marginTop: 10 }}>
            <Label style={{ color: defaultColor, margin: 0 }}>Tujuan</Label>
            <Input id="tujuan"
              style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
              value={this.state.tujuan}
              onChangeText={(text) => this.setState({ tujuan: text })} 
              editable={this.state.editableInput} />
          </Item>
          <Item stackedLabel style={{ marginTop: 10 }}>
            <Label style={{ color: defaultColor, margin: 0 }}>Type</Label>
            <Input id="type"
              style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
              value={this.state.type}
              onChangeText={(text) => this.setState({ type: text })} 
              editable={this.state.editableInput} />
          </Item>
          <Item stackedLabel style={{ marginTop: 10 }}>
            <Label style={{ color: defaultColor, margin: 0 }}>Ukuran</Label>
            <Input id="ukuran"
              style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
              value={this.state.ukuran}
              onChangeText={(text) => this.setState({ ukuran: text })} 
              editable={this.state.editableInput} />
          </Item>
          <Item stackedLabel style={{ marginTop: 10 }}>
            <Label style={{ color: defaultColor, margin: 0 }}>Other Specs</Label>
            <Input id="otherSpecs"
              style={{ padding: 3, alignSelf: 'flex-start', width: '100%' }}
              value={this.state.otherSpecs}
              onChangeText={(text) => this.setState({ otherSpecs: text })} 
              editable={this.state.editableInput} />
          </Item>
          <Item stackedLabel style={{ marginTop: 10, alignItems: 'flex-start' }}>
            <Label style={{ color: defaultColor, margin: 0 }}>Deadline</Label>
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
              style={{ alignSelf: 'flex-start', backgroundColor: 'red' }}
              onDateChange={(text) => this.setDeadline(text)}
              disabled={false}
              editable={this.state.editableInput} />
          </Item>
          <Item stackedLabel style={{ marginTop: 10 }}>
            <Label style={{ color: defaultColor, margin: 0 }}>Message</Label>
            <Textarea rowSpan={5} bordered style={{ width: '100%' }}
            editable={this.state.editableInput} />
          </Item>

        </View>
        <TouchableHighlight onPress={this.createContactUs} style={{ width: "100%", height: 50, backgroundColor: defaultColor, alignItems: "center", justifyContent: "center" }} underlayColor="transparent">
          {
            this.state.proses
              ? <ActivityIndicator size="small" color="#fff" />
              : <Text style={{ color: defaultBackgroundColor, fontSize: 15, fontWeight: "bold" }}>Send</Text>
          }
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    height: '100%',
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

