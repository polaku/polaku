import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableHighlight } from 'react-native';
import { Header, Icon } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardPolanews from '../../components/cardPolanews';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';

export default class polanews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, image: '../../assest/placeholder.jpg', title: 'polanews1' },
        { id: 2, image: '../../assest/placeholder.jpg', title: 'polanews2' },
        { id: 3, image: '../../assest/placeholder.jpg', title: 'polanews3' },
        { id: 4, image: '../../assest/placeholder.jpg', title: 'polanews4' },
        { id: 5, image: '../../assest/placeholder.jpg', title: 'polanews5' },
        { id: 6, image: '../../assest/placeholder.jpg', title: 'polanews6' },
        { id: 7, image: '../../assest/placeholder.jpg', title: 'polanews7' },
        { id: 8, image: '../../assest/placeholder.jpg', title: 'polanews8' },
        { id: 9, image: '../../assest/placeholder.jpg', title: 'polanews9' },
        { id: 10, image: '../../assest/placeholder.jpg', title: 'polanews10' },
        { id: 11, image: '../../assest/placeholder.jpg', title: 'polanews11' },
        { id: 12, image: '../../assest/placeholder.jpg', title: 'polanews12' },
        { id: 13, image: '../../assest/placeholder.jpg', title: 'polanews13' },
        { id: 14, image: '../../assest/placeholder.jpg', title: 'polanews14' },
        { id: 15, image: '../../assest/placeholder.jpg', title: 'polanews15' }]
    }
  }

  render() {
    return (
      <SafeAreaView>

        {/* HEADER - menu button drawer, title, icon sorting */}
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <Icon name='paper' style={styles.textColor} size={32} />
            <Text style={styles.textTitleHeader}>Berita</Text>
          </View>
          <Icon name='funnel' style={styles.sorting} size={32} />
        </Header>

        {/* CONTENT */}
        <View style={styles.container}>

          {/* MENU BERITA */}
          <View style={styles.title}>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Announcement')}>
              <Text style={styles.textTitleInactive}>pengumuman</Text>
            </TouchableHighlight>
            <Text style={styles.textTitleActive}> Polanews </Text>
          </View>

          {/* CONTENT POLANEWS  */}
          <FlatList
            style={styles.flatList}
            numColumns={3}
            data={this.state.data}
            renderItem={({ item }) => <CardPolanews data={item} />}
          />
        </View>

      </SafeAreaView>
    )
  }
}

polanews.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    padding: 5,
    height: '100%'
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
  textColor: {
    color: defaultTextColor
  },
  sorting: {
    zIndex: 9,
    position: 'absolute',
    top: 15,
    right: 20,
    color: defaultTextColor
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: defaultBackgroundColor,
  },
  textTitleActive: {
    fontSize: 20,
    fontWeight: 'bold',
    color: defaultColor
  },
  textTitleInactive: {
    fontSize: 15,
    fontWeight: 'bold',
    color: defaultColor
  },
  flatList:{
    backgroundColor: defaultBackgroundColor,
    paddingTop: 10,
    marginBottom: 120
  }
})
