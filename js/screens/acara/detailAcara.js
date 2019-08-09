import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Icon, Input } from 'native-base';
import CardComment from '../../components/cardComment';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { defaultColor } from '../../defaultColor';


export default class detailAnnouncement extends Component {

  render() {
    return (
      <ScrollView>
        <View style={styles.container} >

          {/* UP SECTION */}
          <View style={styles.header}>
            <Image source={require('../../../assest/icon_user.png')} style={styles.iconUser} />
            <View style={styles.headerRight}>
              <View>
                <Text style={styles.userComment}>nama user</Text>
                <Text style={styles.dateComment}>August 5, 2019</Text>
              </View>
              <View>
                <Icon name='bookmark' style={{ color: defaultColor }} size={32} />
              </View>
            </View>
          </View>
          <Text style={styles.title}>Judul tidak lebih dari sepuluh kata yang akan tampil disini</Text>
          <View style={styles.imagePlace}>
            <Image source={require('../../../assest/index.jpeg')} style={styles.image} />
          </View>
          <View style={styles.dateMonthButtonPlace}>
            <View style={styles.dateMonthPlace}>
              <Text style={styles.month}>Juli</Text>
              <Text style={styles.date}>29</Text>
            </View>
            <View style={{ width: '79%' }}>
              <TouchableHighlight style={styles.buttonIkut}>
                <Text style={styles.textButtonIkut}>IKUT</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <View style={styles.isiAcara}>
              <Icon name='time' size={32} style={{ marginRight: 15 }} />
              <View>
                <Text style={{ fontSize: 15 }}>Juli 29 - Juli 30</Text>
                <Text>Jul 29 pada 10:00 sampai Jul 30 pada 13:00</Text>
              </View>
            </View>
            <View style={styles.isiAcara}>
              <Icon name='map' size={32} style={{ marginRight: 15 }} />
              <Text>Location</Text>
            </View>
            <View style={styles.isiAcara}>
              <Icon name='list-box' size={32} style={{ marginRight: 15 }} />
              <Text>Keterangan acara</Text>
            </View>
          </View>

          <View style={styles.line}></View>

          {/* BOTTOM SECTION */}
          <View>
            <Text style={styles.keteranganKomen}>3 Komentar</Text>
            <View style={styles.userComments}>
              <Image source={require('../../../assest/icon_user.png')} style={styles.iconUserComment} />
              <View style={styles.headerRight}>
                <View style={styles.spaceInputKomen}>
                  <Input placeholder='Tambah komentar ...' style={styles.columnComment} />
                </View>
                <Icon name='send' style={{ color: defaultColor }} size={32} />
              </View>
            </View>
            <CardComment />
            <CardComment />
          </View>
          
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
  },
  userComments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
    marginBottom: 17
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center'
  },
  iconUserComment: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 30
  },
  iconUser: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 30
  },
  userComment: {
    fontWeight: 'bold'
  },
  dateComment: {
    fontSize: 12,
    color: '#C1C1C1'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  line: {
    borderWidth: 1,
    width: '100%',
    borderColor: 'gray',
    marginTop: 10,
    marginBottom: 10
  },
  isiAcara: {
    flexDirection: 'row',
    marginBottom: 5
  },
  columnComment: {
    borderWidth: 0.7,
    borderColor: 'gray'
  },
  imagePlace: {
    marginTop: 10,
    marginBottom: 10
  },
  image: {
    resizeMode: 'cover',
    height: 200,
    width: '100%',
    alignItems: 'center',
  },
  dateMonthButtonPlace: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    marginBottom: 10
  },
  dateMonthPlace: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  month: {
    color: defaultColor,
    fontWeight: 'bold',
    fontSize: 25
  },
  date: {
    fontWeight: 'bold',
    fontSize: 20
  },
  keteranganKomen: {
    fontSize: 17,
    color: defaultColor
  },
  spaceInputKomen: {
    width: '100%',
    paddingRight: 15
  },
  buttonIkut: {
    backgroundColor: defaultColor,
    width: '100%',
    height: 55,
    margin: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButtonIkut: {
    color: 'white',
    fontWeight: 'bold'
  }
})