import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, SafeAreaView, FlatList } from 'react-native';
import { Header, Icon } from 'native-base';
import MenuButton from '../../components/menuButton';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';

export default class acara extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { id: 1, image: '../../assest/placeholder.jpg', title: 'IT' },
        { id: 2, image: '../../assest/placeholder.jpg', title: 'HRD' },
        { id: 3, image: '../../assest/placeholder.jpg', title: 'DESAIN' },
        { id: 4, image: '../../assest/placeholder.jpg', title: 'LAINNYA' }]
    }
  }

  render() {
    return (
      <SafeAreaView>

        {/* HEADER - menu button drawer, title */}
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <Icon name='browsers' style={styles.textColor} size={32} />
            <Text style={styles.textTitleHeader}>HUBUNGI KAMI</Text>
          </View>
        </Header>

        {/* CONTENT */}
        <View style={styles.container} >

          {/* MENU HUBUNGI KAMI */}
          <TouchableHighlight onPress={() => this.props.navigation.navigate('DaftarPermintaan')} style={{ alignSelf: 'flex-end', padding: 10, marginRight: 10, height: 50, justifyContent: 'center' }}>
            <Text style={styles.textTitleInactive}> daftar permintaan </Text>
          </TouchableHighlight>


          <View style={{ backgroundColor: 'white', height: '100%', padding: 10 }}>
            <Text style={{ fontSize: 18 }}>Ada yang bisa kami bantu?</Text>
            <FlatList
              style={styles.flatList}
              numColumns={3}
              data={this.state.data}
              renderItem={({ item }) => <TouchableHighlight onPress={() => this.props.navigation.navigate('HubungiKamiLanjutan')}>
                <View style={styles.containerItem}>
                  <Text style={{ color: 'white' }}>{item.title}</Text>
                </View>
              </TouchableHighlight>}
            />
          </View>
        </View>

      </SafeAreaView>
    )
  }
}

acara.navigationOptions = {
  header: null
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    height: '100%',
    marginBottom: 60
  },
  header:{
    backgroundColor: defaultColor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleHeader:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTitleHeader:{
    color: defaultTextColor,
    marginLeft: 5,
    fontSize: 20
  },
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 15,
    left: 20
  },
  textColor: {
    color: defaultTextColor
  },
  flatList: {
    paddingTop: 10,
    marginBottom: 120
  },
  containerItem: {
    width: 1 / 3 * width - 15,
    height: 1 / 3 * width,
    backgroundColor: 'gray',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    paddingTop: 5
  },
  textTitleInactive: {
    fontSize: 15,
    fontWeight: 'bold',
    color: defaultColor
  },
})

