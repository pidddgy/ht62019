import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, Card, Button, Title  } from 'react-native-paper';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {
  state = {
    it: null,
    location:null,
  }

  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({accuracy:6});
    this.setState({ location });
    console.log(location);
  };

  componentWillMount () {
    setInterval(() => {
      this.getLocation();
    }, 30)
  }

  render() {
    return (
      <PaperProvider>
        <View style = {styles.container}>
          <View style = {styles.bottom}> 
          <Title> debug - {JSON.stringify(this.state.location)} </Title>
          <Title> Distance to closest -  </Title> 
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