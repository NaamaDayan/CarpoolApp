import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Dimensions
} from 'react-native';
import MapView from 'react-native-maps';


const mode = 'driving'; // 'walking';
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
const DEFAULT_PADDING = { top: 5, right: 5, bottom: 5, left: 5 };
const { width, height } = Dimensions.get('window');

export default class MapDirections extends React.Component {

  constructor(props) {
    super(props);  
    this.mapRef = null;    
  }

  state = {    
    MARKERS : null,
    origin :`${this.props.origin.lat},${this.props.origin.lng}`,
    destination :`${this.props.destination.lat},${this.props.destination.lng}`,
    destMarker : '',
    startMarker :'',
    imageloaded:false,
  }

  componentDidMount()
  {
      console.log("directions mount", this.props.origin);
    this.getRoutePoints(this.state.origin, this.state.destination);
  }

  /**
   * This method will give you JSON response with all location points between 2 location
   */
  getRoutePoints(origin,destination) {
    console.log("-----getRoutePoints-----")    
    const api= 'AIzaSyBvnlFZBDLHbifQYB3ZABr1c-qU8klKFyk'
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${api}&mode=${mode}`;
    console.log("URL -- >>" + url);

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.routes.length) {
          var cortemp = this.decode(responseJson.routes[0].overview_polyline.points) // definition below;
          var length = cortemp.length - 1;

          var tempMARKERS = []; 
          tempMARKERS.push({...cortemp[0], latitudeDelta: 0.003, longitudeDelta: 0.003}) ;   //start origin        
          tempMARKERS.push({...cortemp[length], latitudeDelta: 0.003, longitudeDelta: 0.003}); //only destination adding

          console.log("tempMARKERS : " + JSON.stringify(tempMARKERS));

          this.setState({
            coords: cortemp,            
            MARKERS:tempMARKERS,
            destMarker : cortemp[length],
            startMarker:cortemp[0],
          });

        }
      }).catch(e => { console.warn(e) });
  }

  /**
   * This method will transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates
   */

  decode(t, e) {
    for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
      a = null, h = 0, i = 0;
      do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
      n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0;
      do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
      o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c])
    }
    return d = d.map(function (t) {
      return {
        latitude: t[0],
        longitude: t[1]
      }
    })
  }

  /**
   * After loading custome image of marker it will render map and refresh map will image
   */
  forceUpdateMap() {
    console.log("-----forceUpdateMap------")
    this.setState({ imageloaded: true });
  }

  /**
   * This method will fit all markers point into single screen 
   */
  fitAllMarkers() {
    const temMark = this.state.MARKERS;
    console.log("temMarks: ", temMark);
    console.log( "------fitAllMarkers------")
    this.setState({loading:false});
    if (this.mapRef == null) {
      console.log("map is null")
    } else {
      //option:1  
      console.log("temMark : " + JSON.stringify(temMark));
      // this.mapRef.animateToRegion(temMark[0], 5);
      // this.mapRef.animateToRegion(temMark[temMark.length-1], 5);
      this.mapRef.fitToCoordinates(temMark, {
        edgePadding: DEFAULT_PADDING,
        animated: false,
      });              
    }
  }


  render() {

    return (
      <View style={styles.container}>
        {
          (this.state.coords != null) ?
            <MapView
              ref={ref => { this.mapRef = ref; }}
              style={styles.map}
              onMapReady={() => this.fitAllMarkers()}
              // onLayout={() => this.fitAllMarkers()}
              
              >

              {/*used to drae line on rout point of locations*/}
              < MapView.Polyline
                coordinates={this.state.coords}
                strokeWidth={2}
              />

              {/*start point marker*/}
              <MapView.Marker
                key={1}
                coordinate={this.state.startMarker}
              />

              {/*end point marker*/}
              <MapView.Marker
                key={2}
                coordinate={this.state.destMarker}
              >                
              </MapView.Marker>
            </MapView> : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    // flex: 1,
    // width: width,
    // height: height
  },
});
