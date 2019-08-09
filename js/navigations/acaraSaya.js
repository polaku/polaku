import AcaraSaya from '../screens/acara/acaraSaya';
import DetailAcara from '../screens/acara/detailAcara';
import { createStackNavigator } from 'react-navigation';
import { defaultTextColor, defaultColor } from '../defaultColor';

export default AcaraSayaNav = createStackNavigator({
  AcaraSaya: { screen: AcaraSaya },
  DetailAcara: {
    screen: DetailAcara,
    navigationOptions: {
      title: 'Acara',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      }
    }
  },
})

AcaraSayaNav.navigationOptions = {
  header: null
}
