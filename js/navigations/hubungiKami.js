import HubungiKamiPertanyaan from '../screens/hubungiKami/menuPertanyaan';
import HubungiKamiPermintaan from '../screens/hubungiKami/menuPermintaan';
import DashboardPertanyaan from '../screens/hubungiKami/dashboardHubungiKami';
import FormQuestion from '../screens/hubungiKami/formQuestion';
import FormRequest from '../screens/hubungiKami/formRequest';
import { createStackNavigator } from 'react-navigation';
import { defaultTextColor, defaultColor } from '../defaultColor';

export default HubungiKamiNav = createStackNavigator({
  HubungiKami: { screen: DashboardPertanyaan },
  Pertanyaan: {
    screen: HubungiKamiPertanyaan,
    navigationOptions: {
      title: 'HUBUNGI KAMI',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
  FormQuestion: {
    screen: FormQuestion,
    navigationOptions: {
      title: 'HUBUNGI KAMI',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
  Permintaan: {
    screen: HubungiKamiPermintaan,
    navigationOptions: {
      title: 'HUBUNGI KAMI',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
  FormRequest: {
    screen: FormRequest,
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
