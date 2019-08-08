import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { Header, Icon, Tab, Tabs, ScrollableTab } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardPermintaan from '../../components/cardPermintaan';

export default class acara extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Header style={{ backgroundColor: '#A6250F', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='browsers' style={styles.textColor} size={32} />
            <Text style={{ color: '#DBA89F', marginLeft: 5, fontSize: 20 }}>Daftar Permintaan</Text>
          </View>
          <MenuButton navigation={this.props.navigation} />
          <Icon name='funnel' style={styles.sorting} size={32} />
        </Header>
        <View style={styles.container}>
          <Tabs renderTabBar={() => <ScrollableTab />} tabBarUnderlineStyle={{ backgroundColor: '#A6250F' }}>
            <Tab heading="sedang berlangsung" tabStyle={styles.tab} textStyle={{ color: '#B8B4B4' }} activeTabStyle={{ backgroundColor: '#F1F1F1' }} activeTextStyle={{ color: '#A6250F', fontWeight: 'normal' }}>
              <View style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', backgroundColor: '#F1F1F1' }}>
                <CardPermintaan navigation={this.props.navigation} />
                <CardPermintaan navigation={this.props.navigation} />
              </View>
            </Tab>
            <Tab heading="konfirmasi" tabStyle={styles.tab} textStyle={{ color: '#B8B4B4' }} activeTabStyle={{ backgroundColor: '#F1F1F1' }} activeTextStyle={{ color: '#A6250F', fontWeight: 'normal' }}>
              <View style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', backgroundColor: '#F1F1F1' }}>
                <CardPermintaan navigation={this.props.navigation} />
              </View>
            </Tab>
            <Tab heading="selesai" tabStyle={styles.tab} textStyle={{ color: '#B8B4B4' }} activeTabStyle={{ backgroundColor: '#F1F1F1' }} activeTextStyle={{ color: '#A6250F', fontWeight: 'normal' }}>
              <View style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', backgroundColor: '#F1F1F1' }}>
                <CardPermintaan navigation={this.props.navigation} />
              </View>
            </Tab>
            <Tab heading="dibatalkan" tabStyle={styles.tab} textStyle={{ color: '#B8B4B4' }} activeTabStyle={{ backgroundColor: '#F1F1F1' }} activeTextStyle={{ color: '#A6250F', fontWeight: 'normal' }}>
              <View style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', backgroundColor: '#F1F1F1' }}>
                <CardPermintaan navigation={this.props.navigation} />
              </View>
            </Tab>
          </Tabs>
        </View>
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

