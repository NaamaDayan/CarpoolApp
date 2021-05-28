import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Button } from 'react-native';
import { globalStyles, colors } from '../../styles';
import { connect } from 'react-redux';
import { store } from '../../../../App';


class HomeSwitch extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.got_data !== this.props.got_data )
            if (this.props.group_schedule)
                this.props.navigation.navigate('Home'); 
            else
                this.props.navigation.navigate(this.props.searched_first_group>0? 'HomeNoGroups': 'HomeNoGroups');
    }

    render(){
        return(
            <Text>Loading groups</Text>
        )
    }

}

const mapStateToProps = (storeReducer) => {
    return {
        searched_first_group: storeReducer.searched_first_group,
        group_schedule: storeReducer.group_schedule,
        got_data: storeReducer.got_data,
    };
};

export default connect(mapStateToProps, null)(HomeSwitch);
