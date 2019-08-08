import Polanews from '../screens/polanews/polanews';
import DetailPolanews from '../screens/polanews/detailPolanews';
import { createStackNavigator } from 'react-navigation';

export default PolanewsNav = createStackNavigator({
  Polanews: { screen: Polanews },
  DetailPolanews: {
    screen: DetailPolanews,
    navigationOptions: {
      title: 'Polanews',
      headerTintColor: '#DBA89F',
      headerStyle: {
        backgroundColor: '#A6250F',
      },
    }
  },
})

PolanewsNav.navigationOptions = {
  header: null
}