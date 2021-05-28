import React from 'react';
import { Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import { store } from '../../../../App';
import { globalStyles } from '../../styles';

import firebase from 'react-native-firebase';

const firebase2 = require('firebase');


export default class StepTwo extends React.Component {

    constructor() {
        super();
        this.state = {email: '', password: '', errorMessage: null};
    }

    handleLogin = () => {
        const {email, password} = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email.trim(), password)
            .then(() => {
                    firebase2.auth().setPersistence(firebase2.auth.Auth.Persistence.LOCAL)
                        .then(() => {
                            store.dispatch({type: 'SAVE_EMAIL', email: email});
                            store.dispatch({type: 'GET_USER', data: {id: email}});

                            this.props.navigation.navigate('Home');
                        });
                },
            )
            .catch(error => this.setState({errorMessage: error.message}));
    };

    render() {
        return (
            <View style={ globalStyles.container }>
                <Text style={ globalStyles.titleText }>התחברו</Text>
                <Text style={ globalStyles.regText }>הכניסו את המייל הארגוני ואת הסיסמא</Text>
                { this.state.errorMessage &&
                <Text style={ {color: 'red'} }>
                    { this.state.errorMessage }
                </Text> }
                <TextInput
                    placeholder="example@justice.il"
                    autoCapitalize="none"
                    style={ globalStyles.textInput }
                    onChangeText={ email => this.setState({email}) }
                    value={ this.state.email }
                />
                <TextInput
                    secureTextEntry
                    placeholder="סיסמה"
                    autoCapitalize="none"
                    style={ globalStyles.textInput }
                    onChangeText={ password => this.setState({password}) }
                    value={ this.state.password }
                />
                <TouchableOpacity style={ [globalStyles.button, {width: 150, marginBottom: '5%'}] }
                                  onPress={ () => this.handleLogin() }>
                    <Text style={ globalStyles.regTextWhite }>יאללה!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ [globalStyles.welcomeTouchable, {alignSelf: 'center', marginBottom: '5%'}] }
                                  onPress={ () => this.props.navigation.navigate('SignUp') }>
                    <Text style={ globalStyles.link }>אשמח להירשם</Text>
                </TouchableOpacity>

            </View>
        );
    }
}
