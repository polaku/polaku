import HubungiKami from '../screens/hubungiKami/hubungiKami';
import HubungiKamiDivisi1 from '../screens/hubungiKami/hubungiKamiDivisi1';
import HubungiKamiDivisi2 from '../screens/hubungiKami/hubungiKamiDivisi2';
import hubungiKamiFormQuestion from '../screens/hubungiKami/hubungiKamiFormQuestion';
import hubungiKamiFormRequest from '../screens/hubungiKami/hubungiKamiFormRequest';
import { createStackNavigator } from 'react-navigation';
import { defaultTextColor, defaultColor } from '../defaultColor';

export default HubungiKamiNav = createStackNavigator({
  HubungiKami: { screen: HubungiKami },
  
  HubungiKamiDivisi1: {
    screen: HubungiKamiDivisi1,
    navigationOptions: {
      title: 'HUBUNGI KAMI',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
  hubungiKamiFormQuestion: {
    screen: hubungiKamiFormQuestion,
    navigationOptions: {
      title: 'HUBUNGI KAMI',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
  HubungiKamiDivisi2: {
    screen: HubungiKamiDivisi2,
    navigationOptions: {
      title: 'HUBUNGI KAMI',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
  hubungiKamiFormRequest: {
    screen: hubungiKamiFormRequest,
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
