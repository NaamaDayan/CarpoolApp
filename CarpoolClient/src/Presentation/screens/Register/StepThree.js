import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Button, AlertStatic as Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { globalStyles } from '../../styles';
import { connect } from 'react-redux';
import { store } from '../../../../App';
import * as firebase from 'firebase';

import RNFetchBlob from 'react-native-fetch-blob';


class StepThree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {firstName: '', lastName: ''};
    }

    componentDidUpdate(prevProps) {
        if (prevProps.logged !== this.props.logged) {
            const email = this.props.navigation.state.params.email;
            store.dispatch({type: 'SAVE_EMAIL', email: email});
            store.dispatch({type: 'GET_USER', data: {id: email}});

            this.props.navigation.navigate('HomeSwitch');
            daytimes = {"morning": true, "evening": true}
            store.dispatch({type: 'FIND_GROUPS', data: {email: email, daytimes: daytimes}});
        }
    }


    pressHandlerCont = async () => {
        // const alertMsg = checkData(this.state.newUser);
        // if (alertMsg.length !== 0)
        //     this.createAlert(alertMsg);
        // else
        let propsOfForm = [//this.state.photoName,
            this.state.firstName,
            this.state.lastName].filter(x => x === undefined);
        if (propsOfForm.length > 0) {
            Alert.alert('רק רגע', 'חסרים פרטים');
            return;
        }
        // this.uploadImage(this.state.uri, this.state.photoName);
        const newUser = Object.assign({},
            this.props.navigation.state.params.user, {
                'first_name': this.state.firstName,
                'last_name': this.state.lastName,
            });
        this.props.dispatch({type: 'SAVE_USER', data: newUser});
    };

    choosePhotoHandler = () => {
        ImagePicker.showImagePicker({
            title: 'בחר תמונה',
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.5,
        }, (response) => {
            if (response.didCancel)
                console.log('User cancelled image picker');
            else if (response.error)
                console.log('ImagePicker Error: ', response.error);
            else if (response.customButton)
                console.log('User tapped custom button: ', response.customButton);
            else {
                let name = this.props.navigation.state.params.email + '.jpg';
                this.setState({photoName: name, uri: response.uri});
            }
        });
    };

    uploadImage = (uri, name) => {

        let uploadBlob = null;
        const imageRef = firebase.storage().ref().child('ProfileImages/' + name);
        const fs = RNFetchBlob.fs;
        const Blob = RNFetchBlob.polyfill.Blob;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        const Fetch = RNFetchBlob.polyfill.Fetch;
        // let tempFetch = window.fetch;
        window.fetch = new Fetch({
            auto: true,
            binaryContentTypes: [
                'image/',
                'video/',
                'audio/',
                'foo/',
            ],
        }).build();
        fs.readFile(uri, 'base64')
            .then((data) => {
                return Blob.build(data, {type: 'image/jpeg;BASE64'});
            })
            .then((blob) => {
                uploadBlob = blob;
                return imageRef.put(uploadBlob, {
                    contentType: 'image/jpeg',
                });
            })
            .then(() => {
                uploadBlob.close();
                // window.fetch = tempFetch;
                return imageRef.getDownloadURL();
            })
            .catch((error) => {
                // window.fetch = tempFetch;
                uploadBlob.close();
                console.log(error);
            });
    };

    render() {
        return (
            <View style={ globalStyles.container }>
                <Text style={ globalStyles.titleText }>התחבר דרך הרשת החברתית</Text>
                <Text style={ globalStyles.regText }>כדי לתקשר בצורה קלה עם חבריך למשרד,</Text>
                <Text style={ [globalStyles.regText, {marginBottom: '20%'}] }>התחבר דרך רשת חברתית או הוסף שם
                    ותמונה</Text>
                <TouchableOpacity style={ [globalStyles.FaceBookButton, {flexDirection: 'row'}] }>
                    <Image
                        style={ globalStyles.iconImage }
                        source={ require('../../../../images/facebook.png') }/>
                    <Text style={ globalStyles.regTextWhite }>Sign in with Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity style={ [globalStyles.GoogleButton, {flexDirection: 'row'}] }
                                  onPress={ () => console.log('Hi') }>
                    <Image
                        style={ globalStyles.iconImage }
                        source={ require('../../../../images/google.png') }/>
                    <Text style={ globalStyles.regText }>Sign in with Google</Text>
                </TouchableOpacity>
                <Text style={ [globalStyles.regText, {marginTop: '20%'}] }>או התחבר באמצעות שם ותמונה</Text>

                <View style={ {flexDirection: 'row', width: '95%',height:'30%', alignSelf: 'center'} }>
                    <View style={ {flex: 1, alignSelf: 'center', alignItems: 'center'} }>
                        <TouchableOpacity onPress={ () => this.choosePhotoHandler() }>
                            <Text style={ globalStyles.link }>
                                בחר תמונה
                            </Text>
                        </TouchableOpacity>
                        {/* <Image source={ {uri: this.state.uri} } style={globalStyles.pickImage}/> */}
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <TextInput
                            placeholder="שם פרטי"
                            autoCapitalize="none"
                            style={ [globalStyles.textInput, {width: '100%'}] }
                            onChangeText={ firstName => this.setState({firstName}) }
                            value={ this.state.email }
                        />
                        <TextInput
                            placeholder="שם משפחה"
                            autoCapitalize="none"
                            style={ [globalStyles.textInput, {width: '100%'}] }
                            onChangeText={ lastName => this.setState({lastName}) }
                            value={ this.state.email }
                        />
                    </View>
                </View>


                <TouchableOpacity style={ [globalStyles.button,
                    {width: 150}] } onPress={ () => this.pressHandlerCont() }>
                    <Text style={ globalStyles.regTextWhite }>המשך</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (storeReducer) => {
    return {
        logged: storeReducer.logged,
    };
};


export default connect(mapStateToProps, null)(StepThree);
