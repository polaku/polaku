import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableHighlight } from 'react-native';
import { Text, Icon } from 'native-base';
import { defaultColor } from '../defaultColor';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class cardAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    }
  }
  componentDidMount() {
    // console.log(this.props.data)
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
      <TouchableHighlight onPress={() => this.props.navigation.navigate("DetailAnnouncement", {
        dataAnnouncement: this.props.data
      })} underlayColor="transparent">
        <View>
          {
            this.props.data && <View style={styles.container} >
              <View style={styles.header}>
                {/* <Image source={{uri: 'http://localhost:3000/public/uploads/attachment-1564468045860'}} style={styles.iconUser} /> */}
                <Image source={require('../../assest/icon_user.png')} style={styles.iconUser} />
                <View style={styles.headerRight}>
                  {
                    this.props.data.tbl_user && <View>
                      <Text style={styles.userPost}>{this.props.data.tbl_user.tbl_account_detail.fullname}</Text>
                      <Text style={styles.datePost}>{getDate(this.props.data.created_at)}</Text>
                    </View>
                  }

                  <View>
                    {/* <FontAwesome name='bookmark' style={{ color: defaultColor }} size={32} /> */}
                    {/* <FontAwesome name='bookmark-o' style={{ color: defaultColor }} size={32} /> */}
                  </View>
                </View>
              </View>
              <Text style={styles.title}>{this.props.data.title}</Text>

              <View>
                <Image source={{ uri: this.props.data.thumbnail }} style={{
                  resizeMode: 'cover',
                  height: 200,
                  width: '100%',
                  alignItems: 'center',
                }} />
              </View>
              <View style={styles.footer}>
                <View>
                  <Text style={styles.footerItem}>Baca lebih lanjut</Text>
                </View>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.footerItem}>2</Text>
                  <MaterialCommunityIcons name='heart' style={{ color: defaultColor }} size={20} />
                  // <MaterialCommunityIcons name='heart-outline' style={{ color: defaultColor }} size={20} /> 
                 </View> */}
              </View>
            </View>
          }
        </View>
      </TouchableHighlight>
    )
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5
  },
  header: {
    flexDirection: 'row',
    margin: 15
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  iconUser: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 30
  },
  userPost: {
    fontWeight: 'bold'
  },
  datePost: {
    fontSize: 12,
    color: '#C1C1C1'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 15,
    marginTop: 5
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    marginTop: 5,
    alignItems: 'center'
  },
  footerItem: {
    fontSize: 12,
    color: defaultColor,
    marginRight: 5
  }
})