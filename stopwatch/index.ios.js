import React from 'react';
import {
  Text, View, AppRegistry,
  StyleSheet
} from 'react-native';

class StopWatch extends React.Component {
  
  startStopButton() {
    return (
      <View>
        <Text>
          Start
        </Text>
      </View>
    );
  }

  lapButton() {
    return (
      <View>
        <Text>
          Lap
        </Text>
      </View>
    );
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text>
              00:00.00
            </Text>
          </View>
          <View>
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>
        <View style={styles.footer}>
          <Text>
            List of Laps
          </Text>
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
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);
