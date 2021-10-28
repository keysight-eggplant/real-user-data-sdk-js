import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Button,
  Alert,
} from 'react-native'

import * as rciSdk from './rci.min.js';

class App extends Component {
  state = {
    count: 0
  }

   onPress = async () => {
    console.log('Starting');

    try {

      const tenancyId = '123-456';

      const targetUrl = `https://target.domain/v1/${tenancyId}/stream`;
      const transport = new window.rciSdk.Transport(targetUrl);
    
      // Step 2: Capture your default collectors
      const defaults = window.rciSdk.collector.defaultCollectors;
    
      // Step 3: Build a new Producer with transport and collector
      const producer = new window.rciSdk.Producer(transport, defaults);
    
      let event = await producer.collect();

      console.log(event);



  } catch (e) {
    console.log(e);
  }
    console.log('Finished');
  }

 render() {
    return (
      <View style={styles.container}>
      <Button
        onPress={this.onPress}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
        <View>
          <Text>
            You clicked { this.state.count } times
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  }
})

export default App;