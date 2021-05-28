import React from 'react';
import { Button } from 'react-native-elements';
import { Text, View } from 'react-native';

class Settings extends React.Component {
    render() {
        return (
            <View style={ {flex: 1, justifyContent: 'center', alignItems: 'center'} }>
                <Text>Settings</Text>
                <Button
                    title="This is settings"
                />
            </View>
        );
    }

}
 export default Settings;
