import React, { Component } from 'react'
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Text, Icon, Input, Item } from 'native-base';
import CardComment from '../../components/cardComment';

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
          <Text style={styles.description}>Tulisan tidak lebih dari 300 kata</Text>
          <View style={styles.footer}>
            <Text style={styles.footerItem}>2</Text>
            <Icon name='heart-empty' size={5} style={{ color: 'gray', border: 1 }} />
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
})