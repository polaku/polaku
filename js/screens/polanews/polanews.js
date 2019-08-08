import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, FlatList, TouchableHighlight } from 'react-native'
import { Header, Icon } from 'native-base';
import MenuButton from '../../components/menuButton';
import { ScrollView } from 'react-native-gesture-handler';
import CardPolanews from '../../components/cardPolanews';

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
      <View>
        <Header style={{ backgroundColor: '#A6250F', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='paper' style={styles.textColor} size={32} />
            <Text style={{ color: '#DBA89F', marginLeft: 5, fontSize: 20 }}>Berita</Text>
          </View>
          <MenuButton navigation={this.props.navigation} />
          <Icon name='funnel' style={styles.sorting} size={32} />
        </Header>
        <View style={styles.container}>

          <View style={styles.title}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#A6250F' }}> Polanews </Text>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Announcement')}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#A6250F' }}>pengumuman</Text>
            </TouchableHighlight>
          </View>
          <FlatList
            style={{
              backgroundColor: '#F1F1F1', paddingTop: 10,
              marginBottom: 120
            }}
            numColumns={3}
            data={this.state.data}
            renderItem={({ item }) => <CardPolanews data={item} />}
          />
          {/* </ScrollView> */}
        </View>
      </View>
    )
  }
}

polanews.navigationOptions = {
  header: null
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
    padding: 5,
    height: '100%'
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
  }
})
