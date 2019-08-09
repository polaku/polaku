import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Header, Icon, Tab, Tabs, ScrollableTab } from 'native-base';
import MenuButton from '../../components/menuButton';
import CardPermintaan from '../../components/cardPermintaan';
import { defaultTextColor, defaultColor, defaultBackgroundColor } from '../../defaultColor';

export default class acara extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <SafeAreaView>

        {/* HEADER - menu button drawer, title, icon sorting */}
        <Header style={styles.header}>
          <View style={styles.titleHeader}>
            <Icon name='browsers' style={{ color: defaultColor }} size={32} />
            <Text style={styles.textTitleHeader}>Daftar Permintaan</Text>
          </View>
          <MenuButton navigation={this.props.navigation} />
          <Icon name='funnel' style={styles.sorting} size={32} />
        </Header>

        {/* CONTENT */}
        <View style={styles.container}>

          <Tabs renderTabBar={() => <ScrollableTab />} tabBarUnderlineStyle={{ backgroundColor: defaultColor }}>
            <Tab heading="sedang berlangsung"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
              activeTextStyle={styles.activeTextStyle}>
              <View style={styles.containerItem}>
                <CardPermintaan navigation={this.props.navigation} />
                <CardPermintaan navigation={this.props.navigation} />
              </View>
            </Tab>
            <Tab heading="konfirmasi"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
              activeTextStyle={styles.activeTextStyle}>
              <View style={styles.containerItem}>
                <CardPermintaan navigation={this.props.navigation} />
              </View>
            </Tab>
            <Tab heading="selesai"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
              activeTextStyle={styles.activeTextStyle}>
              <View style={styles.containerItem}>
                <CardPermintaan navigation={this.props.navigation} />
              </View>
            </Tab>
            <Tab heading="dibatalkan"
              tabStyle={styles.tab}
              textStyle={{ color: defaultColor }}
              activeTabStyle={{ backgroundColor: defaultBackgroundColor }}
              activeTextStyle={styles.activeTextStyle}>
              <View style={styles.containerItem}>
                <CardPermintaan navigation={this.props.navigation} />
              </View>
            </Tab>
          </Tabs>
        </View>

      </SafeAreaView>
    )
  }
}

acara.navigationOptions = {
  header: null
};

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
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTitleHeader: {
    color: defaultTextColor,
    marginLeft: 5,
    fontSize: 20
  },
  sorting: {
    zIndex: 9,
    position: 'absolute',
    top: 15,
    right: 20,
    color: '#DBA89F'
  },
  tab: {
    backgroundColor: '#F1F1F1'
  },
  activeTextStyle: {
    color: '#A6250F',
    fontWeight: 'normal'
  },
  containerItem: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: defaultBackgroundColor
  }
})

