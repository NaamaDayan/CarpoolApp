// import React from 'react';
// import { View, Text, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles';


import React from 'react';
import { Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import { store } from '../../../../App';

import firebase2 from 'react-native-firebase';
import { connect } from 'react-redux';

const firebase = require('firebase');

// export const sendData = (userData) => {
//     console.log('uudd', userData);
//     return dispatch => {
//         return () => {
//             dispatch({type: 'SAVE_USER', data: userData});
//         };
//     };
//
// };
// const mapDispatchToProps = dispatch => {
//     return {
//         sendData: userData => dispatch({type: 'SAVE_USER', data: userData}),
//     };
// };


class StepTwo extends React.Component {

    constructor() {
        super();
        this.state = {email: '', password: '', errorMessage: null};
    }

    // controller = new AbortController();

    // componentWillUnmount() {
    //     this.controller.abort();
    // }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.logged !== this.props.logged) {
    //         store.dispatch({type: 'SAVE_EMAIL', email: this.state.email});
    //         const newUser = Object.assign({},
    //                     this.props.navigation.state.params.user, {'email': this.state.email});
    //         console.log("before navigate!!!");
    //         store.dispatch({type: 'FIND_GROUPS', data: {email: this.state.email}});
    //         console.log("OK!!!!");
    //     }
    // }

    handleSignUp = () => {
        const {email, password} = this.state;
        firebase2.auth()
            .createUserWithEmailAndPassword(email.trim(), password).then(user =>
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(() => {
                    const newUser = Object.assign({},
                        this.props.navigation.state.params.user, {'email': email});
                    this.props.navigation.push('StepThree', {user: newUser, email: email});
                    // this.props.dispatch({type: 'SAVE_USER', data: newUser});
                    // store.subscribe(() => {
                    // });
                }).catch(e => {
                error(e.message);
                this.setState({errorMessage: error.message});
            }),
        ).catch(error => {
            error(error.measure);
            this.setState({errorMessage: error.message});
        });
    };

    render() {
        return (
            <View style={ globalStyles.container }>
                <Text style={ [globalStyles.titleText, {marginTop: 0, marginBottom: '20%'}] }>ברוך הבא!</Text>
                <Text style={ globalStyles.regText }>הירשם עם כתובת האימייל של המשרד </Text>
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
                <TouchableOpacity style={ [globalStyles.button, {width: 150, marginBottom: '10%', marginTop: '40%'}] }
                                  onPress={ () => this.handleSignUp() }>
                    <Text style={ globalStyles.regTextWhite }>המשך</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ [globalStyles.button, {width: 150, marginBottom: '5%'}] }
                                  onPress={ () => this.props.navigation.navigate('Login') }>
                    <Text style={ globalStyles.regTextWhite }>יש לי כבר חשבון</Text>
                </TouchableOpacity>

            </View>
        );
    }
}


// const mapStateToProps = (storeReducer) => {
//     return {
//         logged: storeReducer.logged,
//     };
// };

export default connect(null, null)(StepTwo);
