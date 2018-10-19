import Geocoder from 'react-native-geocoding';

export default async function geocoder (latitude, longitude) {
    // Do we really need to initialize this every time... ???
    let fullAddress;
    await Geocoder.init('AIzaSyBXFcIJtLv7CMy1SLKQgkdlwByYVTxpXq0');
    await Geocoder.from(latitude, longitude).then(json => {
        fullAddress = json.results[0].formatted_address;
    });
    return fullAddress;
};