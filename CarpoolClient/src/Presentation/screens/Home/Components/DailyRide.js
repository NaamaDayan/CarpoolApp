import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { globalStyles, colors } from '../../../styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ChatIconHandler from './ChatIconHandler';

class DailyRide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {home: 'בית', briefcase: 'עבודה'};
    }


    render() {
        return (
            <View style={ {
                flexDirection: 'row-reverse', justifyContent: 'center',
                alignItems: 'center', height: '50%',
            } }>
                {/*<View style={ {marginStart: 30, marginEnd: 30, justifyContent: 'center', alignItems: 'center'} }>*/ }
                {/*    <Icon name={ this.props.from } style={ globalStyles.iconStyle }/>*/ }
                {/*</View>*/ }
                <View style={ {
                    flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center',
                    width: '70%',
                } }>
                    <Feather name={ this.props.from } style={ globalStyles.dailyIcon }/>

                    <Text style={ {fontSize: 16} }>{ this.state[this.props.from] }</Text>
                    <AntDesign name='arrowleft'
                          style={ [globalStyles.dailyIcon, {fontSize: 15}] }/>
                    <Text style={ {fontSize: 15} }>{ this.state[this.props.to] }</Text>
                    <Feather name={ this.props.to } style={ globalStyles.dailyIcon }/>

                    {/*<Icon name={ this.props.to } style={ [globalStyles.dailyIcon, {paddingStart: '10%'}] }/>*/ }

                </View>
                <View style={ {width: '30%'} }>
                    <ChatIconHandler 
                    hasGroup={this.props.hasGroup}
                    daytime={this.props.daytime}
                    day={this.props.day}
                    chatPress={()=> this.props.chatHandler() }/>
                    {/* <Icon name='chat' onPress={ this.props.chatHandler }
                          style={ [globalStyles.dailyIcon, {
                              fontSize: 30,
                              color: colors.lightBlue,
                          }] }/> */}
                </View>

                {/*<View style={ {marginStart: 30, marginEnd: 30, justifyContent: 'center', alignItems: 'center'} }>*/ }
                {/*    <Icon name={ this.props.to } style={ globalStyles.iconStyle }/>*/ }
                {/*</View>*/ }


            </View>
        );
    }
}

export default DailyRide;
