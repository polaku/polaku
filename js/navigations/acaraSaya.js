import AcaraSaya from '../screens/acara/acaraSaya';
import DetailAcara from '../screens/acara/detailAcara';
import { createStackNavigator } from 'react-navigation';

export default AcaraSayaNav = createStackNavigator({
  AcaraSaya: { screen: AcaraSaya },
  DetailAcara: {
    screen: DetailAcara,
    navigationOptions: {
      title: 'Acara',
      headerTintColor: '#DBA89F',
      headerStyle: {
        backgroundColor: '#A6250F',
      }
    }
  },
})

AcaraSayaNav.navigationOptions = {
  header: null
}
