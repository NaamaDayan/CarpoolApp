
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { globalStyles, colors } from '../../../styles';

import { CheckBox } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Group from '../../RealTime/Components/Group';

export default class ChooseGroup extends React.Component {

    constructor(props){
        super(props);
        this.state = { daytime : this.props.daytime, checked: true };
    }

    chooseGroup = () => {
        this.setState({ checked: !this.state.checked });
        this.props.setGroup(this.state.checked);
        
    }



    render(){
        const group = this.props.group;
        return (
            <View style={{ flexDirection: 'row', height: '30%', width: '80%', alignSelf: 'center', justifyContent: 'center', marginTop: '2%' }}>
                    <View style={{ width: '95%' }}>
                        {group ? <Group group={group} /> : <Text>No group!</Text>}
                    </View>
                    <View>
                    <CheckBox 
                    checkedIcon={<AntDesign name='checksquareo' style={ [{fontSize: 32, marginTop: '100%', color: colors.PressedCircle}] }/>} 
                    uncheckedIcon={<AntDesign name='checksquare' style={ [{fontSize: 32, marginTop: '100%', color: colors.PressedCircle}] }/>}
                    checked={this.state.checked} 
                    onPress={() => this.chooseGroup()} />
                    <Text style={globalStyles.regText}>בחר</Text>
                    </View>
                </View> 
        )
    }
}