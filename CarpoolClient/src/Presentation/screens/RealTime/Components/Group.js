import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { globalStyles, colors } from '../../../styles';
import * as firebase from 'firebase';
import Modal from 'react-native-modal';
import Description from '../../Groups/Components/Description';
import { getDays } from '../../../../services/Utils';

class Group extends React.Component {

    constructor(props) {
        super(props);
        this.state = { group: this.fillGroup(this.props.group), loading: true, num_users: 4, visible: false };
        this.state.group['users'].forEach(user => {
            this.getImage(user['email']);
        });

    }

    fillGroup = (group) => {
        let i = 0;
        console.log("group:", group);
        for (i = group['users'].length; i < 4; i++)
            group['users'].push({ email: 'profile' });
        return group
    }

    getImage = (email) => {
        const ref = firebase.storage().ref('ProfileImages/' + email + '.jpg');
        ref.getDownloadURL().then(uri => {
            const users = this.state.group['users'];
            if (email === users[users.length - 1]['email'])
                this.setState({ loading: false });
            this.setState({ [email]: uri });
        }).catch(e => {
            console.log("error:", e);
            this.getImage('profile');
        });
    }


    showModal = () => this.setState({ visible: true });
    hideModal = () => this.setState({ visible: false });


   

    render() {
        const loading = this.state.loading;
        return (
            <View style={{flex: 1}}>
                {loading ?
                    <View>
                        <Text>Loading</Text>
                        <ActivityIndicator size='large' />
                    </View>
                    :
                    <View style={[globalStyles.shadow, globalStyles.padding2, { alignSelf: 'center', width: '95%', backgroundColor: colors.white, borderRadius: 10, alignItems: 'center' }]}>
                        <Text style={[globalStyles.regText, { fontSize: 16, fontWeight: 'bold', color: colors.gray }]}>
                            יוצאת בימי:
                        </Text>
                        <Text style={[globalStyles.regText, {fontSize: 14, color: colors.gray }]}> 
                            {getDays(this.state.group)}
                        </Text>


                        <View style={[globalStyles.border,
                            { 
                            width: '70%',
                             borderRadius: 10,
                              borderColor: colors.almostWhite,
                               alignItems: 'center', justifyContent: 'center' }, globalStyles.padding]}>
                            <FlatList
                                numColumns={3}
                                contentContainerStyle={{ flexGrow: 1 }}
                                data={this.state.group['users'].filter(x => x['email'] != this.props.email).slice(0, 3)}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={{marginStart:'2%', marginEnd: '2%'}}>
                                        <Image
                                            style={{ height: 60, width: 60, borderRadius: 30}}
                                            source={{ uri: this.state[item['email']] }} />
                                    </View>
                                )}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => this.showModal()}
                            style={[globalStyles.border, { height: '15%', backgroundColor: colors.white, padding: 0, marginTop: '3%' }]}
                        >
                            <Text>לפרטים</Text>
                        </TouchableOpacity>
                    </View>
                }
                <Modal
                    isVisible={this.state.visible}
                    onBackdropPress={() => this.hideModal()}>
                    <View style={
                        {
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View style={[{ width: '90%', borderRadius: 10 }]}>
                            <Description
                                includeSelf={false}
                                hour= {getDays(this.state.group)}
                                group={this.state.group}
                                prevState={this.state}
                                email={this.props.email} />

                        </View>
                    </View>
                </Modal>
            </View>
        )
    }


}

const mapStateToProps = (storeReducer) => {
    return {
        email: storeReducer.email,
    };
};

export default connect(mapStateToProps, null)(Group);
