import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, Card, Button, Title } from 'react-native-paper';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import $ from 'jquery';
import axios from "axios";

export default class App extends React.Component {
  // 0 == not it, 1 = it
  state = {
    team: 0,
    location: {},
    id: null,
  }

  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let loc = await Location.getCurrentPositionAsync({ accuracy: 6 });

    // console.log(loc + " sdfsdfdsfssdff");

    this.setState({ location: loc });
    // console.log(this.state.location.coords.latitude + "," + this.state.location.coords.longitude);
    const url = 'http://40.121.93.132:4200/loc/' + this.state.id.toString() + 
    "/" + this.state.location.coords.latitude + '/' + this.state.location.coords.longitude;

    console.log("url is "+url);
    axios.get(url).then((res) => {
        console.log("successfully updated");
      }).catch(function () {
        console.log("oh no");
      });
  };

  componentWillMount = () => {
    axios.get('http://40.121.93.132:4200/add/').then((res) => {
      // console.log(res);
      var cuteid;
      cuteid = JSON.parse(res.request._response).id.toString();
      // console.log("set id to " + cuteid)
      
      this.setState({
        id: cuteid,
      })
    }).catch(function (res) {
      console.log("oh no");
      console.log(res);
    });

    // console.log("passed");
    setInterval(() => {
      this.getLocation();
    }, 1000)
  }

  render() {
    return (
      <PaperProvider>
        <View style={styles.container}>
          <View style={styles.bottom}>
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