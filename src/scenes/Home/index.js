import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Button, FlatList, AsyncStorage } from 'react-native';
import styles from '@theme/styles'
import HeaderButton from '@components/HeaderButton/index';
import ListHeader from '@components/ListHeader/index';
import ListRow from '@components/ListRow/index'
import Swipeout from 'react-native-swipeout';

export default class Home extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Shopping List',
            headerStyle: {
                backgroundColor: 'rgb(250,250,250)',
                borderBottomColor: '#fff',
            },
            headerBackTitle: null,
            headerLeft: (<HeaderButton text={'Edit'} />),
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
        // this.setState({ lists: dataSource.lists })
        this._loadSavedData()
    }

    componentDidUpdate() {
        console.log('new thing added!')
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

    _renderItem = ({ item, index, separators }) => {
        let swipeBtns = [{
            text: 'Delete',
            type: 'delete',
            backgroundColor: 'rgb(255, 59, 48)',
            underlayColor: 'rgb(227, 55, 51)',
            onPress: () => { this._removeList(index) }
        }]

        return (
            <Swipeout 
                right={swipeBtns} 
                autoClose={true} 
                backgroundColor='transparent'
                buttonWidth={70}
            >
                <ListRow
                    separators={separators}
                    title={item.title}
                    date={new Date(item.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                    time={new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    groceries={item.groceries}
                    onPressItem={
                        () => this.props.navigation.navigate('ShoppingList', { item, index, addGroceries: this._addGroceries })
                    }
                />
            </Swipeout>
        )
    }

    render() {
        const { lists } = this.state;
        
        return (
            <View style={ styles.container }>
                <View style={{ backgroundColor: 'rgb(100,100,100)', height: 0.6 }} />
                <FlatList
                    data={lists}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={({ highlighted }) => <View style={[styles.separator, highlighted && { marginLeft: 0 }]} />}
                    keyExtractor={item => item.title}
                />
            </View>
        )
    }
}