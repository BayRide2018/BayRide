import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { store, auth } from '../fire';
import Icon from 'react-native-vector-icons/Octicons';
import style from '../public/style';

export default class History extends Component {

	state = {
        driverHistory: [],
        passengerHistory: []
    };

    componentDidMount = async () => {
        let myPassengerLotHistory, myDriverLotHistory;
        await store.collection("users").doc(auth.currentUser.email).get().then(user => {
            // this.setState({ name: user.data().name, email: user.data().email })
            myDriverLotHistory = user.data().myDriverLotHistory;
            myPassengerLotHistory = user.data().myPassengerLotHistory;
        })
        store.collection("driver_lot_history").doc(myDriverLotHistory).get().then(history => {
            this.setState({ driverHistory: history.data().lots })
        })
        store.collection("passenger_lot_history").doc(myPassengerLotHistory).get().then(history => {
            this.setState({ passengerHistory: history.data().lots })
        })
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
                <Text>You don't currently have any history, because you haven't been on any rides. Take a trip somewhere, and we'll show it here</Text>
                <Text></Text>
                <Text>This is your driver history!!</Text>
                <Text>You don't currently have any history, because you haven't driven anyone. Take someone out for a spin, and we'll show it here</Text>
                <Text>This is your profile!!</Text>
                <Text>Name: </Text>
                <Text>{name}</Text>
                <Text>email: </Text>
                <Text>{email}</Text>
			</View>
		);
	}
}

