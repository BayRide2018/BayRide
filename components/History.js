import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { store, auth } from '../fire';
import Icon from 'react-native-vector-icons/Octicons';
import style from '../public/style';

export default class History extends Component {

	state = {
        currentlyPassenger: true,
        history: [],
        lots: []
    };

    componentDidMount = async () => {
        let myPassengerLotHistory, myDriverLotHistory, currentlyPassenger;
        await store.collection("users").doc(auth.currentUser.email).get().then(user => {
            myDriverLotHistory = user.data().myDriverLotHistory;
            myPassengerLotHistory = user.data().myPassengerLotHistory;
            currentlyPassenger = user.data().currentlyPassenger;
        });
        if (currentlyPassenger) {
            await store.collection("passenger_lot_history").doc(myPassengerLotHistory).get().then(history => {
                this.setState({ history: history.data().lots, currentlyPassenger });
            });
        } else {
            await store.collection("driver_lot_history").doc(myDriverLotHistory).get().then(history => {
                this.setState({ history: history.data().lots, currentlyPassenger });
            });
        }
        // I don't want to update state a million times, so I'll make this list, and then jsut assign state once
        let lots = [];
        for (let id of this.state.history) {
            await store.collection("lot_history").doc(id).get().then(lot => {
                lots.push(lot.data());
            });
        }
        this.setState({ lots });
    }

	render() {
		return (
			<View>
                <Text></Text>
                <Icon
                    style={style.drawerIcon}
                    name='three-bars' 
                    size={30} 
                    color='#000' 
                    onPress={() => this.props.navigation.toggleDrawer()}
                />

                <Text>This is your passenger history!!</Text>
                <ScrollView>
                        {this.state.history.map((lot, i) => {
                            return (<View key={i}>
                                <Text>{lot}</Text>
                            </View>)
                        })}
                </ScrollView>
			</View>
		);
	}
}

