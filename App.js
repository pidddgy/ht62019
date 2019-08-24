import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, Card, Button } from 'react-native-paper';

export default class App extends React.Component {
  state = {
    it: null
  }

  render() {
    return (
      <PaperProvider>
        <View>
          <Text>
            sdfdsfsdfsdfds
          </Text>
          <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
            Press me
          </Button>
        </View>
      </PaperProvider>
    );
  }
}
