import React, { useState, Component } from "react";
import { Button, View, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import { globalStyles } from "../../../styles";


export default class TimePicker extends Component {
    constructor(props){
        super(props);
        this.state = {isVisible:false, chosenTime: this.props.chosenTime};
    }

    

    handlePicker = (datetime) => {
        this.setState({
            isVisible : false, 
            chosenTime: moment(datetime).format('HH:mm'),
        });
        this.props.setHour(this.state.chosenTime);
    }

    showPicker = () => {
        this.setState({isVisible : true})
    }
    
    hideDatePicker = () => {
        this.setState({isVisible : false})
    }
    render() {
        return (
            <View>
                <TouchableOpacity style = {globalStyles.button} onPress = {this.showPicker}>
                    <Text style = {globalStyles.regTextWhite}>{this.state.chosenTime}</Text>
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.isVisible}
                    onConfirm={this.handlePicker}
                    onCancel={this.hideDatePicker}
                    mode='time'
                />
            </View>
        );
    }
};

