import React      from 'react';
import formatTime from 'minutes-seconds-milliseconds';
import {
  Text, View, AppRegistry,
  StyleSheet, TouchableHighlight
} from 'react-native';

class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    };
  }
  
  startStopButton() {
    let buttonColor = this.state.running ? styles.stopButton : styles.startButton;
    return (
      <TouchableHighlight
      underlayColor="gray"
      onPress={this.handleStartPress.bind(this)} //had to bind this so handleStartPress works properly
      style={[styles.button, buttonColor]}
      >
        <Text>
          {this.state.running ? 'Stop' : 'Start'}
        </Text>
      </TouchableHighlight>
    );
  }

  lapButton() {
    return (
      <TouchableHighlight 
      style={styles.button}
      underlayColor="gray"
      onPress={this.handleLapPress.bind(this)}
      >
        <Text>
          Lap
        </Text>
      </TouchableHighlight>
    );
  }

  clearButton(){
    return (
      <TouchableHighlight
      style={[styles.button, styles.stopButton]}
      underlayColor="gray"
      onPress={this.handleClearPress.bind(this)}
      >
        <Text>
          Clear
        </Text>
      </TouchableHighlight>
    );
  }

  handleStartPress() {
    if(this.state.running){
      clearInterval(this.interval);
      this.setState({running: false});
      return
    }
    
    this.setState({startTime: new Date()});
    
    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 30);
  }

  handleLapPress() {
    const lap = this.state.timeElapsed;

    this.setState({ 
      startTime: new Date(),
      laps: this.state.laps.concat([lap]) //use concat not push bc we never want to modify our state
    });
  }

  handleClearPress() {
    if(this.state.running){
      clearInterval(this.interval);
      this.setState({
        running: false,
        laps: []
      });
      this.setState({
        laps: [],
      });
    }
  }

  laps() {
    return this.state.laps.map((time, index) => {
      return (
        <View style={styles.lap}>
          <Text style={styles.lapText}>
            Lap #{index + 1}
          </Text>
          <Text style={styles.lapText}>
            {formatTime(time)}
          </Text>
        </View>  
      )
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.timerWrapper}>
            <Text style={styles.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            {this.startStopButton()}
            {this.lapButton()}
            {this.clearButton()}
          </View>
        </View>
        <View style={styles.footer}>
          {this.laps()}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen
    alignItems: 'stretch'
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row', //default direction is Col 
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);
