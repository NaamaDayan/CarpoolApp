import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { globalStyles, colors } from '../../../styles';
import { store } from '../../../../../App';
import {days_db} from '../../../../services/Utils';

class ChatIconHandler extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            loading: false, 
            suggestion_visible: false, 
            hasGroup: this.props.hasGroup,
            daytime: this.props.daytime, 
            day: this.props.day,
            group: this.props.group };
    }
בםמד
    findGroup = (daytime) => {
        isMorning = daytime == "morning"
        daytimes = {"morning": isMorning, "evening": !isMorning}
        store.dispatch({ type: 'FIND_GROUPS', data: { email: this.props.email, daytimes: daytimes } });
        this.setState({ loading: true });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searched_first_group != this.props.searched_first_group) {
            this.setState({loading : false});      
        }
    }



    render() {
        const hasGroup = this.state.hasGroup && this.props.user['group_schedule'][days_db[''+this.state.day]][this.state.daytime] != -1;
        return (
            <View>
                {hasGroup ?
                    <Icon name='chat' onPress={() => this.props.chatPress()}
                        style={[globalStyles.dailyIcon, {
                            fontSize: 30,
                            color: colors.lightBlue,
                            marginStart: '25%'
                        }]} />
                    :
                    <View>
                        {this.state.loading ?
                            <ActivityIndicator /> :
                            <TouchableOpacity style={[globalStyles.button2, { width: '60%', height: '80%' }]} onPress={() => this.findGroup(this.props.daytime)}>
                                <Text style={[globalStyles.regText, { color: colors.gray, fontWeight: 'bold' }]}>חפש קבוצה!</Text>
                            </TouchableOpacity>
                        }
                        
                    </View>
                }
            </View>
        )
    }


}


const mapStateToProps = (storeReducer) => {
    return {
        email: storeReducer.email,
        searched_first_group: storeReducer.searched_first_group,
        user: storeReducer.user,
    };
};


export default connect(mapStateToProps, null)(ChatIconHandler);