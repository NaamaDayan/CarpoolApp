import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { globalStyles, colors } from '../../../styles';
import { connect } from 'react-redux';
import { getImage } from '../../../../services/Utils';

// @connect(
//     state => ({
//         email: state.email,
//         group: state.group,
//         loading: state.loading,
//     })
// )
export default class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = { group: this.props.group, loading: true };
        this.state.group['users'].forEach(user => {
            this.getImages(user['email'], user['email']);
        });
    }

    getImages = (email_real, email_not_exist) => {
        const ref = getImage(email_not_exist);
        ref.getDownloadURL().then(uri => {
            const users = this.state.group['users'];
            if (email_real == users[users.length - 1]['email'])
                this.setState({ loading: false });
            this.setState({ [email_real]: uri });
        }).catch(e => {
            console.log("error:", e);
            this.getImages(email_real, "profile");
        });
    }


    render() {
        const group = this.props.group;
        const days = {
            '0': 'ראשון',
            '1': 'שני',
            '2': 'שלישי',
            '3': 'רביעי',
            '4': 'חמישי',
            '5': 'שישי',
            '6': 'שבת',
        };
        return (
            <View>
                <Text style={[globalStyles.titleText, { marginTop: 0, marginBottom: '1%' }]}>פרטי הקבוצה</Text>
                {group ?
                    <View >
                        <View style={[globalStyles.shadow, { backgroundColor: colors.white, borderRadius: 10, width: '100%' }]}>
                            <Text style={[globalStyles.titleText, { fontSize: 16, alignSelf: 'flex-end', color: colors.PressedCircle }]}>חברי הקבוצה</Text>

                            <FlatList
                                // style={globalStyles.list} 
                                numColumns={1}
                                data={this.props.includeSelf ? group['users'] : group['users'].filter(x => x['email'] != this.props.email && x['first_name'])}
                                renderItem={({ item }) => (
                                    <View>
                                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                            <Text style={[globalStyles.regText]}>{item['first_name']} {item['last_name']}</Text>
                                            <Image
                                                style={{ height: 50, width: 50, borderRadius: 50, marginEnd: '2%', marginStart: '2%', marginBottom: '2%', marginTop: '2%' }}
                                                source={{ uri: this.state[item['email']] }} />
                                        </View>

                                    </View>
                                ) }
                                keyExtractor={ (item, index) => index.toString() }
                            />
                        </View>
                        <View style={[{ backgroundColor: colors.white, marginTop: '3%', alignContent: 'flex-end', alignItems: 'flex-end', borderRadius: 10 }, globalStyles.shadow]}>
                            <Text style={[globalStyles.regText, { marginBottom: 1, fontSize: 14, color: colors.gray, alignSelf: 'flex-end' , marginEnd: '1%'}]}>שעת יציאה</Text>
                            <Text style={[globalStyles.regText, { marginBottom: 1, alignSelf: 'flex-end', marginEnd: '1%' }]}>{days[this.props.day]}, {this.props.hour}</Text>
                            <View style={[globalStyles.line, { borderBottomColor: colors.lightGray, marginTop: '1%', marginBottom: '1%' }]} />

                            <Text style={[globalStyles.regText, { marginBottom: 1, fontSize: 14, color: colors.gray, alignSelf: 'flex-end', marginEnd: '1%' }]}>מסלול נסיעה</Text>
                            <Text style={[globalStyles.regText, { marginBottom: 1, alignSelf: 'flex-end', marginEnd: '1%'}]}>מ {group['source']['address_name']}</Text>
                            <Text style={[globalStyles.regText, { marginBottom: 1, alignSelf: 'flex-end' , marginEnd: '1%'}]}>אל {group['destination']['address_name']}</Text>
                            <View style={[globalStyles.line, { borderBottomColor: colors.lightGray }]} />
                            
                        </View>
                    </View>
                    :
                    <Text style={ globalStyles.regText }>אין מידע זמין</Text>

                }
            </View>
        );
    }
}


