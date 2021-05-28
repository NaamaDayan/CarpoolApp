import React from 'react';
import { Text, View, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { globalStyles } from '../../styles';
import firebase2 from 'react-native-firebase';
import { StyleSheet } from 'react-native';
import { store } from '../../../../App';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Collapsible from 'react-native-collapsible';
import { getImage } from '../../../services/Utils';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groupsCollapsed: true,
            email: store.getState()['email'],
        };
        // this.toggleGroups = this.toggleGroups.bind(this)
        const ref = getImage(this.state.email);
        ref.getDownloadURL().then(uri => {
            // this.state = Object.assign({}, this.state, {uri: uri});
            this.setState({uri: uri});
        }).catch(e => {
            console.log(e);
        });
    }

    controller = new AbortController();

    componentWillUnmount() {
        this.controller.abort();
    }

    getSignOutAlert = (alertMsg) => {
        Alert.alert(
            'בעיה קטנה..',
            alertMsg,
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    };

    signOut = () => {
        let props = this.props;

        firebase2.auth().signOut().then(function () {
            // props.navigation.dispatch({ type: 'Navigation/BACK' });
            props.navigation.dispatch(
                {
                    type: 'Navigation/NAVIGATE',
                    routeName: 'RootNavigator',
                    // action: {
                    //   type: 'Navigation/NAVIGATE',
                    //   routeName: 'GoToAScreenInANavigator',
                    // }
                },
            );

            // props.navigation.navigate('ProfileStackScreens', {}, NavigationActions.goBack());
        }).catch(function (error) {
            console.log(error);
        });
    };

    toggleGroups() {
        this.setState({groupsCollapsed: !this.state.groupsCollapsed});
    }

    render() {
        return (
            <View style={ [globalStyles.menuContainer, {alignItems: 'center'}] }>
                <View style={ {flexDirection: 'row', paddingTop: '10%', marginBottom: '5%'} }>
                    <View style={ {justifyContent: 'center', paddingEnd: '5%'} }>
                        <Text style={ [globalStyles.nameText, {alignSelf: 'center'}] }>
                            { this.props.user['first_name'] } { this.props.user['last_name'] }
                        </Text>
                        <TouchableOpacity onPress={ () => {
                        } } style={ {flexDirection: 'row'} }>
                            <Text style={ [globalStyles.regText] }>ערוך</Text>
                            <MaterialCommunityIcons name="pencil" size={ 26 }/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        { this.state.uri !== null && this.state.uri !== '' ?
                            <Image
                                style={ globalStyles.menuImage }
                                source={ {uri: this.state.uri} }/>
                            :
                            <Image
                                style={ globalStyles.menuImage }
                                source={ require('../../../../images/profile.png') }/>
                        }
                    </View>
                </View>

                <View style={ {flex: 1, alignItems: 'center', width: '100%'} }>


                    <TouchableOpacity style={ [globalStyles.menuButton] }
                                      onPress={ () => this.toggleGroups() }>
                        <Text style={ globalStyles.menuText }>הקבוצות שלי</Text>
                    </TouchableOpacity>

                    <View style={ [globalStyles.full] }>
                        <Collapsible collapsed={ this.state.groupsCollapsed } style={ globalStyles.collapsible }>
                            {
                                this.props.groups_schedule !== undefined &&
                                (
                                    <TouchableOpacity style={ globalStyles.menuCollapsed }>
                                        <Text style={ globalStyles.menuText }>
                                            קבוצה של יום כלשהו עם { this.props.groups_schedule['Sunday']['morning'] }
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        </Collapsible>
                    </View>

                    <TouchableOpacity style={ [globalStyles.menuButton] }
                                      onPress={ () => {
                                      } }>
                        <Text style={ globalStyles.menuText }>התראות</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ [globalStyles.menuButton] }
                                      onPress={ () => {
                                      } }>
                        <Text style={ globalStyles.menuText }>ערוך פרופיל</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ [globalStyles.menuButton, {borderBottomWidth: 1}] }
                                      onPress={ () => this.signOut() }>
                        <Text style={ globalStyles.menuText }>התנתק</Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    wrapperCollapsibleList: {
        // flex: 1,
        // marginTop: 20,
        // overflow: "hidden",
        // backgroundColor: "#FFF",
        // borderRadius: 5
    },
    collapsibleItem: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 10,
    },
});
const mapStateToProps = (storeReducer) => {
    return {
        user: storeReducer.user,
        groups: storeReducer.group,
    };
};

export default connect(mapStateToProps, null)(Profile);
