import React, { Component } from 'react';
import { View } from 'react-native';
import { store, auth } from '../fire';
import Icon from 'react-native-vector-icons/Octicons';
import { Button, Text} from 'native-base';
import style from '../public/style';
import { TextField } from 'react-native-material-textfield';

export default class Payment extends Component {

    /**
     * This Component needs to be totally changed.. for now, no big deal
     */

	state = {
        name: '',
		email: '',
		password: '',
        phone: '',
        defaultSetting: '',
        paymentInformation: {}, // I think that these two will be editable somewhere else.. There will be other forms that it
        drivingInformation: {}, // Takes them to.. The other tabs in the drawer
        id: '' // This is here for when we want to add an edit button later
    };

    componentDidMount = () => {
        store.collection("users").doc(auth.currentUser.email).get().then(user => {
            this.setState({name: user.data().name, email: user.data().email, password: user.data().password, phone: user.data().phone, defaultSetting: user.data().defaultSetting , paymentInformation: user.data().paymentInformation, drivingInformation: user.data().drivingInformation, id: user.id})
        });
    }

    handleSubmit () {
        // Nice
    }

	render () {
        const { name, email, password, phone, defaultSetting, paymentInformation, drivingInformation, id } = this.state;
		return (
            <View style={style.background} >
            <Icon
                style={style.drawerIcon}
                name='three-bars'
                size={30}
                color='#000'
                onPress={() => this.props.navigation.toggleDrawer()}
            />

			<View>
                <Text>paymentInformation: </Text>
                <Text>drivingInformation: (these are empty on purpose for now)</Text>
                <Button onPress={this.handleSubmit}><Text>Save</Text></Button>
            </View>
            </View>
		);
	}
}

