import React, { Component, useState } from 'react';
import createRootNavigator from './src/Presentation/navigations/Navigations';
import firebase from 'firebase';
import { YellowBox, AppRegistry } from 'react-native';
import _ from 'lodash';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { apiMiddleware, reducer } from './src/redux';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

// Create Redux store
export const store = createStore(reducer, {}, applyMiddleware(apiMiddleware));
AppRegistry.registerComponent('RootNavigator', () => createRootNavigator);
const firebaseConfig = {
    apiKey: 'AIzaSyCtCalzA-IOgb9_xxFYaQZytDC47MNQjfQ',
    authDomain: 'carpool-project-5d2b3.firebaseapp.com',
    databaseURL: 'https://carpool-project-5d2b3.firebaseio.com',
    projectId: 'carpool-project-5d2b3',
    storageBucket: 'carpool-db06f.appspot.com',
    messagingSenderId: '696943443851',
    appId: '1:696943443851:web:dceda052bf1baea115f98e',
    measurementId: 'G-9C2X92LSL2',
};
firebase.initializeApp(firebaseConfig);


export default class App extends Component {

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         signedIn: false,
    //         checkedSignIn: false,
    //     };
    // }

    // componentDidMount() {
    //     if (!this.state.checkedSignIn)
    //         isSignedIn()
    //             .then((res, userData) => {
    //                 return this.setState({signedIn: res, checkedSignIn: true});
    //             })
    //             .catch(err => alert(`An error occurred ${err}`));
    // }

    render() {
        // const {checkedSignIn, signedIn} = this.state;
        // if (!checkedSignIn)
        //     return null;
        const Layout = createRootNavigator;

        return (
            <Provider store={ store }>
                <Layout/>
            </Provider>);

    }

}
