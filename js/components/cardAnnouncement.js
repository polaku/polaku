import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableHighlight } from 'react-native';
import { Text, Icon } from 'native-base';
import { defaultColor } from '../defaultColor';

export default class cardAnnouncement extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.props.navigation.navigate("DetailAnnouncement")}>
        <View style={styles.container} >
          <View style={styles.header}>
            <Image source={require('../../assest/icon_user.png')} style={styles.iconUser} />
            <View style={styles.headerRight}>
              <View>
                <Text style={styles.userPost}>nama user</Text>
                <Text style={styles.datePost}>August 5, 2019</Text>
              </View>
              <View>
                <Icon name='bookmark' style={{ color: defaultColor }} size={32} />
              </View>
            </View>
          </View>
          <Text style={styles.title}>Judul tidak lebih dari sepuluh kata yang akan tampil disini</Text>
          <View>
            <Image source={require('../../assest/index.jpeg')} style={{
              resizeMode: 'cover',
              height: 200,
              width: '100%',
              alignItems: 'center',
            }} />
          </View>
          <View style={styles.footer}>
            <View>
              <Text style={styles.footerItem}>Baca lebih lanjut</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.footerItem}>2</Text>
              <Icon name='heart-empty' size={5} />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: 92 / 100 * width,
    backgroundColor: 'white',
    margin: 5,
    padding: 15,
    marginTop: 10,
    marginBottom: 10
  },
  header: {
    flexDirection: 'row',
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  iconUser: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 30
  },
  userPost: {
    fontWeight: 'bold'
  },
  datePost: {
    fontSize: 12,
    color: '#C1C1C1'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  footerItem: {
    fontSize: 12,
    color: defaultColor
  }
})