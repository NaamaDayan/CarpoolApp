import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { globalStyles, texts, colors } from '../../../styles';
import { connect } from 'react-redux';
import { store } from '../../../../../App';

@connect(
    state => ({
        work_places: state.work_places,
        loading: state.loading,
    })
)
class WorkPicker extends Component {
    constructor(props) {
        super(props);
        store.dispatch({type: 'GET_WORK_PLACES'})
    }

    state = {place: ' '};

    updatePlace = (place) => {
        this.props.changeWorkPlace(place);
        this.setState({place: place});
    };

    render() {
        const {work_places, loading, refresh} = this.props;
        return (
            <View style={ globalStyles.textInput }>
                <Picker style={ globalStyles.PickeritemStyle } selectedValue={ this.state.place }
                        onValueChange={ (x) => this.updatePlace(x) }>
                    <Picker.Item label="איפה אתה עובד?" value="workPlace"/>
                    { work_places ?
                        work_places.map((work_place, index) =>
                            <Picker.Item label={ work_place['workplace_name'] }
                                         value={ work_place['workplace_name'] }
                                         key={ index }/>)
                        : <Picker.Item label=" " value="workPlace"/> }
                </Picker>
            </View>
        );
    }

}

export default WorkPicker;


/* <Picker.Item label="לשכה ראשית" value="לשכה " />
           // <Picker.Item label="תל אביב" value="תל אביב" /> */
