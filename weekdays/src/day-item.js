import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

var DayItem = React.createClass({
  render() {
    return(
      <Text style={styles.day}>
        {this.props.day}
      </Text>
    )
  }
});

var styles = StyleSheet.create({
  day: {
    fontSize: 18,
    color: '#0000FF'
  }
});

//Make code available elsewhere
module.exports = DayItem; 
