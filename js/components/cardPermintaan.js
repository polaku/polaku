import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

export default class cardAcara extends Component {
  constructor(props) {
    super(props);
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
      <TouchableHighlight style={styles.container}>
        <View>
          <Text style={styles.divisi}>{this.props.data.tbl_contact_category.contact_categories}</Text>
          <Text style={styles.judulPermintaan}>{this.props.data.message}</Text>

          <View style={styles.keterangan}>
            <Text>{getDate(this.props.data.created)}</Text>
            <Text> 3 hari </Text>
          </View>
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
    width: '80%'
  },
  divisi: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  judulPermintaan: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  keterangan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
