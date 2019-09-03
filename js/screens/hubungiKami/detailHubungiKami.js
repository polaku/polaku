import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, SafeAreaView, FlatList } from 'react-native';
import { defaultColor, defaultBackgroundColor } from '../../defaultColor';

export default class hubungiKami extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      timeline: [],
      status: ''
    }
  }

  componentDidMount() {
    let temp = this.props.navigation.getParam('data')
    let tempTimeline = []

    temp.status === 'cancel' && tempTimeline.push({ status: 'Cancel', time: temp.cancel_date })

    temp.status === 'done' && tempTimeline.push({ status: 'Done', time: temp.done_date })

    temp.done_date && tempTimeline.push({ status: 'Confirmation' })

    temp.taken_date && tempTimeline.push({ status: 'On Going', time: temp.taken_date })

    temp.assigned_date && tempTimeline.push({ status: 'Assigned', time: temp.assigned_date })

    tempTimeline.push({ status: 'Awaiting reply', time: temp.created_at })


    this.setState({
      data: temp,
      timeline: tempTimeline,
      status: tempTimeline[0].status
    })
  }

  render() {
    return (
      <SafeAreaView>
        {/* CONTENT */}
        <View style={styles.container} >
          <View>
            <View style={{ margin: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 100 }}>
                  <Text>Date request </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>: </Text>
                  <Text>{this.props.navigation.getParam('data').created_at.split('T')[0]} {this.props.navigation.getParam('data').created_at.split('T')[1].split('.')[0]}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 100 }}>
                  <Text>Question for </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>: </Text>
                  <Text>{this.props.navigation.getParam('data').tbl_contact_category.contact_categories}</Text>

                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 100 }}>
                  <Text>Question </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>: </Text>
                  <Text>{this.state.data.message}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 100 }}>
                  <Text>Status </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>: </Text>
                  <Text style={{ fontWeight: 'bold', color: defaultColor }}>{this.state.status}</Text>
                </View>
              </View>
            </View>

            <Text style={{ color: defaultColor, fontSize: 15, marginTop: 10 }}>Timeline status</Text>
            <FlatList
              keyExtractor={(item) => item.contact_id}
              style={{ paddingTop: 5 }}
              data={this.state.timeline}
              renderItem={({ item }) => <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 35, alignItems: 'center', }}>
                  <View style={{ borderRadius: 15, backgroundColor: defaultColor, width: 18, height: 18 }} />
                  {
                    item.status != 'Awaiting reply' && <View
                      style={item.status != 'Confirmation' ? { ...styles.separator, height: 50 } : { ...styles.separator, height: 35 }}
                    />
                  }
                </View>
                <View>
                  {
                    item.time && <Text style={{ fontWeight: 'bold' }}>{item.time.split('T')[0]} {item.time.split('T')[1].split('.')[0]}</Text>
                  }
                  <Text>Question/Task submitted</Text>
                  <Text style={{ color: defaultColor, fontSize: 15 }}>{item.status}</Text>
                </View>
              </View>} />
          </View>
        </View>

      </SafeAreaView >
    )
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    height: '100%',
    padding: 5
  },
  separator: {
    width: 1,
    borderWidth: 0.5,
    borderColor: defaultColor,
  }
})

