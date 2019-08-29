import RuanganSaya from '../screens/ruangan/ruanganSaya';
import DetailRuangan from '../screens/ruangan/detailRuangan';
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
})

RuanganSayaNav.navigationOptions = {
  header: null
}
