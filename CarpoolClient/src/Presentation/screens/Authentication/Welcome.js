import React from 'react';
import { Text, TextInput, View, Button, TouchableOpacity, Image, Dimensions } from 'react-native';

import { globalStyles } from '../../styles';
import { dimension } from '../../styles/styles';

export default class Welcome extends React.Component {

    render() {
        return (
            <View style={ globalStyles.welcomeContainer }>
                <View style={ globalStyles.welcomeImageContainer }>
                    <Image style={ globalStyles.welcomeImage }
                           source={ require('../../../../images/earth_trns.png') }/>
                </View>
                <Text style={ globalStyles.welcomeTitleText }>ברוך הבא</Text>
                <Text style={ globalStyles.welcomeText }>
                    אנו ב- Jestup ומקום העבודה שלכם עושים הכל על מנת
                    שההגעה לעבודה תהיה הכי נוחה בשבילכם
                </Text>
                <TouchableOpacity style={ globalStyles.welcomeButton }
                                  onPress={ () => this.props.navigation.navigate('SignUp')}>
                    <Text style={ [globalStyles.regTextWhite, {fontSize: 20}] }>בואו נתחיל</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ globalStyles.welcomeTouchable }
                                  onPress={ () => this.props.navigation.navigate('Login') }>
                    <Text style={ globalStyles.link }>יש לי כבר חשבון</Text>
                </TouchableOpacity>

            </View>
        );
    }
}
