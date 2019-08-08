import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, FlatList } from 'react-native'
import { Header, Icon, Tab, Tabs, ScrollableTab } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardRuangan from '../../components/cardRuangan';

export default class acara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, image: '../../assest/placeholder.jpg', title: 'Tulip 1' },
        { id: 2, image: '../../assest/placeholder.jpg', title: 'Tulip 2' },
        { id: 3, image: '../../assest/placeholder.jpg', title: 'Tulip besar' }]
    }
  }

  render() {
    return (
      <View>
        <Header style={{ backgroundColor: '#A6250F', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='business' style={styles.textColor} size={32} />
            <Text style={{ color: '#DBA89F', marginLeft: 5, fontSize: 20 }}>Ruang Rapat</Text>
          </View>
          <MenuButton navigation={this.props.navigation} />
          <Icon name='funnel' style={styles.sorting} size={32} />
        </Header>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#A6250F' }}> Ruangan </Text>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('RuanganSaya')}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#A6250F' }}> pesanan saya </Text>
            </TouchableHighlight>
          </View>
          <Tabs renderTabBar={() => <ScrollableTab tabsContainerStyle={{
            backgroundColor: '#F1F1F1',
            justifyContent: 'flex-start',
          }} />} tabBarUnderlineStyle={{ backgroundColor: '#A6250F' }}>
            <Tab heading="semua" tabStyle={styles.tab} textStyle={{ color: '#B8B4B4' }} activeTabStyle={{ backgroundColor: '#F1F1F1' }} activeTextStyle={{ color: '#A6250F', fontWeight: 'normal' }}>
              <View style={{ height: '100%', width: '100%', backgroundColor: '#F1F1F1' }}>
                <Text>Semua</Text>
              </View>
            </Tab>
            <Tab heading="P40" tabStyle={styles.tab} textStyle={{ color: '#B8B4B4' }} activeTabStyle={{ backgroundColor: '#F1F1F1' }} activeTextStyle={{ color: '#A6250F', fontWeight: 'normal' }}>
              <FlatList
                style={{
                  backgroundColor: '#F1F1F1', paddingTop: 10
                }}
                numColumns={3}
                data={this.state.data}
                renderItem={({ item }) => <CardRuangan data={item} navigation={this.props.navigation} />}
              />
            </Tab>
          </Tabs>
        </View>
        <TouchableOpacity
          style={styles.buttonAdd}
        >
          <Icon name="add" size={30} style={{ color: "#DBA89F" }} />
        </TouchableOpacity>
      </View>
    )
  }
}

acara.navigationOptions = {
  header: null
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
    padding: 5,
    height: '100%',
    marginBottom: 60
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
