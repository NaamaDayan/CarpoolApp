import React, { useState, Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { globalStyles, texts, colors } from '../../../styles';

export default class CircleDays extends Component {

    // function dayHandler = (key) => {
    //     var newDays = this.state.days.map(day => { if (day.key == key) day.hasCar = 1 - day.hasCar; return day });
    //     // newDays = [{ name: 'שבת', hasCar: 1, key: '7' }];
    //     this.setState({days: newDays});
    // }


    state = {
        days: [
            { name: 'ראשון', hasCar: 1, key: '1' },
            { name: 'שני', hasCar: 1, key: '2' },
            { name: 'שלישי', hasCar: 1, key: '3' },
            { name: 'רביעי', hasCar: 1, key: '4' },
            { name: 'חמישי', hasCar: 1, key: '5' },
            { name: 'שישי', hasCar: 0, key: '6' },
            { name: 'שבת', hasCar: 0, key: '7' }],
        circleColors: [
            colors.unPressedCircle, colors.PressedCircle]
    };



    render() {
        return (
            <FlatList style={globalStyles.list} numColumns={7} data={this.state.days} renderItem={({ item }) => (
                <TouchableOpacity style={{alignSelf: 'center'}}  onPress={() => {
                    var newDays = this.state.days.map(day => { if (day.key === item.key) day.hasCar = 1 - day.hasCar; return day });
                    this.setState({days: newDays});
                    this.props.setDays(this.state.days.map(x => x.hasCar).join(""));
                }}>
                    <View style={[{backgroundColor: this.state.circleColors[item.hasCar]}, globalStyles.circle]}>
                        <Text >{item.name}</Text>
                    </View>
                </TouchableOpacity>
            )}
            />

        );
    }
}

