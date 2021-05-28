import React, { Component, PropTypes } from 'react';
import {
  Text,
  View
} from 'react-native';


export default class MoviePoster extends Component {

  render() {
    const { movie, movie: { Id, Name }, onOpen } = this.props;
    return (
        <Text>{Name}</Text>
    );
  }
}
