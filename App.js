import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, Card, Button, Title } from 'react-native-paper';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import $ from 'jquery';
import axios from "axios";

const URL = 'http://40.121.93.132:4200';

export default class App extends React.Component {
    // 0 == not it, 1 = it
    state = {
        team: 0,
        location: {},
        id: 'N/A',
        best: Infinity,
    }

    /*
    Gets response object from a request and runs JSON.parse on it
    */
    getResponse = request => {
        return JSON.parse(request.request._response);
    }

    getLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let loc = await Location.getCurrentPositionAsync({ accuracy: 6 });
        this.setState({ location: loc });
        const { state } = this;

        // console.log(`Got loc: ${loc}`);
        // console.log(`Coords: ${state.location.coords.latitude}, ${state.location.coords.longitude}`);

        const url = `${URL}/loc/${state.id.toString()}/${state.location.coords.latitude}/${state.location.coords.longitude}`;

        // console.log(`Url is ${url}`);
        axios.get(url).then(req => {
            let { dist } = this.getResponse(req);
            this.state.best = dist;
            // console.log("successfully updated");
        }).catch(err => {
            console.log(`Err: ${err}, oh no`);
        });
    };

    componentWillMount = () => {
        axios.get('http://40.121.93.132:4200/add/').then(res => {
            const id = this.getResponse(res).id.toString();
            // console.log(`Res: ${res}`);
            // console.log(`Set id to ${id}`);

            this.setState({ id: id })
        }).catch(err => {
            console.log(`Err: ${err}, oh no`);
        });

        // console.log("passed");
        setInterval(() => {
            this.getLocation();
        }, 1000)
    }

    swapTeam = () => {
        // The Bitwise OR casts it to an integer
        let team = !this.state.team | 0;
        axios.get(`${URL}/team/${this.state.id}/${team}`).then(_ => {
            this.setState({ team });
        });
    }

    getBestText = () => {
        return this.state.best === Infinity ? 'N/A' : `~${this.state.best.toFixed(1)}m`;
    }

    getTeamText = () => {
        return this.state.team ? 'It' : 'Not It';
    }

    render() {
        return (
            <PaperProvider>
                <View style={styles.container}>
                    <View style={styles.top}>
                        <Title style={styles.fontXL}>Closest Enemy</Title>
                        <Title style={[styles.fontXXL, styles.bestDist]}>{this.getBestText()}</Title>
                    </View>
                    <View style={styles.bottom}>
                        <Title style={styles.fontL}>Team - {this.getTeamText()}</Title>
                        <Title>ID - {this.state.id}</Title>

                        <Button icon="account-circle" onPress={() => this.swapTeam()}>
                            Swap Team
					    </Button>
                        {/* <Button icon="do-not-disturb" onPress={() => this.swapTeam()}>
                            Swap Team
					    </Button>
                        <Button icon="do-not-disturb" onPress={() => this.swapTeam()}>
                            Swap Team
					    </Button> */}
                        {/* <Title> debug - {JSON.stringify(this.state.location)} </Title> */}
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
        // borderColor: 'red',
        // borderWidth: 1,
        // borderStyle: 'solid'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
        alignItems: 'center',
    },
    top: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 50,
        alignItems: 'center',
    },
    fontL: {
        lineHeight: 40,
        fontSize: 40
    },
    fontXL: {
        overflow: "visible",
        textAlign: "center",
        lineHeight: 60,
        fontSize: 60
    },
    fontXXL: {
        overflow: "visible",
        lineHeight: 90,
        fontSize: 90
    },
    bestDist: {
        marginTop: 150
    }
});
