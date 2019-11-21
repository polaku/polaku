import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { defaultColor, defaultBackgroundColor } from '../defaultColor';
import { API } from '../../config/API'
import AsyncStorage from '@react-native-community/async-storage';

export default class cardPermintaan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ongoing: false
    }
  }

  componentDidMount() {
    if (this.props.ongoing) this.setState({ ongoing: true })
  }


  done = async () => {
    let token = await AsyncStorage.getItem('token')

    API.get(`/contactUs/done/${this.props.data.contact_id}`,
      {
        headers: { token }
      })
    this.props.fetchData()
    this.props.navigation.goBack()
  }

  navigateDetailPermintaan = () => {
    if (this.props.data.date_imp !== null || this.props.data.leave_date !== null || this.props.data.date_ijin_absen_start !== null) {
      this.props.navigation.navigate("DetailPermintaan", { //ke DetaiPermintaanHRD.js
        task: this.props.data,
        ongoing: this.state.ongoing
      })
    } else {
      this.props.navigation.navigate("DetailHubungiKami", { //ke DetaiTugas.js
        data: this.props.data,
        ongoing: this.state.ongoing
      })
    }
  }

  render() {
    function getDate(args) {
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let date = new Date(args).getDate()
      let month = months[new Date(args).getMonth()]
      let years = new Date(args).getFullYear()

      return `${month} ${date}, ${years}`
    }

    return (
      <TouchableHighlight style={styles.container} onPress={this.navigateDetailPermintaan} underlayColor="transparent">
        <View>
          {
            this.props.data.tbl_contact_category && <Text style={styles.divisi}>{this.props.data.tbl_contact_category.contact_categories}</Text>}
          <Text style={styles.judulPermintaan}>{this.props.data.message}</Text>

          <Text>{getDate(this.props.data.created_at)}</Text>
          {
            this.props.data.status === 'confirmation' && <TouchableHighlight onPress={this.done} style={styles.button} underlayColor="transparent">
              <Text style={styles.textButton}>Done</Text>
            </TouchableHighlight>
          }
        </View>

      </TouchableHighlight >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '90%'
  },
  divisi: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  judulPermintaan: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  button: {
    width: 80,
    height: 30,
    backgroundColor: defaultColor,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 5
  },
  textButton: {
    color: defaultBackgroundColor,
    fontSize: 15,
    fontWeight: 'bold'
  }
})
