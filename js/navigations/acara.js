import Acara from '../screens/acara/acara';
import DetailAcara from '../screens/acara/detailAcara';
import { createStackNavigator } from 'react-navigation';
import { defaultTextColor, defaultColor } from '../defaultColor';

export default AcaraNav = createStackNavigator({
  Acara: { screen: Acara },
  DetailAcara: {
    screen: DetailAcara,
    navigationOptions: {
      title: 'Acara',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
})

AcaraNav.navigationOptions = {
  header: null
}
