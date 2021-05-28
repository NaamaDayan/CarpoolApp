import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { globalStyles } from '../../styles';

export default function StepFour({ navigation }) {

    const pressHandler = () => {
        navigation.navigate('Home');
        // navigation.goBack();
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.regText}>כדי לתקשר בצורה קלה עם חבריך למשרד,</Text>
            <Text style={globalStyles.regText}>הוסף את מספר הטלפון שלך</Text>
            <Image style={globalStyles.image} source = {require('../../../../images/phone.png')} />
            <TouchableOpacity style={[globalStyles.button, { width: 150 }]} onPress={pressHandler}>
                <Text style={globalStyles.regTextWhite}>המשך</Text>
            </TouchableOpacity>
        </View>
    );
}
