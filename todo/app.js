import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import Row    from './row';
import {
  View, Text, StyleSheet,
  Platform, ListView, Keyboard,
  AsyncStorage, ActivityIndicator
} from 'react-native';

const filterItems = (filter, items) => {
  return items.filter((item) => {
    if(filter === "ALL") return true;
    if(filter === "COMPLETED") return item.complete;
    if(filter === "ACTIVE") return !item.complete;
  })
}

class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

    this.state = {
      loading: true,
      value: "",
      items: [],
      allComplete: false,
      filter: "ALL",
      dataSource: ds.cloneWithRows([])
    }
    setSource = this.setSource.bind(this);
    handleAddItem = this.handleAddItem.bind(this);
    handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    handleToggleComplete = this.handleToggleComplete.bind(this);
    handleRemoveItem = this.handleRemoveItem.bind(this);
    handleFilter = this.handleFilter.bind(this);
    handleClearComplete = this.handleClearComplete.bind(this);
    handleUpdateText = this.handleUpdateText.bind(this);
    handleToggleEditing = this.handleToggleEditing.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem("items").then((json) => {
      try {
        const items = JSON.parse(json);
        this.setSource(items, items, {loading: false});
      } catch(error) {
        this.setState({
          loading: false
        })
      }
    })
  }

  setSource(items, itemsDataSource, otherState ={}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
      ...otherState
    })
    AsyncStorage.setItem("items", JSON.stringify(items));
  }

  handleFilter(filter) {
    this.setSource(this.state.items, filterItems(filter, this.state.items), {filter})
  }

  handleClearComplete() {
    const newItems = filterItems("ACTIVE", this.state.items);
    this.setSource(newItems, filterItems(this.state.filter, newItems));
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
    setSource(newItems, filterItems(this.state.filter, newItems), { value: ''})
  }

  handleToggleAllComplete() {
   const complete = !this.state.allComplete;
   const newItems = this.state.items.map((item) => ({
    ...item,
    complete
   }))
   setSource(newItems, filterItems(this.state.filter, newItems), { allComplete: complete})
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
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleRemoveItem(key) {
    const newItems = this.state.items.filter((item) => {
      return item.key != key
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleUpdateText(key, text) {
    const newItems = this.state.items.map((item) => {
      if(item.key != key) return item;
      return {
        ...item,
        text
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleToggleEditing(key, editing) {
    const newItems = this.state.items.map((item) => {
      if(item.key != key) return item;
      return {
        ...item,
        editing
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems));
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
                  onUpdate={(text) => handleUpdateText(key, text)}
                  onToggleEdit={(editing) => handleToggleEditing(key, editing)}
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
        <Footer
          onFilter={handleFilter}
          filter={this.state.filter}
          count={filterItems("ACTIVE", this.state.items).length}
          onClearComplete={handleClearComplete}
        />
        {this.state.loading &&
          <View style={styles.loading}>
            <ActivityIndicator
              animating
              size="large"
            />
          </View>
        }
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
  loading: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)"
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
