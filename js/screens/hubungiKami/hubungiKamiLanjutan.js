import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, FlatList } from 'react-native'
import { Header, Icon } from 'native-base';
import MenuButton from '../../components/menuButton';

export default class acara extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#A6250F' }}> IT </Text>
        </View>
        <TouchableHighlight style={{ height: 100, width: '100%', borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginBottom:15 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>pertanyaan</Text>
        </TouchableHighlight>
        <TouchableHighlight style={{ height: 100, width: '100%', borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginBottom:15 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>permintaan khusus</Text>
        </TouchableHighlight>
        <TouchableHighlight style={{ height: 100, width: '100%', borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginBottom:15 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>hubungii divisi lain</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
    height: '100%',
    marginBottom: 60,
    padding: 10
  },
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 15,
    left: 20
  },
  textColor: {
    color: '#DBA89F'
  },
  sorting: {
    zIndex: 9,
    position: 'absolute',
    top: 15,
    right: 20,
    color: '#DBA89F'
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F1F1F1',
  },
  teksPengumuman: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 5
  },
  tab: {
    backgroundColor: '#F1F1F1'
  },
  buttonAdd: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    width: 100,
    position: 'absolute',
    bottom: 60,
    right: 1 / 2 * width - 50,
    height: 100,
    backgroundColor: '#A6250F',
    borderRadius: 130,
    paddingTop: 10
  }
})

