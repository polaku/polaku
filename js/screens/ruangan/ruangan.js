import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, FlatList } from 'react-native';
import { Header, Icon, Tab, Tabs, ScrollableTab } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardRuangan from '../../components/cardRuangan';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';

export default class acara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, image: '../../assest/placeholder.jpg', title: 'Tulip 1' },
        { id: 2, image: '../../assest/placeholder.jpg', title: 'Tulip 2' },
        { id: 3, image: '../../assest/placeholder.jpg', title: 'Tulip besar' }]
    }
  }

  render() {
    return (
      <View>

        {/* HEADER - menu button drawer, title, icon sorting */}
        <Header style={styles.header}>
          <View style={styles.titleHeader}>
            <Icon name='business' style={styles.textColor} size={32} />
            <Text style={styles.textTitleHeader}>Ruang Rapat</Text>
          </View>
          <MenuButton navigation={this.props.navigation} />
          <Icon name='funnel' style={styles.sorting} size={32} />
        </Header>

        {/* CONTENT */}
        <View style={styles.container}>

          {/* MENU ACARA */}
          <View style={styles.title}>
            <Text style={styles.textTitleActive}> Ruangan </Text>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('RuanganSaya')}>
              <Text style={styles.textTitleInactive}> pesanan saya </Text>
            </TouchableHighlight>
          </View>

          <Tabs renderTabBar={() => <ScrollableTab tabsContainerStyle={styles.tabsContainerStyle} />} tabBarUnderlineStyle={{ backgroundColor: defaultColor }}>
            <Tab heading="semua"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
              activeTextStyle={styles.activeTextStyle}>
              <View style={styles.containerInTab}>
                <Text>Semua</Text>
              </View>
            </Tab>
            <Tab heading="P40"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
              activeTextStyle={styles.activeTextStyle}>
              <View style={styles.containerInTab}>
                <FlatList
                  style={styles.flatList}
                  numColumns={3}
                  data={this.state.data}
                  renderItem={({ item }) => <CardRuangan data={item} navigation={this.props.navigation} />}
                />
              </View>
            </Tab>
          </Tabs>
        </View>

        {/* BUTTON ADD */}
        <TouchableOpacity style={styles.buttonAdd} >
          <Icon name="add" size={30} style={{ color: defaultTextColor }} />
        </TouchableOpacity>
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
    backgroundColor: defaultBackgroundColor,
    padding: 5,
    height: '100%',
    marginBottom: 60
  },
  header: {
    backgroundColor: defaultColor,
    flexDirection: 'row',
    alignItems: 'center'
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
  tab: {
    backgroundColor: defaultBackgroundColor
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
    backgroundColor: defaultColor,
    borderRadius: 130,
    paddingTop: 10
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
    fontSize: 18,
    fontWeight: 'bold',
    color: defaultColor
  },
  textTitleInactive: {
    fontSize: 15,
    fontWeight: 'bold',
    color: defaultColor
  },
  activeTextStyle: {
    color: defaultColor,
    fontWeight: 'normal'
  },
  tabsContainerStyle: {
    backgroundColor: defaultBackgroundColor,
    justifyContent: 'flex-start',
  },
  flatList: {
    backgroundColor: defaultBackgroundColor,
    paddingTop: 10,
    height: '100%'
  }
})
