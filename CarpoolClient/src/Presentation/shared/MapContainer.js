import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import MapInput from './Components/MapInput';
import MyMapView from './Components/MyMapView';
import { getLocation, geocodeLocationByName } from '../../services/location-service';
import { globalStyles, colors } from '../styles';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        lat: 31.7,
        lng: 33.2,
        address_name: '',
        place_id: ''
    };

    componentDidMount() {
        this.getInitialState();
    }

    getInitialState() {
        getLocation().then(
            (data) => {
                this.setState({
                    lat: data.latitude,
                    lng: data.longitude,
                });
            },
        );
    }

    getCoordsFromName(loc, data) {
        this.setState({
            lat: loc.lat,
            lng: loc.lng,
            address_name: data.description,
            place_id: data.place_id
        });
    }

    onMapRegionChange(region) {
        this.setState({ lat: region.latitude, lng: region.longitude });
    }

    pressHandlerReturn() {
        this.props.navigation.state.params.changeAdress(this.state);
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={[globalStyles.flex, globalStyles.container]}>
                <View style={{ flexDirection: 'row' }}>
                    <MapInput placeholder='היכן אתה גר?' notifyChange={(loc, data) => this.getCoordsFromName(loc, data)} />
                    <Icon name='search' color={colors.darkGray} style={{ alignSelf: 'flex-end' }} />
                </View>


                <View style={{ flex: 3, marginBottom: 50, marginTop: 50 }}>
                    <MyMapView
                        region={{latitude: this.state.lat, longitude: this.state.lng, latitudeDelta: 0.003, longitudeDelta: 0.003}}
                        onRegionChange={(reg) => this.onMapRegionChange(reg)}
                    />
                </View>
                <TouchableOpacity style={[globalStyles.button, { width: 150 }]} onPress={() => this.pressHandlerReturn()}>
                    <Text style={globalStyles.regTextWhite}>קבע מיקום</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default MapContainer;
