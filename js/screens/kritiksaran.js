import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, ActivityIndicator, Alert } from 'react-native';
import { Header, Item, Label, Textarea } from 'native-base';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../defaultColor';
import MenuButton from '../components/menuButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { API } from '../../config/API';
import AsyncStorage from '@react-native-community/async-storage';

export default class kritiksaran extends Component {
  state = {
    editableInput: true,
    textarea: '',
    proses: false
  }

  onValueChange(value) {
    this.setState({
      keterangan: value
    });
  }

  sendRequest = async () => {
    let token = await AsyncStorage.getItem('token')
    let newData = {
      value: this.state.textarea
    }
    this.setState({
      proses: true
    })

    API.post('/kritikSaran', newData, { headers: { token } })
      .then(() => {
        Alert.alert("Success", "Terimakasih atas kritik dan sarannya");
        this.setState({
          textarea: '',
          proses: false
        })
      })
      .catch(err => {
        this.setState({
          proses: false
        })
        console.log(err)
        Alert.alert("Error", "please try again");
      })
  }

  render() {
    return (
      <View style={{ height: '100%' }}>

        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <MaterialCommunityIcons name="message-draw" style={{ color: 'white' }} size={25} />
            <Text style={styles.textTitleHeader}>Kritik dan Saran</Text>
          </View>
        </Header>


        {/* <View style={{ height: height, padding: 10 }} > */}
          <Item stackedLabel style={{ padding: 10,borderColor: 'transparent'  }} >
            <Label style={{ color: defaultColor, margin: 0 }}>Isi pesan</Label>
            <Textarea rowSpan={5} bordered style={{ width: '100%' }}
              value={this.state.textarea}
              onChangeText={(text) => this.setState({ textarea: text })}
              editable={this.state.editableInput} />
          </Item>
        {/* </View> */}
        <TouchableHighlight onPress={this.sendRequest} style={{ width: "100%", height: 50, backgroundColor: defaultColor, alignItems: "center", justifyContent: "center", bottom:0, position:'absolute' }} underlayColor="transparent">
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

kritiksaran.navigationOptions = {
  header: null
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
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
})