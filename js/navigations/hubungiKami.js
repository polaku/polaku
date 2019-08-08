import HubungiKami from '../screens/hubungiKami/hubungiKami';
import HubungiKamiLanjutan from '../screens/hubungiKami/hubungiKamiLanjutan';
import { createStackNavigator } from 'react-navigation';

export default HubungiKamiNav = createStackNavigator({
  HubungiKami: { screen: HubungiKami },
  HubungiKamiLanjutan: {
    screen: HubungiKamiLanjutan,
    navigationOptions: {
      title: 'HUBUNGI KAMI',
      headerTintColor: '#DBA89F',
      headerStyle: {
        backgroundColor: '#A6250F',
      },
    }
  },
})

HubungiKamiNav.navigationOptions = {
  header: null
}
