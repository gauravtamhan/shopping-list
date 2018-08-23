import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Button, FlatList, AsyncStorage } from 'react-native';
import styles from '@theme/styles'
import HeaderButton from '@components/HeaderButton/index';
import ListHeader from '@components/ListHeader/index';
import ListRow from '@components/ListRow/index'

import dataSource from '@core/data'

export default class Home extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Shopping List',
            headerStyle: {
                backgroundColor: 'rgb(255,255,255)',
                borderBottomColor: '#fff',
            },
            headerBackTitle: null,
            headerLeft: (<HeaderButton text={'Edit'} />),
            headerRight: (<HeaderButton text={'Add'} onPress={navigation.getParam('createNewList')} /> )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            lists: []
        }
        this._createNewList = this._createNewList.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({ createNewList: this._createNewList });
        // this.setState({ lists: dataSource.lists })
        this._loadSavedData()
    }

    componentDidUpdate() {
        this._storeData()
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

    _createNewList() {
        const { navigation } = this.props;
        navigation.navigate('CreateListModal', {
            addList: this._addList
        })
    }

    render() {
        const { lists } = this.state;
        return (
            <View style={ styles.container }>
                <View style={{ backgroundColor: 'rgb(100,100,100)', height: 0.6 }} />
                <FlatList
                    data={lists}
                    // initialNumToRender={7}
                    renderItem={
                        ({ item, separators }) => <ListRow onPressItem={
                            () => this.props.navigation.navigate('ShoppingList', {item})
                        } 
                        separators={separators} 
                        title={item.title} 
                        date={new Date(item.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })} 
                        time={new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        groceries={item.groceries} />
                    }
                    ItemSeparatorComponent={({ highlighted }) => <View style={[styles.separator, highlighted && { marginHorizontal: 0 }]} />}
                    keyExtractor={item => item.title}
                />
            </View>
        )
    }
}