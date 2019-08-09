import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Icon, Input } from 'native-base';
import CardComment from '../../components/cardComment';
import { defaultColor } from '../../defaultColor';
// import { WebView } from 'react-native-webview';

export default class detailAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    this.setState({
      data: this.props.navigation.getParam('dataAnnouncement')
    })
  }

  render() {
    function getDate(args) {
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let date = new Date(args).getDate()
      let month = months[new Date(args).getMonth()]
      let years = new Date(args).getFullYear()
      return `${month} ${date}, ${years}`
    }

    return (
      <ScrollView>
        <View style={styles.container} >

          {/* UP SECTION */}
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../../../assest/icon_user.png')} style={styles.iconUser} />
            <View style={styles.headerRight}>
              <View>
                {
                  this.state.data.tbl_user && <Text style={{ fontWeight: 'bold' }}>{this.state.data.tbl_user.username}</Text>
                }
                <Text style={styles.dateComment}>{getDate(this.state.data.created_date)}</Text>
              </View>
              <View>
                <Icon name='bookmark' style={{ color: defaultColor }} size={32} />
              </View>
            </View>
          </View>
          <Text style={styles.title}>{this.state.data.title}</Text>
          <View style={styles.imagePlace}>
            <Image source={require('../../../assest/index.jpeg')} style={styles.image} />
          </View>
          {/* <WebView style={styles.description} source={{ html: this.state.data.description }} /> */}
          <Text style={styles.description}>{this.state.data.description}</Text>
          <View style={styles.footer}>
            <Text style={styles.footerItem}>2</Text>
            <Icon name='heart-empty' size={5} style={{ color: 'gray' }} />
          </View>

          <View style={styles.line}></View>

          {/* BOTTOM SECTION */}
          <View>
            <Text style={{ fontSize: 17, color: defaultColor }}>3 Komentar</Text>
            <View style={styles.userComments}>
              <Image source={require('../../../assest/icon_user.png')} style={styles.iconUserComment} />
              <View style={styles.headerRight}>
                <View style={styles.spaceInputKomen}>
                  <Input placeholder='Tambah komentar ...' style={styles.columnComment} />
                </View>
                <Icon name='send' style={{ color: defaultColor }} size={32} />
              </View>
            </View>
            <CardComment />
            <CardComment />
          </View>

        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center'
  },
  iconUserComment: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 30
  },
  iconUser: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 30
  },
  dateComment: {
    fontSize: 12,
    color: '#C1C1C1'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  line: {
    borderWidth: 1,
    width: '100%',
    borderColor: 'gray',
    marginTop: 10,
    marginBottom: 10
  },
  footer: {
    flexDirection: 'row',
    marginTop: 5
  },
  footerItem: {
    fontSize: 12,
    color: defaultColor,
    marginRight: 5,
    alignItems: 'center'
  },
  imagePlace: {
    marginTop: 10,
    marginBottom: 10
  },
  userComments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
    marginBottom: 17
  },
  columnComment: {
    borderWidth: 0.7,
    borderColor: 'gray'
  },
  image: {
    resizeMode: 'cover',
    height: 200,
    width: '100%',
    alignItems: 'center',
  },
  spaceInputKomen: {
    width: '100%',
    paddingRight: 15
  }
})