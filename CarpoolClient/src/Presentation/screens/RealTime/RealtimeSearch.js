import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import MapInput from '../../shared/Components/MapInput';
import MyMapView from '../../shared/Components/MyMapView';
import MapDirections from '../../shared/Components/MapDirections';
import { getLocation, geocodeLocationByName } from '../../../services/location-service';
import { globalStyles, colors } from '../../styles';
import TimePicker from '../Register/Components/TimePicker';
import moment from 'moment';
import Modal from 'react-native-modal';
import { store } from '../../../../App';
import HeaderBarImage from '../../shared/Components/HeaderBarImage';
import { shadow } from 'react-native-paper';

class RealTimeSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            origin: {
                lat: 32.096251,
                lng: 34.797807,
                address_name: '',
                place_id: '',
            },
            destination: {
                lat: 32.075477,
                lng: 34.791312,
                address_name: '',
                place_id: '',
            },
            visible: false,
            exit_hour1: '',
            exit_hour2: '',
        };
    }


    setExit1 = () => {
        return (newValue) => {
            this.setState({exit_hour1: newValue});
        };
    };

    setExit2 = () => {
        return (newValue) => {
            this.setState({exit_hour2: newValue});
        };
    };

    componentDidMount() {
        this.getInitialState();
    }

    getInitialState() {
        getLocation().then(
            (data) => {
                this.setState({
                    origin: {lat: data.latitude, lng: data.longitude},
                });
            },
        );
    }

    getCoordsFromNameOrigin(loc, data) {
        this.setState({
            origin: {
                lat: loc.lat,
                lng: loc.lng,
                address_name: data.description,
                place_id: data.place_id,
            },
        });
    }

    getCoordsFromName(attr, loc, data) {
        this.setState({
            [attr]: {
                lat: loc.lat,
                lng: loc.lng,
                address_name: data.description,
                place_id: data.place_id,
            },
        });
    }

    onMapRegionChange(region) {
        this.setState({origin: {lat: region.latitude, lng: region.longitude}});
    }

    pressHandlerReturn() {
        // this.props.navigation.state.params.changeAdress(this.state);
        // this.props.navigation.goBack();
    };


    showModal = () => this.setState({visible: true});
    hideModal = () => this.setState({visible: false});

    find_real_time_groups = () => {
        this.hideModal();
        const currDate = new Date;
        const data = {
            exit_hour1: this.state.exit_hour1,
            exit_hour2: this.state.exit_hour2,
            source: this.state.origin,
            destination: this.state.destination,
            day: currDate.getDay(), //fit server format
        };
        store.dispatch({
            type: 'FIND_REAL_TIME_GROUPS',
            data: data,
        });
        this.props.navigation.push('Suggestions', {user_data: data});
    };


    render() {
        return (
            <View style={ {flex: 1} }>
                <HeaderBarImage email={ store.getState()['email'] } title={ 'נסיעה בזמן אמת' }
                                navigation={ this.props.navigation }/>
                <View style={ [globalStyles.container] }>
                    <View style={ {
                        flexDirection: 'row',
                        marginBottom: '5%',
                        alignContent: 'center',
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                    } }>
                        <Text style={ [globalStyles.titleText, {paddingTop: '3%', paddingBottom: '5%'}] }>
                            מצא נסיעה עכשיו
                        </Text>
                        <Image style={ {height: '100%', width: '20%', marginStart: '7%'} }
                               source={ require('../../../../images/earth_trns.png') }/>
                    </View>

                    <View style={ [globalStyles.shadow, globalStyles.border, {
                        backgroundColor: colors.background,
                        borderWidth: 1,
                    }] }>
                        <Text style={ {fontSize: 16, marginBottom: '5%', marginTop: '5%', marginEnd: '2%'} }>
                            איפה אתה נמצא?</Text>
                        <View style={ {flexDirection: 'row-reverse', alignItems: 'center'} }>
                            <Icon name='search' color={ colors.darkGray } style={ {alignSelf: 'flex-end'} }/>
                            <MapInput placeholder='בחר נקודת מוצא'
                                      notifyChange={ (loc, data) => this.getCoordsFromName('origin', loc, data) }/>
                        </View>

                        <Text style={ {fontSize: 16, marginBottom: '5%', marginTop: '5%', marginEnd: '2%'} }>
                            לאן אתה נוסע?
                        </Text>
                        <View style={ {
                            flexDirection: 'row-reverse',
                            paddingTop: 10,
                            marginBottom: '5%',
                            alignItems: 'center',
                        } }>
                            <Icon name='search' color={ colors.darkGray }/>
                            <MapInput placeholder='בחר יעד'
                                      notifyChange={ (loc, data) => this.getCoordsFromName('destination', loc, data) }/>
                        </View>
                    </View>
                    <View style={ [globalStyles.shadow, globalStyles.border, {
                        borderWidth: 1,
                        marginTop: '10%',
                        paddingBottom: '5%',
                        backgroundColor: colors.background,
                    }] }>
                        <Text style={ {fontSize: 16, marginTop: '5%', marginBottom: '5%', marginEnd: '2%'} }>
                            איסוף בין השעות:
                        </Text>
                        <View style={ globalStyles.row }>
                            <TimePicker chosenTime={ moment(Date.now()).format('HH:mm') }
                                        setHour={ this.setExit1() }/>
                            <Text style={ globalStyles.hyphen }> - </Text>
                            <TimePicker chosenTime={ moment(Date.now()).format('HH:mm') }
                                        setHour={ this.setExit2('exit_hour2') }/>
                        </View>
                    </View>
                    <TouchableOpacity style={ [globalStyles.button, globalStyles.shadow, {
                        marginTop: '10%',
                        marginBottom: 0,
                        // borderWidth: 1,
                        backgroundColor: colors.PressedCircle,
                    }] } onPress={ this.showModal }>
                        <Text style={ globalStyles.regTextWhite }>חיפוש</Text>
                    </TouchableOpacity>
                    {/* <View style={{ flex: 3 }}>
                    <Image style={[globalStyles.image, { borderRadius: 50, width: '65%', marginTop: '3%' }]} source={require('../../../../images/realtime_driving.jpeg')} />
                </View> */ }
                    <Modal
                        isVisible={ this.state.visible }
                        onBackdropPress={ () => this.hideModal() }>
                        <View style={ {
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        } }>
                            <View style={ {width: '90%', height: '60%'} }>
                            </View>
                        </View>
                        <View style={ {flex: 3} }>
                            <MapDirections
                                origin={ {...this.state.origin, longitudeDelta: 0.003, latitudeDelta: 0.003} }
                                destination={ {...this.state.destination, longitudeDelta: 0.003, latitudeDelta: 0.003} }
                                //onRegionChange={(reg) => this.onMapRegionChange(reg)}
                            />
                            <TouchableOpacity style={ [globalStyles.button, {marginTop: '5%'}] }
                                              onPress={ this.find_real_time_groups }>
                                <Text style={ globalStyles.regTextWhite }>אישור</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                </View>
            </View>
        );
    }
}

export default RealTimeSearch;
