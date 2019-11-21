import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Dimensions, TouchableHighlight, SafeAreaView, FlatList, Image } from 'react-native';
import { Badge } from "native-base";
import { defaultColor, defaultBackgroundColor } from '../../defaultColor';

class hubungiKamiPertanyaan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { id: 1, image: 'asset:/it.png', title: 'IT' },
        { id: 2, image: 'asset:/hrd.png', title: 'HRD' },
        { id: 3, image: 'asset:/design.png', title: 'DESAIN' },
        // { id: 4, image: 'asset:/other.png', title: 'LAINNYA' }
      ],
      counterTugas: this.props.questionForMe
    }
  }

  navigateDaftarHubungiKami = () => {
    this.props.navigation.navigate('Daftar Hubungi Kami', { status: 'Pertanyaan' })
  }

  navigateDaftarTugas = () => {
    this.props.navigation.navigate('DaftarTugas', { pertanyaan: true })
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: defaultBackgroundColor, height: '100%' }}>
        {
          this.props.adminContactCategori
            ? <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>

              <TouchableHighlight onPress={this.navigateDaftarTugas} style={styles.buttonDaftarPermintaan} underlayColor="transparent">
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.textTitleInactive}> Tugas </Text>
                  {
                    this.state.counterTugas != 0 && <Badge style={{ height: 'auto', marginLeft: 10, backgroundColor: defaultColor }}>
                      <Text style={{ color: this.state.isTugasOnPress ? defaultColor : 'white' }}>{this.props.questionForMe.length}</Text>
                    </Badge>
                  }
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={this.navigateDaftarHubungiKami} style={styles.buttonDaftarPermintaan} underlayColor="transparent">
                <Text style={styles.textTitleInactive}> daftar pertanyaan </Text>
              </TouchableHighlight>
            </View>
            : <View style={{ alignSelf: 'flex-end' }}>
              <TouchableHighlight onPress={this.navigateDaftarHubungiKami} style={styles.buttonDaftarPermintaan} underlayColor="transparent">
                <Text style={styles.textTitleInactive}> daftar pertanyaan </Text>
              </TouchableHighlight>
            </View>
        }
        <Text style={styles.textTitle}>Ada yang ingin ditanyakan?</Text>
        <FlatList
          keyExtractor={(item) => item.id}
          style={styles.flatList}
          numColumns={2}
          data={this.state.data}
          renderItem={({ item }) => <TouchableHighlight onPress={() => this.props.navigation.navigate('FormQuestion', {
            data: item.title,
            keterangan: 'contact_us'
          })} underlayColor="transparent">
            <View style={styles.containerItem}>
              <Image source={{ uri: item.image }} style={{ height: 80, width: 80 }} />
              <Text style={{ marginTop: 10, fontWeight: 'bold' }}>{item.title}</Text>
            </View>
          </TouchableHighlight>}
        />
      </SafeAreaView>
    )
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultBackgroundColor,
    height: '100%',
    marginBottom: 60
  },
  flatList: {
    paddingTop: 10,
    marginBottom: 120,
    backgroundColor: defaultBackgroundColor
  },
  containerItem: {
    width: 1 / 2 * width - 10,
    height: 1 / 2 * width - 10,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    paddingTop: 5
  },
  textTitle: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 17,
    fontWeight: 'bold',
    color: defaultColor
  },
  buttonDaftarPermintaan: {
    padding: 10,
    marginRight: 10,
    height: 50,
    justifyContent: 'center'
  },
  textTitleInactive: {
    fontSize: 15,
    fontWeight: 'bold',
    color: defaultColor
  },
})

const mapStateToProps = ({ questionForMe, adminContactCategori }) => {
  return {
    questionForMe,
    adminContactCategori
  }
}

export default connect(mapStateToProps)(hubungiKamiPertanyaan)