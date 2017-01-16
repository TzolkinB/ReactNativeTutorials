import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import Row    from './row';
import {
  View, Text, StyleSheet,
  Platform, ListView, Keyboard
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

    this.state = {
      value: "",
      items: [],
      allComplete: false,
      dataSource: ds.cloneWithRows([])
    }
    setSource = this.setSource.bind(this);
    handleAddItem = this.handleAddItem.bind(this);
    handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    handleToggleComplete = this.handleToggleComplete.bind(this);
    handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  setSource(items, itemsDataSource, otherState ={}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
      ...otherState
    })
  }

  handleAddItem() {
    if(!this.state.value){
      return;
    }
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ]
    setSource(newItems, newItems, { value: ''})
  }

  handleToggleAllComplete() {
   const complete = !this.state.allComplete;
   const newItems = this.state.items.map((item) => ({
    ...item,
    complete
   }))
   setSource(newItems, newItems, { allComplete: complete})
  }

  handleToggleComplete(key, complete) {
    const newItems = this.state.items.map((item) => {
      if(item.key != key ) {
        return item;
      }
      return {
        ...item,
        complete
      }
    })
    this.setSource(newItems, newItems);
  }

  handleRemoveItem(key) {
    const newItems = this.state.items.filter((item) => {
      return item.key != key
    })
    this.setSource(newItems, newItems);
  }

  render() {
    return(
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={handleAddItem}
          onChange={(value) => this.setState({value})}
          onToggleAllComplete={handleToggleAllComplete}
        />
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({ key, ...value}) => {
              return (
                <Row
                  key={key}
                  onRemove={() => handleRemoveItem(key)}
                  onComplete={(complete) => handleToggleComplete(key, complete)}
                  {...value}
                />
              )
            }}
            renderSeparator={(sectionId, rowId) => {
              return <View key={rowId} style={styles.separator}/>
            }}
        />
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    ...Platform.select({
      ios: { paddingTop: 30 }
    })
  },
  content: {
    flex: 1
  },
  list: {
    backgroundColor: '#FFF'
  },
  separator: {
    borderWidth: 1,
    borderColor: '#F5F5F5'
  }
})

export default App;
