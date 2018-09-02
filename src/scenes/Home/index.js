import React, { Component } from 'react';
import { Text, View, TouchableHighlight, FlatList, AsyncStorage } from 'react-native';
import styles from '@theme/styles'
import { HeaderButton, HeaderBar } from '@components/Header/index';
import ListRow from '@components/ListRow/index'


export default class Home extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Lists',
            headerBackTitle: null,
            headerTransparent: true,
            headerBackground: (<HeaderBar />),
            headerRight: (<HeaderButton text={'New'} onPress={navigation.getParam('createNewList')} /> )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            lists: []
        }
        this._createNewList = this._createNewList.bind(this);
    }

    _createNewList() {
        const { navigation } = this.props;
        navigation.navigate('CreateListModal', {
            addList: this._addList
        })
    }

    componentDidMount() {
        this.props.navigation.setParams({ createNewList: this._createNewList });
        this._loadSavedData()
    }

    componentDidUpdate() {
        this._storeData()
    }

    _loadSavedData = async () => {
        try {
            const value = await AsyncStorage.getItem('lists');
            if (value !== null) {
                // We have data!!
                this.setState({
                    lists: JSON.parse(value)
                })
            }
        } catch (error) {
            // Error retrieving data
            console.log(error)
        }
    }

    _storeData = async () => {
        try {
            await AsyncStorage.setItem('lists', JSON.stringify(this.state.lists));
        } catch (error) {
            // Error saving data
            console.log(error)
        }
    }

    _addList = (newList) => {
        this.setState({
            lists: [...this.state.lists, newList]
        })
    }

    _removeList = (currentIndex) => {
        this.setState({
            lists: this.state.lists.filter((obj, i) => i !== currentIndex )
        })
    }

    _addGroceries = (index, category, data) => {
        const entries = this.state.lists;
        if (entries[index].groceries[category] === undefined) {
            entries[index].groceries[category] = []
        }
        entries[index].groceries[category].push(data)
        this.forceUpdate()
    }

    _checkItem = (index, category, catIndex) => {
        let newState = Object.assign({}, this.state);
        newState.lists[index].groceries[category][catIndex].marked = !this.state.lists[index].groceries[category][catIndex].marked
        this.setState(newState);
    }

    countNumberOfItemInList(obj) {
        let count = 0;
        for (key in obj) {
            count += obj[key].length;
        }
        return count;
    }

    _renderItem = ({ item, index, separators }) => {
        return (
            <ListRow
                separators={separators}
                title={item.title}
                index={index}
                handleRemove={this._removeList}
                date={new Date(item.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                time={new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                count={this.countNumberOfItemInList(item.groceries)}
                onPressItem={
                    () => this.props.navigation.navigate('ShoppingList', { 
                        item, 
                        index,
                        addGroceries: this._addGroceries,
                        checkItem: this._checkItem
                        })
                }
            />
        )
    }

    render() {
        const { lists } = this.state;
        
        return (
            <View style={ styles.container }>
                <FlatList
                    ListHeaderComponent={<View style={{height: 65}} />}
                    data={lists}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={({ highlighted }) => <View style={[styles.separator, highlighted && { marginLeft: 0 }]} />}
                    keyExtractor={item => item.title}
                />
            </View>
        )
    }
}