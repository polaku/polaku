/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Dimensions } from 'react-native';
import Login from './js/screens/login';
import Announcement from './js/navigations/announcement';
import Polanews from './js/navigations/polanews';
import Acara from './js/navigations/acara';
import AcaraSaya from './js/navigations/acaraSaya';
import Ruangan from './js/navigations/ruangan';
import RuanganSaya from './js/navigations/ruanganSaya';
import HubungiKami from './js/navigations/hubungiKami';
import DaftarPermintaanNav from './js/screens/hubungiKami/daftarPermintaan'
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';

const WIDTH = Dimensions.get('window').width;

const BeritaNav = createStackNavigator({
  Berita: Announcement,
  Polanews: Polanews,
}, {
    initialRouteName: 'Berita'
  })

const AcaraNav = createStackNavigator({
  Acara: Acara,
  AcaraSaya: AcaraSaya,
}, {
    initialRouteName: 'Acara'
  })

const RuanganNav = createStackNavigator({
  Ruangan: Ruangan,
  RuanganSaya: RuanganSaya
}, {
    initialRouteName: 'Ruangan'
  })

const HubungiKamiNav = createStackNavigator({
  HubungiKami: HubungiKami,
  DaftarPermintaan: { screen: DaftarPermintaanNav }
}, {
    initialRouteName: 'HubungiKami'
  })

const DrawerNav = createDrawerNavigator({
  Berita: BeritaNav,
  Acara: AcaraNav,
  Ruangan: RuanganNav,
  'Hubungi Kami': HubungiKamiNav
}, {
    drawerWidth: WIDTH * 0.7,
    drawerBackgroundColor: '#9F1616',
    drawerColor: '#DBA89F'
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
