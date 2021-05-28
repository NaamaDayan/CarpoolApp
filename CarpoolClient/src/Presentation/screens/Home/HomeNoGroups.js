import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles, colors } from '../../styles';
import { store } from '../../../../App';
import { connect } from 'react-redux';

class HomeNoGroups extends React.Component {
    
    findGroup = () => {
        daytimes = {"morning": true, "evening": true}
        store.dispatch({type: 'FIND_GROUPS', data: {email: this.props.email, daytimes: daytimes}});
        this.props.navigation.navigate('GroupSearch');
    }

    render(){
        return(
            <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>לא נמצאו עבורך קבוצות כרגע</Text>
            <TouchableOpacity style={[globalStyles.button, {width: '40%', marginTop: '20%'}]} onPress={()=> this.findGroup()}>
                <Text style={globalStyles.regTextWhite}>נסה לחפש קבוצה</Text>
            </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (storeReducer) => {
    return {
        email: storeReducer.email,
    };
};

export default connect(mapStateToProps, null)(HomeNoGroups);