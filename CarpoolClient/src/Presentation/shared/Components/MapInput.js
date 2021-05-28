import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import globalStyles from '../../styles/styles';
import { Platform, PermissionsAndroid, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

async function requestPermissions() {
    if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();
        Geolocation.setRNConfiguration({
            skipPermissionRequests: false,
            authorizationLevel: 'whenInUse',
        });
    }

    if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
    }
}

function MapInput(props) {
    return (

        <GooglePlacesAutocomplete
            placeholder={ props.placeholder }
            minLength={ 2 } // minimum length of text to search
            autoFocus={ false }
            returnKeyType={ 'search' } // Can be left out for default return key
            listViewDisplayed={ false }    // true/false/undefined
            fetchDetails={ true }
            onPress={ (data, details = null) => { // 'details' is provided when fetchDetails = true
                requestPermissions().then(() => {
                    props.notifyChange(details.geometry.location, data);
                }); //Naama
            } }
            query={ {
                key: 'AIzaSyBvnlFZBDLHbifQYB3ZABr1c-qU8klKFyk',
                language: 'iw',
            } }
            styles={ {
                textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    width: '100%',
                },
                textInput: globalStyles.textInput,
                predefinedPlacesDescription: {
                    color: '#1faadb',
                },
            } }
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={ 300 }
            language='iw'
        />
    );
}

export default MapInput;
