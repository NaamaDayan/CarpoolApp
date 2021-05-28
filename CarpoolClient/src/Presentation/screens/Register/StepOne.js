import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { globalStyles, texts, colors } from '../../styles';
import Icon from 'react-native-vector-icons/Feather';

import WorkPicker from './Components/WorkPicker';
import CircleDays from './Components/CircleDays';
import TimePicker from './Components/TimePicker';
import User from '../../../modules/User';
import { connect } from 'react-redux';
import { checkData } from '../../../services/Utils';

export default class StepOne extends React.Component {
    constructor(props) {
        super(props);
        // this.setState({newUser: new User()});
        this.state = {newUser: new User()};
    }

    createAlert = (alertMsg) =>
        Alert.alert(
            'בעיה קטנה..',
            alertMsg,
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );

    setStateHelper = (attr) => {
        let user = this.state.newUser;
        return (newValue) => {
            user[attr] = newValue;
            this.setState(user);
        };
    };


    pressHandlerCont = async () => {
        const alertMsg = checkData(this.state.newUser);
        if (alertMsg.length !== 0)
            this.createAlert(alertMsg);
        else
            this.props.navigation.push('StepTwo', {user: this.state.newUser});
    };

    pressHandlerSearch = () => {
        this.props.navigation.push('MapContainer', {changeAdress: this.setStateHelper('home_address')});
    };

    render() {
        return (
            <View style={ [globalStyles.container] }>
                <View style={ {flex: 1, justifyContent: 'center'} }>
                    <Text style={ [globalStyles.titleText] }>אז ספרו לנו קצת על עצמכם</Text>
                </View>
                <View style={ {flex: 2, justifyContent: 'center'} }>

                    <TouchableOpacity style={ [globalStyles.textInput, {marginBottom: '5%'}] }
                                      onPress={ this.pressHandlerSearch }>
                        <View style={ {flex: 1, alignItems: 'center', flexDirection: 'row-reverse'} }>
                            <Icon style={ {marginStart: '5%', marginEnd: '5%'} } name='search'
                                  color={ colors.darkGray }/>

                            <Text adjustsFontSizeToFit numberOfLines={ 2 } style={ [globalStyles.regTextTemp] }>
                                { this.state.newUser.home_address.address_name }
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={ [globalStyles.regText] }>מה השעות בהן אתה יוצא בדרך כלל לעבודה?</Text>
                    <View style={ globalStyles.row }>
                        <TimePicker chosenTime={ this.state.newUser.exit_hour2 }
                                    setHour={ this.setStateHelper('exit_hour2') }/>
                        <Text style={ globalStyles.hyphen }> - </Text>
                        <TimePicker chosenTime={ this.state.newUser.exit_hour1 }
                                    setHour={ this.setStateHelper('exit_hour1') }/>
                    </View>
                </View>

                <View style={ {flex: 2, justifyContent: 'center'} }>
                    <WorkPicker changeWorkPlace={ this.setStateHelper('work_address') }/>

                    <Text style={ globalStyles.regText }>מה השעות בהן אתה חוזר בדרך כלל מהעבודה?</Text>
                    <View style={ globalStyles.row }>
                        <TimePicker chosenTime={ this.state.newUser.return_hour1 }
                                    setHour={ this.setStateHelper('return_hour1') }/>
                        <Text style={ globalStyles.hyphen }> - </Text>
                        <TimePicker chosenTime={ this.state.newUser.return_hour2 }
                                    setHour={ this.setStateHelper('return_hour2') }/>
                    </View>
                </View>

                <View style={ {flex: 1, alignSelf: 'center', marginTop: '10%'} }>
                    <Text style={ globalStyles.regText }>מתי הינך מגיע לעבודה עם רכב?</Text>
                    <CircleDays setDays={ this.setStateHelper('car_days') }/>
                </View>

                <View style={ [globalStyles.row, globalStyles.stepOneBottom, {flex: 1}] }>
                    <View style={ {flex: 1} }>
                        <TouchableOpacity style={ [globalStyles.button] }
                                          onPress={ this.pressHandlerCont }>
                            <Text style={ globalStyles.regTextWhite }>המשך</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ {flex: 1} }>
                        <TouchableOpacity style={ [globalStyles.button, {width: 150}] }
                                          onPress={ () => this.props.navigation.navigate('Login') }>
                            <Text style={ globalStyles.regTextWhite }>יש לי חשבון</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}


