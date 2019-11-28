/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Dimensions, Image, View, ScrollView } from 'react-native';
import { Provider } from 'react-redux'
import store from './js/store'
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { defaultColor, defaultTextColor } from './js/defaultColor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from './js/screens/login';
import Announcement from './js/navigations/announcement';
import Polanews from './js/navigations/polanews';
import Acara from './js/navigations/acara';
import AcaraSaya from './js/navigations/acaraSaya';
import Ruangan from './js/navigations/ruangan';
import RuanganSaya from './js/navigations/ruanganSaya';
import HubungiKami from './js/navigations/hubungiKami';
import CreateAcaraScreen from './js/screens/acara/createAcara';
import CreateBookingRoomScreen from './js/screens/ruangan/createBookingRoom';
import DaftarPermintaanNav from './js/screens/hubungiKami/daftarHubungiKami'
import DaftarTugasNav from './js/screens/hubungiKami/daftarTugas'
import DetailHubungiKami from './js/screens/hubungiKami/detailHubungiKami';
import DaftarRespon from './js/screens/hubungiKami/responPermintaanHRD';
import DetailPermintaan from './js/screens/hubungiKami/detailPermintaanHRD';
import PembatalanPermintaan from './js/screens/hubungiKami/pembatalanPermintaan';
import MenuPermintaanHRD from './js/screens/hubungiKami/menuPermintaanHRD';
import FormRequestHRD from './js/screens/hubungiKami/formRequestHRD';
import Profil from './js/screens/profil/profil';
import EditProfil from './js/screens/profil/editProfil';
import FirstLogin from './js/screens/firstLogin';
import ForgetPassword from './js/screens/forgetPassword';
import SplashScreen from './js/screens/splashScreen';
import KritikSaranScreen from './js/screens/kritiksaran';

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
  CreateBookingRoom: { screen: CreateBookingRoomScreen }
}, {
  initialRouteName: 'Ruangan'
})

RuanganNav.navigationOptions = {
  drawerIcon: () => (
    <FontAwesome5 name="building" style={{ color: 'white' }} size={28} />
  )
}

const HubungiKamiListNav = createStackNavigator({
  'Daftar Hubungi Kami': { screen: DaftarPermintaanNav },
  DetailHubungiKami: {
    screen: DetailHubungiKami,
    navigationOptions: {
      title: 'HUBUNGI KAMI',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
  DetailPermintaan: {
    screen: DetailPermintaan,
    navigationOptions: {
      title: 'HUBUNGI KAMI',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  }
}, {
  initialRouteName: 'Daftar Hubungi Kami',
})

HubungiKamiListNav.navigationOptions = {
  header: null
}

const TugasListNav = createStackNavigator({
  DaftarTugas: { screen: DaftarTugasNav },
  DetailTugas: {
    screen: DetailHubungiKami,
    navigationOptions: {
      title: 'Detail Tugas',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  }
}, {
  initialRouteName: 'DaftarTugas',
})

TugasListNav.navigationOptions = {
  header: null
}

const PermintaanNav = createStackNavigator({
  DaftarRespon: { screen: DaftarRespon },
  DetailPermintaan: {
    screen: DetailPermintaan,
    navigationOptions: {
      title: 'Detail Permintaan',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
  PembatalanPermintaan: {
    screen: PembatalanPermintaan,
    navigationOptions: {
      title: 'Pembatalan',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
}, {
  initialRouteName: 'DaftarRespon',
})

PermintaanNav.navigationOptions = {
  header: null
}

const HubungiKamiNav = createStackNavigator({
  HubungiKami: HubungiKami,
  DaftarPermintaan: HubungiKamiListNav,
  DaftarTugas: TugasListNav,
  DaftarRespons: PermintaanNav,
  DetailPermintaan: {
    screen: DetailPermintaan,
    navigationOptions: {
      title: 'Detail Permintaan',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
  DetailHubungiKami: {
    screen: DetailHubungiKami,
    navigationOptions: {
      title: 'Detail Permintaan',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
  PembatalanPermintaan: {
    screen: PembatalanPermintaan,
    navigationOptions: {
      title: 'Pembatalan',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
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
    <MaterialIcons name="perm-identity" style={{ color: 'white' }} size={29} />
  )
}

const HRNav = createStackNavigator({
  HR: {
    screen: MenuPermintaanHRD
  },
  FormRequestHRD: {
    screen: FormRequestHRD,
    navigationOptions: {
      title: 'HUBUNGI KAMI',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
}, {
  initialRouteName: 'HR'
})

HRNav.navigationOptions = {
  drawerIcon: () => (
    <FontAwesome name="group" style={{ color: 'white' }} size={22} />
  )
}

const KritikSaranNav = createStackNavigator({
  'Kritik Saran': { screen: KritikSaranScreen }
})

KritikSaranNav.navigationOptions = {
  drawerIcon: () => (
    <MaterialCommunityIcons name="message-draw" style={{ color: 'white' }} size={25} />
  )
}

const CustomDrawerComponent = (props) => {
  return <View style={{ flex: 1 }}>
    <View style={{ height: 150, alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
      <Image source={{ uri: "asset:/polagroup_polaku_icon.png" }} style={{ height: 90, width: 90 }} />
      <Image source={{ uri: "asset:/polagroup_polaku.png" }} style={{ height: 27, width: 90, marginTop: 10 }} />
    </View>
    <ScrollView style={{ margin: 20 }}>
      <DrawerItems {...props} />
    </ScrollView>
  </View>
}

const DrawerNav = createDrawerNavigator({
  Berita: BeritaNav,
  Acara: AcaraNav,
  Ruangan: RuanganNav,
  'Hubungi Kami': HubungiKamiNav,
  HR: HRNav,
  'Kritik Saran': KritikSaranNav,
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


const LoginNav = createStackNavigator({
  Login: { screen: Login },
  ForgetPassword: { screen: ForgetPassword },
}, {
  initialRouteName: 'Login',
})

LoginNav.navigationOptions = {
  header: null
}

const StackNav = createStackNavigator({
  SplashScreen: { screen: SplashScreen },
  Login: LoginNav,
  Home: DrawerNav,
  FirstLogin: { screen: FirstLogin }
}, {
  initialRouteName: 'SplashScreen'
})


const App = () => {
  const Router = createAppContainer(StackNav)
  return <Provider store={store}><Router /></Provider>
};

export default App;
