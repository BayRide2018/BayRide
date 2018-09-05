import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { store, auth } from '../fire';
import Icon from 'react-native-vector-icons/Octicons';
import style from '../public/style';

export default class History extends Component {

	state = {
        currentlyPassenger: true,
        history: []
    };

    componentDidMount = async () => {
        let myPassengerLotHistory, myDriverLotHistory, currentlyPassenger;
        await store.collection("users").doc(auth.currentUser.email).get().then(user => {
            // this.setState({ name: user.data().name, email: user.data().email })
            myDriverLotHistory = user.data().myDriverLotHistory;
            myPassengerLotHistory = user.data().myPassengerLotHistory;
            currentlyPassenger = user.data().currentlyPassenger;
        })
        if (currentlyPassenger) {
            store.collection("passenger_lot_history").doc(myPassengerLotHistory).get().then(history => {
                this.setState({ history: history.data().lots, currentlyPassenger })
            })
        } else {
            store.collection("driver_lot_history").doc(myDriverLotHistory).get().then(history => {
                this.setState({ history: history.data().lots, currentlyPassenger })
            })
        }
    }

	render() {
        const { name, email } = this.state;
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

