import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableHighlight, Fragment } from 'react-native';
import { Header, Icon } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardAnnouncement from '../../components/cardAnnouncement';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';
import { API } from '../../../config/API';

export default class announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    let getData
    this.setState({
      loading: true
    })
    try {
      getData = await API.get('/announcement',
        {
          headers: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3MzEsImlhdCI6MTU2NTY1NzkwMywiZXhwIjoxNTY1NzAxMTAzfQ.f2zqusZ_wR3Sg94HrdCWu6VMadqlQUZi8tnMpFedtDg' }
        })
      this.setState({
        data: getData.data.data,
        loading: false
      })
    } catch (err) {
      this.setState({
        loading: false
      })
      alert('Fetch data failed')
    }
  }

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
          <Icon name='funnel' style={styles.sorting} size={32} />
        </Header>

        {/* CONTENT */}
        <View style={styles.container}>
          {
            this.state.loading
              ? <Text>Loading</Text>
              : <View>
                < View style={styles.title}>
                  <Text style={styles.textTitleActive}> Pengumuman </Text>
                  <TouchableHighlight onPress={() => this.props.navigation.navigate('Polanews')}>
                    <Text style={styles.textTitleInactive}>polanews</Text>
                  </TouchableHighlight>
                </View>

                <ScrollView style={{ marginBottom: 160 }}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                    {
                      this.state.data.map((el, index) => (<CardAnnouncement navigation={this.props.navigation} data={el} key={index} />
                      ))
                    }
                  </ScrollView>
                  <View style={styles.teksPengumuman}>
                    <Icon name='megaphone' size={15} style={{ marginRight: 10 }} />
                    <Text>Pengumuman terbaru</Text>
                  </View>
                  {
                    this.state.data.map((el, index) => (<CardAnnouncement navigation={this.props.navigation} data={el} key={index} />
                    ))
                  }
                </ScrollView>
              </View>
          }
        </View>
      </SafeAreaView>
    )
  }
}

announcement.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
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
  textTitleActive: {
    fontSize: 20,
    fontWeight: 'bold',
    color: defaultColor
  },
  textTitleInactive: {
    fontSize: 15,
    fontWeight: 'bold',
    color: defaultColor
  },
  container: {
    backgroundColor: defaultBackgroundColor,
    padding: 5,
    height: '100%',
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
    justifyContent: 'space-around'
  },
  teksPengumuman: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 5
  }
})
