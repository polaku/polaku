/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Dimensions, Text, SafeAreaView, Image, View, Button } from 'react-native';
import Login from './js/screens/login';
import Announcement from './js/navigations/announcement';
import Polanews from './js/navigations/polanews';
import Acara from './js/navigations/acara';
import AcaraSaya from './js/navigations/acaraSaya';
import Ruangan from './js/navigations/ruangan';
import RuanganSaya from './js/navigations/ruanganSaya';
import HubungiKami from './js/navigations/hubungiKami';
import DaftarPermintaanNav from './js/screens/hubungiKami/daftarPermintaan'
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Provider } from 'react-redux'
import store from './js/store'
import CreateAcaraScreen from './js/screens/acara/createAcara';
import CreateRuanganScreen from './js/screens/ruangan/createRuangan';
import DetailHubungiKami from './js/screens/hubungiKami/detailHubungiKami';
import { defaultColor, defaultTextColor } from './js/defaultColor';
import Profil from './js/screens/profil/profil';
import EditProfil from './js/screens/profil/editProfil';
import FirstLogin from './js/screens/firstLogin';

const WIDTH = Dimensions.get('window').width;

const BeritaNav = createStackNavigator({
  Berita: Announcement,
  Polanews: Polanews,
}, {
  initialRouteName: 'Berita',
})

BeritaNav.navigationOptions = {
  drawerIcon: () => (
    <FontAwesome name='newspaper-o' style={{ color: 'white' }} size={21} />
  )
}


const AcaraNav = createStackNavigator({
  Acara: Acara,
  AcaraSaya: AcaraSaya,
  CreateAcara: { screen: CreateAcaraScreen }
}, {
  initialRouteName: 'Acara'
})

AcaraNav.navigationOptions = {
  drawerIcon: () => (
    <MaterialIcons name='event' style={{ color: 'white' }} size={28} />
  )
}


const RuanganNav = createStackNavigator({
  Ruangan: Ruangan,
  RuanganSaya: RuanganSaya,
  CreateRuangan: { screen: CreateRuanganScreen }
}, {
  initialRouteName: 'Ruangan'
})

RuanganNav.navigationOptions = {
  drawerIcon: () => (
    <FontAwesome5 name="building" style={{ color: 'white' }} size={28} />
  )
}

const HubungiKamiListNav = createStackNavigator({
  DaftarPermintaan: { screen: DaftarPermintaanNav },
  DetailHubungiKami: {
    screen: DetailHubungiKami,
    navigationOptions: {
      title: 'HUBUNGI KAMI',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  }
}, {
  initialRouteName: 'DaftarPermintaan',
})

HubungiKamiListNav.navigationOptions = {
  header: null
}

const HubungiKamiNav = createStackNavigator({
  HubungiKami: HubungiKami,
  DaftarPermintaan: HubungiKamiListNav
}, {
  initialRouteName: 'HubungiKami'
})

HubungiKamiNav.navigationOptions = {
  drawerIcon: () => (
    <FontAwesome name="send-o" style={{ color: 'white' }} size={24} />
  )
}

const ProfilNav = createStackNavigator({
  Profil: { screen: Profil },
  EditProfil: { screen: EditProfil }
}, {
  initialRouteName: 'Profil'
})

ProfilNav.navigationOptions = {
  drawerIcon: () => (
    <MaterialIcons name="perm-identity" style={{ color: 'white' }} size={30} />
  )
}

const CustomDrawerComponent = (props) => {
  return <View style={{ flex: 1 }}>
    <View style={{ height: 150, alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
      <Image source={require('./assest/Group.png')} style={{ height: 90, width: 90 }} />
      <Image source={require('./assest/polaku.png')} style={{ height: 40, width: 90 }} />
    </View>
    <View style={{ margin: 20 }}>
      <DrawerItems {...props} />
    </View>
  </View>
}

const DrawerNav = createDrawerNavigator({
  Berita: BeritaNav,
  Acara: AcaraNav,
  Ruangan: RuanganNav,
  'Hubungi Kami': HubungiKamiNav,
  Profil: ProfilNav
}, {
  initialRouteName: 'Berita',
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
  FirstLogin: { screen: FirstLogin }
}, {
  initialRouteName: 'Login'
})


const App = () => {
  const Router = createAppContainer(StackNav)
  return <Provider store={store}><Router /></Provider>
};

export default App;
