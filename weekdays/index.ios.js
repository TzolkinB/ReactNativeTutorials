import React, {Component} from 'react';
import DayItem            from './src/day-item';
import Moment             from 'moment';
import {
  AppRegistry, View, Text,
  StyleSheet
} from 'react-native';

//var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

//var Weekdays = React.createClass({
class Weekdays extends React.Component {
  
  dayList() {
    const daysItems = [];
    for(var i=0; i<7; i++){
      const day = Moment().add(i, 'days').format('dddd');
      daysItems.push(
        <DayItem day={day} daysUntil={i} />
      )
    }
    return daysItems
    //return days.map(day => <DayItem day={day} />
    //);
  } 

  render(){
  
    return ( 
      <View style={styles.container}>
        <Text>
          Today is: {Moment().format('ddd')}
        </Text>
        <Text style={styles.textStyle}>
          Days of the Week Starting with Today:
        </Text>
        {this.dayList()}
      </View>
    )
  }
};

// Style the react component
var styles = StyleSheet.create({
  container: {
    flex: 1, //flexbox 1 is height and width 100%
    justifyContent: 'center', // vertical(y) align
    alignItems: 'center' // aligns horizontally(x)
  },
    textStyle: {
      color: 'green',
      fontWeight: '700'
  }
});

//Show component on the screen
AppRegistry.registerComponent('weekdays', function() {
  return Weekdays
});



