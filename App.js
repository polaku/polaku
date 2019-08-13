/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Dimensions, Text, SafeAreaView, ScrollView, Image, View } from 'react-native';
import Login from './js/screens/login';
import Announcement from './js/navigations/announcement';
import Polanews from './js/navigations/polanews';
import Acara from './js/navigations/acara';
import AcaraSaya from './js/navigations/acaraSaya';
import Ruangan from './js/navigations/ruangan';
import RuanganSaya from './js/navigations/ruanganSaya';
import HubungiKami from './js/navigations/hubungiKami';
import DaftarPermintaanNav from './js/screens/hubungiKami/daftarPermintaan'
import RuanganScreen from './js/screens/ruangan/ruangan'
import DetailRuanganScreen from './js/screens/ruangan/detailRuangan'
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { Container, Content, Header, Body, Icon } from 'native-base'

const WIDTH = Dimensions.get('window').width;

const BeritaNav = createStackNavigator({
  Berita: Announcement,
  Polanews: Polanews,
}, {
    initialRouteName: 'Berita',
  })

BeritaNav.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Icon name="paper" style={{ fontSize: 24, color: 'white' }} />
  )
}


const AcaraNav = createStackNavigator({
  Acara: Acara,
  AcaraSaya: AcaraSaya,
}, {
    initialRouteName: 'Acara'
  })

AcaraNav.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Icon name="browsers" style={{ fontSize: 24, color: 'white' }} />
  )
}


const RuanganNav = createStackNavigator({
  // Ruangan: {screen: RuanganScreen},
  // DetailRuanganScreen : {screen :DetailRuanganScreen},
  Ruangan : Ruangan,
  RuanganSaya: RuanganSaya
}, {
    initialRouteName: 'Ruangan'
  })

RuanganNav.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Icon name="room" style={{ fontSize: 24, color: 'white' }} />
  )
}


const HubungiKamiNav = createStackNavigator({
  HubungiKami: HubungiKami,
  DaftarPermintaan: { screen: DaftarPermintaanNav }
}, {
    initialRouteName: 'HubungiKami'
  })

HubungiKamiNav.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Icon name="home" style={{ fontSize: 24, color: 'white' }} />
  )
}


const CustomDrawerComponent = (props) => (
  <View style={{ flex: 1 }}>
    <View style={{ height: 150, alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
      <Image source={require('./assest/Group.png')} style={{ height: 90, width: 90 }} />
      <Image source={require('./assest/polaku.png')} style={{ height: 40, width: 90 }} />
    </View>
    <View style={{ margin: 20 }}>
      <DrawerItems {...props} />
    </View>
  </View>
)

const DrawerNav = createDrawerNavigator({
  Berita: BeritaNav,
  Acara: AcaraNav,
  Ruangan: RuanganNav,
  'Hubungi Kami': HubungiKamiNav
}, {
    drawerWidth: WIDTH * 0.7,
    drawerBackgroundColor: '#9F1616',
    drawerFontColor: 'white',
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      labelStyle: {
        color: 'white',
        fontSize: 17
      },
    }

  })

DrawerNav.navigationOptions = ({ navigation }) => ({
  header: null
});

const StackNav = createStackNavigator({
  Login: { screen: Login },
  Home: DrawerNav,
})


const App = () => {
  const Router = createAppContainer(StackNav)
  return (
    <Router />
  );
};

export default App;
