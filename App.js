import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, Card, Button, Title  } from 'react-native-paper';

export default class App extends React.Component {
  state = {
    it: null
  }

  render() {
    return (
      <PaperProvider>
        <View style = {styles.container}>
          <View style = {styles.bottom}> 
          <Title> Distance to closest - </Title> 
          <Button icon="do-not-disturb" onPress={() => console.log('Pressed')}>
            I've been caught
          </Button>
          </View>

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
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    alignItems: 'center',
  }
})