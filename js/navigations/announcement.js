import Announcement from '../screens/announcement/announcement';
import DetailAnnouncement from '../screens/announcement/detailAnnouncement';
import { createStackNavigator } from 'react-navigation';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../defaultColor';

export default AnnouncementNav = createStackNavigator({
  Announcement: { screen: Announcement },
  DetailAnnouncement: {
    screen: DetailAnnouncement,
    navigationOptions: {
      title: 'Pengumuman',
      headerTintColor: defaultTextColor,
      headerStyle: {
        backgroundColor: defaultColor,
      },
    }
  },
})

AnnouncementNav.navigationOptions = {
  header: null
}