import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

//var DayItem = React.createClass({
class DayItem extends React.Component {
  render() {
    return(
      <Text style={this.style()}>
        {this.props.day}
      </Text>
    );
  }
  style() {
    return {
      color: this.color(),
      fontWeight: this.fontWeight(),
      fontSize: this.fontSize(),
      lineHeight: this.lineHeight()
    }
  }
  color() {
    const opacity = 1 / this.props.daysUntil;
    return 'rgba(0,0,0,'+ opacity +')';
  }
  fontWeight() {
    const weight = 7 - this.props.daysUntil;
    return (weight * 100).toString();
  }
  fontSize() {
    return 60 - 6 * this.props.daysUntil;
  }
  lineHeight() {
    return 70 - 4 * this.props.daysUntil;
  }
};

//var styles = StyleSheet.create({
//  day: {
//    fontSize: 18,
//    color: '#0000FF'
//  }
//});

//Make code available elsewhere
module.exports = DayItem; 
