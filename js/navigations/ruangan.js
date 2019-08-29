import Ruangan from '../screens/ruangan/ruangan';
import DetailRuangan from '../screens/ruangan/detailRuangan';
import { createStackNavigator } from 'react-navigation';
import { defaultTextColor, defaultColor } from '../defaultColor';

export default RuanganNav = createStackNavigator({
  Ruangan: { screen: Ruangan },
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

RuanganNav.navigationOptions = {
  header: null
}
