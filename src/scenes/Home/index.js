import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Button, FlatList } from 'react-native';
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
        this.setState({
            lists: dataSource.lists
        })
    }

    _createNewList() {
        const { navigation } = this.props;
        console.log("Add button clicked!")

        // TODO: Need to figure out how to create new list
        // navigation.navigate('NewShoppingList', { item })
    }

    render() {
        const { lists } = this.state;
        return (
            <View style={ styles.container }>
                <FlatList
                    style={{ borderTopWidth: 0.6, borderTopColor: 'rgb(100,100,100)' }}
                    ListHeaderComponent={ <ListHeader text={'All Lists'} />}
                    data={lists}
                    initialNumToRender={7}
                    renderItem={
                        ({ item, separators }) => <ListRow onPressItem={
                            () => this.props.navigation.navigate('ShoppingList', {item})
                        } 
                        separators={separators} 
                        title={item.title} 
                        date={item.date} 
                        time={item.time}
                        groceries={item.groceries} />
                    }
                    ItemSeparatorComponent={({ highlighted }) => <View style={[styles.separator, highlighted && { marginHorizontal: 0 }]} />}
                    keyExtractor={item => item.title}
                />
            </View>
        )
    }
}