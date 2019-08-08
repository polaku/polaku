import RuanganSaya from '../screens/ruangan/ruanganSaya';
import DetailRuangan from '../screens/ruangan/detailRuangan';
import { createStackNavigator } from 'react-navigation';

export default RuanganSayaNav = createStackNavigator({
  RuanganSaya: { screen: RuanganSaya },
  DetailRuangan: {
    screen: DetailRuangan,
    navigationOptions: {
      title: 'Ruangan',
      headerTintColor: '#DBA89F',
      headerStyle: {
        backgroundColor: '#A6250F',
      },
    }
  },
})

RuanganSayaNav.navigationOptions = {
  header: null
}
