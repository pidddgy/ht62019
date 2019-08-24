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
        <View style = {styles.container}>
          <Button icon="do-not-disturb" style={styles.button} onPress={() => console.log('Pressed')}>
            I've been caught
          </Button>
        </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
})