import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { globalStyles, colors } from '../../styles';
import { connect } from 'react-redux';
import ChooseGroup from './Components/ChooseGroup';
import { store } from '../../../../App';



class GroupSuggestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = { checked_morning: false, checked_evening: false };
    }

    removeUserFromGroup = (groupId) => {
        store.dispatch({ type: 'REMOVE_USER_FROM_GROUP', data: { email: this.props.email, group_id: groupId } });
    };

    handleAccept = () => {
        console.log("checked:", this.state.checked_evening, this.state.checked_morning);
        if (!this.state.checked_morning && this.props.morning_group)
            this.removeUserFromGroup(this.props.morning_group['group_id']);

        if (!this.state.checked_evening && this.props.evening)
            this.removeUserFromGroup(this.props.evening_group['group_id']);

    }

    handleRefuse = () => {
        if (this.props.morning_group)
            this.removeUserFromGroup(this.props.morning_group['group_id']);
        if (this.props.evening_group)
            this.removeUserFromGroup(this.props.evening_group['group_id']);
    }



    render() {
        const morning = this.props.morning_group; //suggestion for morning exists
        const morning_group = morning ? morning['group'] : undefined;
        const evening = this.props.evening_group;
        const evening_group = evening ? this.props.evening_group['group'] : undefined;
        return (
            <View style={[globalStyles.container, { borderRadius: 10 }]}>
                {(!evening_group && !morning_group) ?
                    <View style={{ justifyContent: 'space-between' }}>
                        <Text style={globalStyles.titleText}>לצערינו,{"\n"}לא נמצאו עבורך קבוצות כרגע</Text>
                        <TouchableOpacity onPress={() => this.props.hide()}
                            style={[globalStyles.button, { width: '30%', height: '20%' }]}>
                            <Text style={globalStyles.regTextWhite}>אישור</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                            justifyContent: 'center',
                            marginTop: '10%',
                        }}>

                            <Text style={[globalStyles.titleText, { marginRight: '5%' }]}>
                                מצאנו לך קבוצות!
                            </Text>
                            <Image style={[globalStyles.image, { borderRadius: 0, width: '25%', height: '90%', marginBottom: '15%' }]}
                                source={require('../../../../images/earth_trns.png')} />
                        </View>
                        {/* <Text style={[globalStyles.titleText, {fontSize: 18}]}>תרצה להצטרף?</Text> */}
                        {morning_group ? <ChooseGroup group={morning_group} daytime="morning" setGroup={(isChecked) => this.setState({ checked_morning: isChecked })} /> : <View></View>}
                        {evening_group ? <ChooseGroup group={evening_group} daytime="evening" setGroup={(isChecked) => this.setState({ checked_evening: isChecked })} /> : <View></View>}

                        <Text style={[globalStyles.titleText, { marginBottom: '5%' }]}>תרצה להצטרף?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                style={[globalStyles.navigationButtonEnd, globalStyles.navigationButtonStyle]}
                                onPress={() => {
                                    this.props.onAccept();
                                    this.handleAccept();
                                }}>
                                <Text style={globalStyles.regTextWhite}>הצטרף!</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[globalStyles.navigationButtonStart, globalStyles.navigationButtonStyle]}
                                onPress={() => {
                                    this.props.onRefuse();
                                    this.handleRefuse();
                                }}>
                                <Text style={globalStyles.regTextWhite}>לא, תודה</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = (storeReducer) => {
    return {
        email: storeReducer.email,
        morning_group: storeReducer.morning_group,
        evening_group: storeReducer.evening_group,
    };
};

export default connect(mapStateToProps, null)(GroupSuggestion);
