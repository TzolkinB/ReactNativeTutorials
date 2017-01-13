import React, {Component} from 'react';
import Api                from './src/api';
import {
  AppRegistry, View, StyleSheet,
  MapView, Text
} from 'react-native';

class Weather extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      temperature: '',
      description: ''
    };
  }

  onRegionChange(region){
   this.setState({
     pin: {
      longitude: region.longitude,
      latitude: region.latitude
     }
   });

   Api(region.latitude, region.longitude)
    .then((data) => {
      console.log(data);
      this.setState(data);
    });
  }
  
  render(){
    return(
      <View style={styles.container}>
        <MapView
        annotations={[this.state.pin]}
        onRegionChange={this.onRegionChange.bind(this)}
        style={styles.map}
        >
        </MapView>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{this.state.city}</Text>
          <Text style={styles.text}>{this.state.temperature}</Text>
          <Text style={styles.text}>{this.state.description}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('weatherman', () => Weather);
