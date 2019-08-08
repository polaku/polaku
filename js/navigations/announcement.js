import Announcement from '../screens/announcement/announcement';
import DetailAnnouncement from '../screens/announcement/detailAnnouncement';
import { createStackNavigator } from 'react-navigation';

export default AnnouncementNav = createStackNavigator({
  Announcement: { screen: Announcement },
  DetailAnnouncement: {
    screen: DetailAnnouncement,
    navigationOptions: {
      title: 'Pengumuman',
      headerTintColor: '#DBA89F',
      headerStyle: {
        backgroundColor: '#A6250F',
      },
    }
  },
})

AnnouncementNav.navigationOptions = {
  header: null
}