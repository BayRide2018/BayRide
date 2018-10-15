import React, { Component } from 'react';
import { MapView } from 'expo';
import { View, Image } from 'react-native';
import { Button, Text } from 'native-base';
import style from '../public/style';
import Geocoder from 'react-native-geocoding';


export default class DropPin extends Component {

    state = {
        region: {lat: 0 ,lng: 0},
        fullAddress: '',
        followsUserLoc: true,
    }

    handleChange = (region) => {
        Geocoder.init('AIzaSyBXFcIJtLv7CMy1SLKQgkdlwByYVTxpXq0');
        let region = { lat: region.latitude, lng: region.longitude };
        this.setState({ region, followsUserLoc: false });
        Geocoder.from(lat, lng).then(json => {
            var fullAddress = json.results[0].formatted_address;
            this.setState({ fullAddress });
        });
    }

    handleSubmit = () => {
        const { navigation } = this.props;
		const handleDropPin = navigation.getParam('handleDropPin');
        handleDropPin(this.state);
        this.props.navigation.navigate('LotSubmissionForm');
    }

    
    render () {
        return (
			<View style={[style.containerMain, { justifyContent: 'center', alignItems: 'center' }]}>
                <MapView
                    style={style.mapMain}
                    onRegionChangeComplete={region => this.handleChange(region)}
                    showsUserLocation={true}
                    followsUserLocation={this.state.followsUserLoc} /> {/** The point is that hopefully this makes the map zoom in (I think that sometimes it does need to do this, and somethimes it doesn't), but it doesn't move around when you're trying to drop the pin */}

                <Button warning small onPress={() => {this.props.navigation.navigate('LotSubmissionForm')} } style={{ marginBottom: 25 }}><Text style={{fontSize: 15}}>Go Back</Text></Button>
                                    
                <View style={{ backgroundColor: 'white', padding: 8, borderRadius: 4, borderColor: 'gray', borderWidth: 2 }} >
                    <Text>{this.state.fullAddress}</Text>
                </View>

                                    {/** Also, this needs to be a better picture... */}
                <Image source={require('../public/images/marker.png')} style={{
                    zIndex: 30,
                    height: 20,
                    width: 20,
                    margin: 150,
                }} />

                <Button style={{ alignSelf: 'center', marginTop: 20 }} rounded info large onPress={this.handleSubmit}>
                    <Text>Use this Location</Text>
                </Button>
            </View>
        );
    }
}
