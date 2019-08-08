import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView, TouchableHighlight } from 'react-native'
import { DrawerActions } from 'react-navigation';
import { Header, Icon } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardAnnouncement from '../../components/cardAnnouncement';

export default class announcement extends Component {
  constructor(props) {
    super(props);
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
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#A6250F' }}> Pengumuman </Text>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Polanews')}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#A6250F' }}>polanews</Text>
            </TouchableHighlight>
          </View>
          <ScrollView style={{ marginBottom: 120 }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} style={{ height: 100 / 100 * width }}>
              <CardAnnouncement navigation={this.props.navigation} />
              <CardAnnouncement navigation={this.props.navigation} />
            </ScrollView>
            <View style={styles.teksPengumuman}>
              <Icon name='megaphone' size={15} style={{ marginRight: 10 }} />
              <Text>Pengumuman terbaru</Text>
            </View>
            <CardAnnouncement navigation={this.props.navigation} />
            <CardAnnouncement navigation={this.props.navigation} />

          </ScrollView>
        </View>
      </View>
    )
  }
}

announcement.navigationOptions = {
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
    justifyContent: 'space-around'
  },
  teksPengumuman: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 5
  }
})
