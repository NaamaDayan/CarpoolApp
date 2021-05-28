import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { globalStyles, colors } from '../../styles';
import Group from './Components/Group';

class Suggestions extends React.Component {
    render() {
        const groups_suggestions = Object.values(this.props.groups_suggestions);
        const user_data = this.props.navigation.state.params.user_data;
        return (
            <View style={[globalStyles.container, { padding: 0, flex: 1 }]}>
                <Text style={[globalStyles.titleText, { marginBottom: '5%' }]}>אנו מחפשים עבורך קבוצות מתאימות</Text>
                {groups_suggestions ?
                    <View style={{ flex: 1 }}>
                        <View style={[globalStyles.shadow, { backgroundColor: colors.white, width: '100%' }]}>
                            <Text style={{ fontSize: 16, marginEnd: '2%', marginBottom: '3%', marginTop: '2%' }}>היום, בין השעות {user_data['exit_hour1']}-{user_data['exit_hour2']}</Text>
                            <Text style={{ fontSize: 16, marginEnd: '2%', marginBottom: '1%' }}>מ: {user_data['source']['address_name']}</Text>
                            <Text style={{ fontSize: 16, marginEnd: '2%', marginBottom: '2%' }}>אל: {user_data['destination']['address_name']}</Text>
                        </View>
                        <Text style={[globalStyles.titleText, { marginTop: '15%', marginBottom: '5%', fontSize: 20, }]}>
                            קבוצות מומלצות עבורך
                        </Text>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                style={[{ width: '100%' }]}
                                numColumns={1}
                                data={groups_suggestions}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={{ marginTop: '2%', marginBottom: '2%' }}>
                                        <Group group={item} />
                                    </View>
                                    // <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', backgroundColor: colors.white, borderRadius: 10, marginTop: '5%', marginBottom: '5%', marginLeft: '5%', marginRight: '5%' }}>
                                    //     <View style={{ width: '70%' }}>
                                    //         <Text style={[globalStyles.regText]}>יוצאת היום בשעה {item['exit_hour']}</Text>
                                    //         <Text style={[globalStyles.regText, { marginBottom: 1 }]}>מ: {item['source']['address_name']}</Text>
                                    //         <Text style={[globalStyles.regText, { marginBottom: 1 }]}>אל: {item['destination']['address_name']}</Text>
                                    //         <TouchableOpacity style={globalStyles.button}>
                                    //             <Text>לחץ לפרטים</Text>
                                    //         </TouchableOpacity>
                                    //     </View>
                                    //     <Image style={{ width: '25%', height: '30%' }} source={require('../../../../images/drivingGroup.png')} />

                                    // </View>
                                )}
                            />
                        </View>
                    </View>

                    : <Text>מחפש עבורך קבוצות נסיעה</Text>}
            </View>
        );
    }
}



const mapStateToProps = (storeReducer) => {
    return {
        groups_suggestions: storeReducer.groups_suggestions,
    };
};


export default connect(mapStateToProps, null)(Suggestions);
