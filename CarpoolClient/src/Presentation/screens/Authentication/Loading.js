import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import { store } from '../../../../App';

let onceFlag = true;

export default class Loading extends React.Component {

    
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {

            if (onceFlag) {
                onceFlag = false;
                if (user) {
                    store.dispatch({ type: 'SAVE_EMAIL', email: user['email'] });
                    store.dispatch({ type: 'GET_USER', data: { id: user['email'] } });
                }
                this.props.navigation.navigate(user ? 'Home' : 'Welcome');
            }
        });
    }

    // controller = new AbortController();

    // componentWillUnmount() {
    //     this.controller.abort();
    // }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
