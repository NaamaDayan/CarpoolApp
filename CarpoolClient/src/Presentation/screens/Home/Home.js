import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Button, Image } from 'react-native';
import { globalStyles, colors } from '../../styles';
import DailyRide from './Components/DailyRide';
import { connect } from 'react-redux';
import { store } from '../../../../App';
import { getImage, getMonthName } from '../../../services/Utils';
import firebase from 'firebase';
import HeaderBarImage from '../../shared/Components/HeaderBarImage';
import GroupSuggestion from '../Groups/GroupSuggestion';
import Modal from 'react-native-modal';

class Home extends React.Component {

    constructor(props) {
        super(props);
        let days_const = ['יום א\'', 'יום ב\'', 'יום ג\'', 'יום ד\'', 'יום ה\'', 'יום ו\'', 'יום ש\''];
        let nDays = 7;
        let now = new Date();
        this.days = [];
        this.month = getMonthName(now.getMonth());
        for (let i = 0; i < nDays; i++) {
            let nextDay = new Date().getDay() + i;
            let nextDate = new Date();
            nextDate.setDate(new Date().getDate() + i);
            this.days.push({ day: days_const[nextDay % nDays], date: nextDate.getDate(), key: '' + (nextDay % nDays) });
        }

        this.state = {
            days: this.days, gotData: false, visible: false, suggestion_visible: false, first: true,
            month: this.month, email: store.getState()['email'],
            suggestion_visible: false,
        

        };


        this.days_db = { '0': 'Sunday', '1': 'Monday', '2': 'Tuesday', '3': 'Wednesday', '4': 'Thursday', '5': 'Friday', '6': 'Saturday' };
        

    }

    // removeGroupFromSchedule = (day, daytime) => {
    //     store.dispatch({ type: 'UPDATE_SCHEDULE', day: this.days_db[''+day], daytime: daytime});
    // }    

    pressHandlerChat = (day, daytime) => {
        const group_schedule = this.props.group_schedule;
        const group = group_schedule ? group_schedule[this.days_db['' + day]][daytime] : undefined;
        const hasGroup = group && group != -1;
        this.props.navigation.push('GroupDescription',
            { day: day, daytime: daytime, hasGroup: hasGroup, group: group, days: this.days_db}); //, removeGroupFromSchedule: this.removeGroupFromSchedule });
    };

    componentDidUpdate(prevProps) {
        if (prevProps.searched_first_group != this.props.searched_first_group) {
            this.showSuggestionModal();
        }
    }

    refuseGroup = () => {
        this.hideSuggestionModal();
    }

    acceptGroup = () => {
        this.hideSuggestionModal();
    }

    showSuggestionModal = () => this.setState({ suggestion_visible: true });
    hideSuggestionModal = () => this.setState({ suggestion_visible: false });



    pressHandlerSearch = () => {
        this.props.navigation.push('RealTimeSearch');
    };




    render() {
        const user = this.props.user;
        return (
            <View style={[globalStyles.container, { padding: 0 }]}>
                {/* <View style={{ flex: 1 }}>
                    <Modal
                        style={globalStyles.modal}
                        isVisible={this.state.visible}
                        onBackdropPress={() => this.hideFindGroupModal()}>
                        <ScrollView style={{flexDirection: 'column'}}>
                            <Text style={[globalStyles.regTextWhite, { alignSelf: 'center' }]}>  איזה כיף! מצאנו עבורך קבוצת נסיעה ראשונה! </Text>
                            <TouchableOpacity style={{alignSelf: 'center', alignContent: 'center'}} onPress={() => { this.hideFindGroupModal(); this.showSuggestionModal(); }}>
                                <Text style={globalStyles.link}>לחץ לפרטי הקבוצה</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </Modal>

                </View> */ }
                <HeaderBarImage email={this.state.email} title={'הנסיעות שלי'}
                    navigation={this.props.navigation} />
                <View style={{ flex: 1 }}>
                    <FlatList style={globalStyles.list} numColumns={1} data={this.state.days}
                        renderItem={({ item }) => (

                            <View style={[globalStyles.day, { flexDirection: 'row-reverse' }]}>
                                <View style={globalStyles.dayInfo}>
                                    <Text style={[globalStyles.titleText, globalStyles.dayInfoText]}>
                                        {item.date}
                                    </Text>
                                    <Text style={[globalStyles.titleText, { fontSize: 18 }]}>
                                        {item.day}
                                    </Text>
                                </View>
                                <View style={{ width: '80%' }}>
                                    <DailyRide from='home' to='briefcase' daytime='morning' day={''+item.key} 
                                    hasGroup={user['group_schedule'][this.days_db['' + item.key]]['morning'] != -1} 
                                    chatHandler={() => this.pressHandlerChat(item.key, "morning")} />
                                    <View style={globalStyles.line} />
                                    <DailyRide from='briefcase' to='home' daytime='evening' day={''+item.key}
                                    hasGroup={user['group_schedule'][this.days_db['' + item.key]]['evening'] != -1} 
                                    chatHandler={() => this.pressHandlerChat(item.key, "evening")} />
                                </View>
                            </View>
                        )}
                    />
                </View>
                <Modal
                    // style={globalStyles.suggestionModal}
                    isVisible={this.state.suggestion_visible}
                    onBackdropPress={() => this.hideSuggestionModal()}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{ width: '95%', height: '90%' }}>
                            <GroupSuggestion onRefuse={() => this.refuseGroup()} onAccept={()=>this.acceptGroup()} hide={()=>this.hideSuggestionModal()} />
                        </View>
                    </View>
                </Modal>
                {/* <TouchableOpacity style={[globalStyles.circle, {
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    marginRight: 30,
                    marginBottom: 30,
                }]}
                    onPress={this.pressHandlerSearch}>
                    <Text style={globalStyles.titleText}>+</Text>
                </TouchableOpacity> */ }
            </View>

        );
    }


}

const mapStateToProps = (storeReducer) => {
    return {
        email: storeReducer.email,
        user: storeReducer.user,
        group_schedule: storeReducer.group_schedule,
        searched_first_group: storeReducer.searched_first_group
    };
};


export default connect(mapStateToProps, null)(Home);
