import RuanganSaya from '../screens/ruangan/ruanganSaya';
import DetailRuangan from '../screens/ruangan/detailRuangan';
import DetailBookingRoom from '../screens/ruangan/detailBookingRoom';
import { createStackNavigator } from 'react-navigation';
import { defaultTextColor, defaultColor } from '../defaultColor';

export default RuanganSayaNav = createStackNavigator({
  RuanganSaya: { screen: RuanganSaya },
  DetailRuangan: {
    screen: DetailRuangan,
    navigationOptions: {
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
  DetailBookingRoom: {
    screen: DetailBookingRoom,
    navigationOptions: {
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
})

RuanganSayaNav.navigationOptions = {
  header: null
}
