import React, { Component } from 'react';
import { MapView, Location, Permissions, Notifications, Platform } from 'expo';
import { View, Image } from 'react-native';
import { Button, Text } from 'native-base';
import { store, auth } from '../fire';
import { Marker } from 'react-native-maps';
import MatchBanner from './MatchBanner';
import style from '../public/style';
import Icon from 'react-native-vector-icons/Octicons';


export default class DropPin extends Component {

    state = {
        markerLocation: null,
    }

    handleSubmit () {}

    onRegionChangeComplete () {}

    render () {
        return (
			<View style={[style.containerMain, {justifyContent: 'center', alignItems: 'center',}]}>
                <MapView 
                    style={style.mapMain}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                    showsUserLocation={true}
                    followsUserLocation={true} />

		        <Image source={require('../public/images/marker.png')} style={{
                    zIndex: 30,
                    height: 20,
                    width: 20,
                }} />

                <View style={style.matchMain}>
                    <Button rounded info large onPress={this.handleSubmit}>
                        <Text>Use this Location</Text>
                    </Button>
                </View>
            </View>
        );
    }
}