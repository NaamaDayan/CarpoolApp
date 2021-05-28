import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { getImage } from '../../../services/Utils';
import globalStyles from '../../styles/styles';
import colors from '../../styles/colors';

export default class HeaderBarImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: this.props.email, title: this.props.title};
        const ref = getImage(this.state.email);
        ref.getDownloadURL().then(uri => {
            this.setState({uri: uri});
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        return (
            <View style={ globalStyles.header }>
                <Text style={ [globalStyles.titleText,
                    {color: colors.white, flex: 3, marginEnd: '2%'}] }>{this.state.title}</Text>
                <TouchableOpacity style={{flex: 1, marginStart: '2%'}} onPress={ () => this.props.navigation.navigate('Profile') }>
                    {
                        this.state.uri ?
                            <Image
                                style={ globalStyles.homeImage }
                                source={ {uri: this.state.uri} }/>
                            :
                            <Image
                                style={ globalStyles.homeImage }
                                source={ require('../../../../images/profile.png') }/>
                    }
                </TouchableOpacity>

            </View>

        );

    }
}
