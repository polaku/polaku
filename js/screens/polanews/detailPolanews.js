import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';

export default class detailPolanews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    this.setState({
      data: this.props.navigation.getParam('data')
    })
    console.log(this.props.navigation.getParam('data').attachments);
    
  }


  render() {
    // const source = { uri: 'http://api.polagroup.co.id/uploads/1566978700634-Tokopedia-Senior%20Recruitment%20and%20Employer%20Branding.pdf', cache: true };
    // const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
    const source = { uri: "" + this.props.navigation.getParam('data').attachments, cache: true };

    return (
      <View style={styles.container}>
        {
          this.props.navigation.getParam('data').attachments
          ? <Pdf
          source={source}
          style={styles.pdf} />
          : <Text>data not found</Text>
        }
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  }
});