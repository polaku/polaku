import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableHighlight, Image, RefreshControl } from 'react-native';
import { Header, Icon, CheckBox } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardPolanews from '../../components/cardPolanews';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { API } from '../../../config/API';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../../components/loading';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class polanews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      refreshing: false
    }
  }

  componentDidMount() {
    this.fetchData()
  }


  fetchData = async () => {
    let token = await AsyncStorage.getItem('token')
    
    let getData
    this.setState({
      loading: true
    })
    try {
      getData = await API.get('/news',
        {
          headers: { token }
        })
      this.setState({
        data: getData.data.data,
        loading: false
      })
    } catch (err) {
      this.setState({
        loading: false
      })
      if (err.message === 'Request failed with status code 403') {
        alert('Waktu login telah habis, silahkan login kembali')
        this.props.navigation.navigate('Login')
        AsyncStorage.clear()
      }else{
        alert('Fetch data failed')
      }
    }
  }

  sortingMenu = () => {
    this.setState({
      showSortingMenu: !this.state.showSortingMenu
    })
  }

  pressedCheckBox = (args) => {
    this.setState({ [args]: !this.state[args] });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData()
    this.setState({ refreshing: false });
  }

  navigateAnnoncement = () => this.props.navigation.navigate('Announcement')
  
  render() {
    return (
      <SafeAreaView>

        {/* HEADER - menu button drawer, title, icon sorting */}
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.titleHeader}>
            <Icon name='paper' style={styles.textColor} size={32} />
            <Text style={styles.textTitleHeader}>Berita</Text>
          </View>
          {/* <TouchableHighlight onPress={() => this.sortingMenu()} style={styles.sorting}>
            <MaterialCommunityIcons name='filter-outline' style={{ color: defaultTextColor }} size={30} />
          </TouchableHighlight> */}
        </Header>

        {/* {
          this.state.showSortingMenu && <View style={{
            zIndex: 9,
            position: 'absolute',
            top: 52,
            right: 0,
            width: 250,
            backgroundColor: defaultColor,
            padding: 20,
            paddingTop: 10
          }} >
            <Text style={{ color: defaultTextColor, fontSize: 18 }}>Category</Text>
            <View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <CheckBox checked={this.state.checkBoxAll} color='white' onPress={() => this.pressedCheckBox('checkBoxAll')} />
                <Text style={{ marginLeft: 17, color: 'white' }}>Semua</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <CheckBox checked={this.state.checkBoxIT} color='white' onPress={() => this.pressedCheckBox('checkBoxIT')} />
                <Text style={{ marginLeft: 17, color: 'white' }}>IT</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <CheckBox checked={this.state.checkBoxHRD} color='white' onPress={() => this.pressedCheckBox('checkBoxHRD')} />
                <Text style={{ marginLeft: 17, color: 'white' }}>HRD</Text>
              </View>
            </View>
            <Text style={{ color: defaultTextColor, fontSize: 18, marginTop: 5 }}>Sortir</Text>
            <View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <CheckBox checked={this.state.checkBoxTerbaru} color='white' onPress={() => this.pressedCheckBox('checkBoxTerbaru')} />
                <Text style={{ marginLeft: 17, color: 'white' }}>Paling Baru</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <CheckBox checked={this.state.checkBoxTerbanyak} color='white' onPress={() => this.pressedCheckBox('checkBoxTerbanyak')} />
                <Text style={{ marginLeft: 17, color: 'white' }}>Paling banyak dilihat</Text>
              </View>
            </View>
          </View>
        } */}

        {/* CONTENT */}
        <View style={styles.container}>
          {
            this.state.loading
              ? <Loading/>
              : <View>
                <View style={styles.title}>
                  <TouchableHighlight onPress={this.navigateAnnoncement} underlayColor="transparent">
                    <Text style={styles.textTitleInactive}>pengumuman</Text>
                  </TouchableHighlight>
                  <Text style={styles.textTitleActive}> Polanews </Text>
                </View>

                {/* CONTENT POLANEWS  */}
                <FlatList
                  keyExtractor={(item) => item.polanews_id}
                  style={styles.flatList}
                  numColumns={3}
                  data={this.state.data}
                  renderItem={({ item }) => <CardPolanews data={item} navigation={this.props.navigation} />}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}
                    />
                  }
                />
              </View>
          }
        </View>
      </SafeAreaView>
    )
  }
}

polanews.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    padding: 5,
    paddingBottom: 0,
    height: '100%',
    paddingBottom: 40,
  },
  header: {
    backgroundColor: defaultColor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTitleHeader: {
    color: defaultTextColor,
    marginLeft: 5,
    fontSize: 20
  },
  textColor: {
    color: defaultTextColor
  },
  sorting: {
    zIndex: 9,
    position: 'absolute',
    top: 15,
    right: 20,
    color: defaultTextColor
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: defaultBackgroundColor,
  },
  textTitleActive: {
    fontSize: 20,
    fontWeight: 'bold',
    color: defaultColor
  },
  textTitleInactive: {
    fontSize: 17,
    color: defaultColor
  },
  flatList: {
    backgroundColor: defaultBackgroundColor,
    marginBottom: 120,
    paddingBottom: 10
  }
})
