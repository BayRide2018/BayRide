import React, { Component } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const key = 'AIzaSyBXFcIJtLv7CMy1SLKQgkdlwByYVTxpXq0';
// ^^ Don't forget we need to hide

export default class GoogleDropoff extends Component {
	render() {
		return(
			<GooglePlacesAutocomplete
				placeholder='Search'
				minLength={2} // minimum length of text to search
				autoFocus={false}
				returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
				listViewDisplayed='auto'    // true/false/undefined
				fetchDetails={true}
				renderDescription={row => row.description} // custom description render
				onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
					let dropOff = {fullAddress: details.formatted_address, coords: details.geometry.location};
					this.props.dropOff(dropOff);
				}}

				getDefaultValue={() => ''}

				query={{
					// available options: https://developers.google.com/places/web-service/autocomplete
					key: key,
					language: 'en', // language of the results
					types: 'geocode', // default: 'geocode'
					// location: '40.719042, -73.959468'
				}}

				styles={{
					textInputContainer: {
						width: '100%'
					},
					description: {
						fontWeight: 'bold'
					},
					predefinedPlacesDescription: {
						color: '#1faadb'
					},
				}}

				currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
				currentLocationLabel="Current location"
				nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
				GoogleReverseGeocodingQuery={{
					// available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
				}}
				GooglePlacesSearchQuery={{
				// available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
					rankby: 'distance',
					types: 'food'
				}}

				filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
				debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
			/>
		);
	}
}

