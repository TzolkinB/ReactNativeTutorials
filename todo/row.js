import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  View, Text, StyleSheet,
  Switch, TouchableOpacity, TextInput
} from 'react-native';

class Row extends Component {
  render() {

    const {complete} = this.props;

    const textView = (
      <TouchableOpacity 
        style={styles.textWrap}
        onLongPress={() => this.props.onToggleEdit(true)}
      >
        <Text style={[styles.text, complete && styles.complete]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    )

    const removeButton = (
      <TouchableOpacity onPress={this.props.onRemove}>
        <FontAwesome name='trash' />
      </TouchableOpacity>
    )

    const textEdit = (
      <View style={styles.textWrap}>
        <TextInput
          onChangeText={this.props.onUpdate}
          autoFocus
          value={this.props.text}
          style={styles.input}
          multiline
        />
      </View>
    )

    const saveButton = (
      <TouchableOpacity 
        style={styles.done}
        onPress={() => this.props.onToggleEdit(false)}>
        <Text style={styles.doneText}>Save</Text>
      </TouchableOpacity> 
    )
    
    return(
      <View style={styles.container}>
        <Switch
          value={complete}
          onValueChange={this.props.onComplete}
        />
        {this.props.editing ? textEdit : textView}
        {this.props.editing ? saveButton : removeButton}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  input: {
    height: 100,
    flex: 1,
    fontSize: 24,
    padding: 0,
    color: "#4d4d4d"
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 10,
  },
  done: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#7be290",
    padding: 7
  },
  doneText: {
    color: "#4d4d4d",
    fontSize: 20
  },
  complete: {
    textDecorationLine: "line-through"
  },
  text: {
    fontSize: 20,
    color: "#4d4d4d",
  },
  remove: {
    fontSize: 20,
    color: "#cc9a9a"
  }
})

export default Row;
