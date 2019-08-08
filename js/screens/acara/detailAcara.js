
import React, { Component } from 'react'
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Text, Icon, Input, Item } from 'native-base';
import CardComment from '../../components/cardComment';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class detailAnnouncement extends Component {

  render() {
    return (
      <ScrollView>
        <View style={styles.container} >
          <View style={styles.header}>
            <Image source={require('../../../assest/icon_user.png')} style={styles.iconUser} />
            <View style={styles.headerRight}>
              <View>
                <Text style={styles.userComment}>nama user</Text>
                <Text style={styles.dateComment}>August 5, 2019</Text>
              </View>
              <View>
                <Icon name='bookmark' style={styles.bookmark} size={32} />
              </View>
            </View>
          </View>
          <Text style={styles.title}>Judul tidak lebih dari sepuluh kata yang akan tampil disini</Text>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Image source={require('../../../assest/index.jpeg')} style={{
              resizeMode: 'cover',
              height: 200,
              width: '100%',
              alignItems: 'center',
            }} />
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 10, marginBottom: 10 }}>
            <View style={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#A6250F', fontWeight: 'bold', fontSize: 25 }}>Juli</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>29</Text>
            </View>
            <View style={{ width: '79%' }}>
              <TouchableHighlight style={{ backgroundColor: '#A6250F', width: '100%', height: 55, margin: 5, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>IKUT</Text>
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

          <View>
            <Text style={{ fontSize: 17, color: '#A6250F' }}>3 Komentar</Text>
            <View style={styles.userComments}>
              <Image source={require('../../../assest/icon_user.png')} style={styles.iconUserComment} />
              <View style={styles.headerRight}>
                <View style={{ width: '100%', paddingRight: 15 }}>
                  <Input placeholder='Tambah komentar ...' style={{ borderWidth: 0.7, borderColor: 'gray' }} />
                </View>
                <Icon name='send' style={styles.bookmark} size={32} />
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

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  userComments: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
    marginBottom: 17
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center'
  },
  bookmark: {
    color: '#A6250F'
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
  footer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5
  },
  footerItem: {
    fontSize: 12,
    color: '#A6250F',
    marginRight: 5,
    alignItems: 'center'
  },
  isiAcara: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5
  }
})