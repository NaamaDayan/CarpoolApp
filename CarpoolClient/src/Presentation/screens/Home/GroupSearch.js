import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Button, ActivityIndicator } from 'react-native';
import { globalStyles, colors } from '../../styles';
import { connect } from 'react-redux';
import GroupSuggestion from '../Groups/GroupSuggestion';
import Modal from 'react-native-modal';


class GroupSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { suggestion_visible: false };

    }

    componentDidUpdate(prevProps) {
        if (prevProps.searched_first_group !== this.props.searched_first_group) {
            this.showSuggestionModal()
        }
    }

    showSuggestionModal = () => this.setState({ suggestion_visible: true });
    hideSuggestionModal = () => this.setState({ suggestion_visible: false });

    refuseGroup = () => {
        this.hideSuggestionModal();
        this.props.navigation.navigate('HomeNoGroups');
    }

    acceptGroup = () => {
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    isVisible={this.state.suggestion_visible}
                    onBackdropPress={() => this.hideSuggestionModal()}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{ width: '95%', height: '90%' }}>
                                <GroupSuggestion onRefuse={()=>this.refuseGroup()} onAccept={()=>this.acceptGroup()} hide={()=>this.hideSuggestionModal()}/>
                        </View>
                    </View>
                </Modal>
                <View style={globalStyles.container}>
                    <Text style={globalStyles.titleText}>אנחנו מחפשים עבורך קבוצה כעת</Text>
                    <Text style={globalStyles.regText}>המערכת שלנו עושה כעת את מיטב המאמצים</Text>
                    <Text style={globalStyles.regText}>על מנת למצוא עבורך קבוצת נסיעה עם חבריך למשרד</Text>
                    <Text style={globalStyles.regText}>החולקים איתך את אותם הרגלי נסיעה</Text>
                    <ActivityIndicator size="large" />
                    {/* <View style={globalStyles.welcomeImageContainer}> */}
                    <Image style={[globalStyles.image, { borderRadius: 0, width: '90%' }]} source={require('../../../../images/drivingGroup.png')} />

                    {/* </View> */}
                </View>
            </View>
        )
    }


}



const mapStateToProps = (storeReducer) => {
    return {
        searched_first_group: storeReducer.searched_first_group,
    };
};

export default connect(mapStateToProps, null)(GroupSearch);
