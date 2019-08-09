import HubungiKami from '../screens/hubungiKami/hubungiKami';
import HubungiKamiLanjutan from '../screens/hubungiKami/hubungiKamiLanjutan';
import { createStackNavigator } from 'react-navigation';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../defaultColor';

export default HubungiKamiNav = createStackNavigator({
  HubungiKami: { screen: HubungiKami },
  HubungiKamiLanjutan: {
    screen: HubungiKamiLanjutan,
    navigationOptions: {
      title: 'HUBUNGI KAMI',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
})

HubungiKamiNav.navigationOptions = {
  header: null
}
