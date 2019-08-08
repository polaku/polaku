import Acara from '../screens/acara/acara';
import DetailAcara from '../screens/acara/detailAcara';
import { createStackNavigator } from 'react-navigation';

export default AcaraNav = createStackNavigator({
  Acara: { screen: Acara },
  DetailAcara: {
    screen: DetailAcara,
    navigationOptions: {
      title: 'Acara',
      headerTintColor: '#DBA89F',
      headerStyle: {
        backgroundColor: '#A6250F',
      },
    }
  },
})

AcaraNav.navigationOptions = {
  header: null
}
