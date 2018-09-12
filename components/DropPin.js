import React, { Component } from 'react';
import { MapView, Location, Permissions, Notifications, Platform } from 'expo';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { store, auth } from '../fire';
import { Marker } from 'react-native-maps';
import MatchBanner from './MatchBanner';
import style from '../public/style';
import Icon from 'react-native-vector-icons/Octicons';


export default class DropPin extends Component {

    handleSubmit () {}

    render () {
        return (
            <View>
                <MapView 
                    style={style.mapMain}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                    showsUserLocation={true}
                    followsUserLocation={true} />

                <View style={style.matchMain}>
                    <Button rounded info large onPress={this.handleSubmit}>
                        <Text>Use this Location</Text>
                    </Button>
                </View>
            </View>
        );
    }
}