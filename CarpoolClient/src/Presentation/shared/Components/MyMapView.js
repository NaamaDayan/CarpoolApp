import React from 'react';
import MapView,{ Marker } from 'react-native-maps';
import { globalStyles } from '../../styles';

function MyMapView(props) {
    return (
        <MapView
            style={globalStyles.flex}
            region={props.region}
            showsUserLocation={true}
            onRegionChange={(reg) => props.onRegionChange(reg)}>

            <Marker coordinate={props.region} />
        </MapView>
    )
}
export default MyMapView;