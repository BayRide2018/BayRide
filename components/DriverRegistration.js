import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { store, auth } from '../fire';
import style from '../public/style';
import ViewPhotos from './ViewPhotos';


export default class DriverRegistration extends Component {

    state = {
        showAlert: false,
        screenshot: '',
    }

	handleSubmit = async (carType) => {
    // Please test to see if this really needs to be awaited.. If it doesn't (the function still works) then it removing it will be a slightly better UX, I believe
        await store.collection("users").doc(auth.currentUser.email).update({
            drivingInformation: { canDrive: true, carType, screenshot: this.state.screenshot },
            currentlyPassenger: false
        })
        this.setState({ showAlert: true })
    }

    handleBack = () => {
        this.props.navigation.navigate('MainScreen');
    }

    render () {
        const BayrideX = "brx";
        const BayrideXL = "brxl";
        const BayrideSupreme = "brs";
        return (
            <View style={style.background} >
                <View style={{ flex: 1 }} >
                    <Text style={{ margin: 40 }} >Please upload a screenshot of your driver's license</Text>
                    <ViewPhotos setScreenshotId={ (photoID) => {this.setState({ screenshot: photoID })} } />
                </View>

				{this.state.showAlert ? Alert.alert(
                    `Your application is under review!`,
					'Expect an email from us soon letting you know if you\'ll be able to join our team',
					[
                        { text: 'Nice', onPress: () => this.props.navigation.navigate('DriverHome'), style: 'cancel' }
					],
					{ cancelable: false }
                    ) : null}
                <View style={{ flex: 2, margin: 30 }} >
                    <Text>Select which style of car you will be driving:</Text>
                    <Button title="Sign up to Drive Bayride" onPress={() => { this.handleSubmit(BayrideX) } } />
                    <Button title="Sign up to Drive BayrideXL" onPress={() => { this.handleSubmit(BayrideXL) } } />
                    <Button title="Sign up to Drive Bayride Supreme" onPress={() => { this.handleSubmit(BayrideSupreme) } } />
                    <Button style={style.backButton} title='Go Back' onPress={this.handleBack} />
                </View>
            </View>
        );
    }
}
