import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Button, ActivityIndicator } from 'react-native';
import { globalStyles, colors } from '../../styles';
import { connect } from 'react-redux';


class LoadingSuggestions extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidUpdate(prevProps) {
        if (prevProps.groups_suggestions !== this.props.groups_suggestions){
            this.props.navigation.navigate(this.props.groups_suggestions.length > 0 ? 'Suggestions': 'NoSuggestions');

        }
    }



    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={globalStyles.container}>
                    <Text style={globalStyles.titleText}>אנחנו מחפשים עבורך קבוצה כעת</Text>
                    <Text style={globalStyles.regText}>המערכת שלנו עושה כעת את מיטב המאמצים</Text>
                    <Text style={globalStyles.regText}>על מנת למצוא עבורך קבוצת נסיעה עם חבריך למשרד</Text>
                    <Text style={globalStyles.regText}>בסמוך ככל שניתן לזמן שביקשת</Text>
                    <ActivityIndicator size="large" />
                    {/* <View style={globalStyles.welcomeImageContainer}> */}
                    <Image style={[globalStyles.image, { borderRadius: 0, width: '90%' }]} source={require('../../../../images/drivingGroup.png')} />

                </View>
            </View>
        )
    }


}



const mapStateToProps = (storeReducer) => {
    return {
        groups_suggestions: storeReducer.groups_suggestions,
    };
};

export default connect(mapStateToProps, null)(LoadingSuggestions);
