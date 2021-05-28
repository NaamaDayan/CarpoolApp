import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Button, ActivityIndicator } from 'react-native';
import { globalStyles, colors } from '../../styles';
import { connect } from 'react-redux';


export default class NoSuggestions extends React.Component {
    constructor(props) {
        super(props);

    }



    render() {
        return (
            <View style={globalStyles.container}>
               <Text style={globalStyles.titleText}>לצערנו, אין קבוצות מתאימות כרגע</Text>
            </View>
        )
    }


}
