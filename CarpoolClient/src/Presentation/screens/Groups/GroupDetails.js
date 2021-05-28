import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import Description from './Components/Description';
import { connect } from 'react-redux';
import { store } from '../../../../App';
import { globalStyles, colors } from '../../../Presentation/styles';


class GroupDetails extends React.Component {

    constructor(props) {
        super(props);
        this.hasGroup = this.props.navigation.state.params.hasGroup;
        this.group = this.props.navigation.state.params.group;
        this.group_day = '' + this.props.navigation.state.params.day;
        this.daytime = this.props.navigation.state.params.daytime;
        this.days = this.props.navigation.state.params.days;
        // this.removeGroupFromSchedule = this.props.navigation.state.params.removeGroupFromSchedule;
    }


    removeFromGroup = () => {
        let user_group_schedule = this.props.user['group_schedule'];
        let group_id = user_group_schedule[this.days[this.group_day]][this.daytime];
        store.dispatch({ type: 'REMOVE_USER_FROM_GROUP', data: { email: this.props.email, group_id: group_id } });
        this.props.navigation.navigate('Home');
        
        // this.removeGroupFromSchedule(this.group_day, this.daytime);

    }

    render() {
        const hasGroup = this.props.user['group_schedule'][this.days[this.group_day]][this.daytime] != -1
        // const group_schedule = this.props.group_schedule;
        // const group = group_schedule ? group_schedule[this.days[this.group_day]][this.daytime] : undefined;
        // const hasGroup = group && group != -1 ;
        return (
            <View style={[globalStyles.container, {padding: 0}]}>
                
                {hasGroup ?
                    <View style={[globalStyles.container, { padding: 0, justifyContent: 'flex-start' }]}>
                        
                        <Image
                            style={{ height: '22%', width: '100%', alignSelf: 'center' }}
                            source={require('../../../../images/lawyers_group.jpg')} />
                        <Description
                            includeSelf={true}
                            group={this.group} 
                            day={this.group_day} hour={this.group['schedule'][this.days[this.group_day]]}/>
                        <TouchableOpacity style={[globalStyles.button2, { backgroundColor: 'rgb(144,214,212)', height: '7%'}]} onPress={() => this.removeFromGroup()}>
                            <Text style={globalStyles.regTextWhite}>צא מהקבוצה</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <Text>אתה לא נמצא באף קבוצה כרגע</Text>
                    
                }
            </View>
        )
    }
}


const mapStateToProps = (storeReducer) => {
    return {
        email: storeReducer.email,
        user: storeReducer.user,
        // group_schedule: storeReducer.group_schedule,
    };
};


export default connect(mapStateToProps, null)(GroupDetails);
