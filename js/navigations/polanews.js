import Polanews from '../screens/polanews/polanews';
import DetailPolanews from '../screens/polanews/detailPolanews';
import { createStackNavigator } from 'react-navigation';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../defaultColor';

export default PolanewsNav = createStackNavigator({
  Polanews: { screen: Polanews },
  DetailPolanews: {
    screen: DetailPolanews,
    navigationOptions: {
      title: 'Polanews',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
})

PolanewsNav.navigationOptions = {
  header: null
}