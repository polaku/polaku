import Ruangan from '../screens/ruangan/ruangan';
import DetailRuangan from '../screens/ruangan/detailRuangan';
import { createStackNavigator } from 'react-navigation';

export default RuanganNav = createStackNavigator({
  Ruangan: { screen: Ruangan },
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

RuanganNav.navigationOptions = {
  header: null
}
