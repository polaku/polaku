import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, FlatList } from 'react-native'
import { Header, Icon } from 'native-base';
import MenuButton from '../../components/menuButton';

export default class acara extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { id: 1, image: '../../assest/placeholder.jpg', title: 'IT' },
        { id: 2, image: '../../assest/placeholder.jpg', title: 'HRD' },
        { id: 3, image: '../../assest/placeholder.jpg', title: 'DESAIN' },
        { id: 4, image: '../../assest/placeholder.jpg', title: 'LAINNYA' }]
    }
  }

  render() {
    return (
      <View>
        <Header style={{ backgroundColor: '#A6250F', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='browsers' style={styles.textColor} size={32} />
            <Text style={{ color: '#DBA89F', marginLeft: 5, fontSize: 20 }}>HUBUNGI KAMI</Text>
          </View>
          <MenuButton navigation={this.props.navigation} />
        </Header>
        <View style={styles.container} >
          <TouchableHighlight onPress={() => this.props.navigation.navigate('DaftarPermintaan')} style={{ alignSelf: 'flex-end', padding: 10, marginRight: 10, height: 50, justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#A6250F' }}> daftar permintaan </Text>
          </TouchableHighlight>
          <View style={{ backgroundColor: 'white', height: '100%', padding: 10 }}>
            <Text style={{ fontSize: 18 }}>Ada yang bisa kami bantu?</Text>
            <FlatList
              style={{
                paddingTop: 10,
                marginBottom: 120
              }}
              numColumns={3}
              data={this.state.data}
              renderItem={({ item }) => <TouchableHighlight onPress={() => this.props.navigation.navigate('HubungiKamiLanjutan')}><View style={{ width: 1 / 3 * width - 15, height: 1 / 3 * width, backgroundColor: 'gray', borderRadius: 20, justifyContent: 'center', alignItems: 'center', margin: 5, paddingTop: 5 }}>
                <Text style={{ color: 'white' }}>{item.title}</Text>
              </View></TouchableHighlight>}
            />
          </View>
        </View>
      </View>
    )
  }
}

acara.navigationOptions = {
  header: null
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
    height: '100%',
    marginBottom: 60
  },
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 15,
    left: 20
  },
  textColor: {
    color: '#DBA89F'
  },
  sorting: {
    zIndex: 9,
    position: 'absolute',
    top: 15,
    right: 20,
    color: '#DBA89F'
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F1F1F1',
  },
  teksPengumuman: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 5
  },
  tab: {
    backgroundColor: '#F1F1F1'
  },
  buttonAdd: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    width: 100,
    position: 'absolute',
    bottom: 60,
    right: 1 / 2 * width - 50,
    height: 100,
    backgroundColor: '#A6250F',
    borderRadius: 130,
    paddingTop: 10
  }
})

