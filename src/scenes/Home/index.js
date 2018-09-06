import React, { Component } from 'react';
import { Text, View, FlatList, AsyncStorage, Dimensions, Image } from 'react-native';
import styles from '@theme/styles'
import { HeaderButton, HeaderBar } from '@components/Header/index';
import ListRow from '@components/ListRow/index'
import moment from 'moment';
import create from '@theme/imgs/create.png';

var REFERENCE = moment();
var TODAY = REFERENCE.clone().startOf('day');
var YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day');
var A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');

export default class Home extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Lists',
            headerTransparent: true,
            headerBackground: (<HeaderBar />),
            // headerLeft: (<HeaderButton text={'Edit'} />),
            headerRight: (<HeaderButton img={create} style={{marginRight: -3}} onPress={navigation.getParam('createNewList')} /> )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            lists: [{ title: '' }],
            activeIndex: null,
            scrollEnabled: true,
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
            } else {
                this.setState({
                    lists: []
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

    _renameList = (index, str) => {
        let newState = Object.assign({}, this.state);
        newState.lists[index].title = str;
        this.setState(newState);
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

    _handleSwipeOutActiveIndex = (index) => {
        const { activeIndex } = this.state;
        if (activeIndex != index) {
            this.setState({ activeIndex: index })
        }
    }

    _handleSwipeoutVertScroll(allowParentScroll) {
        const { scrollEnabled } = this.state;
        if (scrollEnabled != allowParentScroll) {
            this.setState({ scrollEnabled: allowParentScroll })
        }
    }

    calculateDateTime(givenDateTime) {
        const dateTime = moment(new Date(givenDateTime));

        if (this.isToday(dateTime)) {
            return dateTime.format("h:mm A");
        } else if (this.isYesterday(dateTime)) {
            return 'Yesterday';
        } else if (this.isWithinAWeek(dateTime)) {
            return dateTime.format('dddd');
        } else {
            return dateTime.format("MMMM D, YYYY")
        }
    }

    isToday(momentDate) {
        return momentDate.isSame(TODAY, 'd');
    }
    isYesterday(momentDate) {
        return momentDate.isSame(YESTERDAY, 'd');
    }
    isWithinAWeek(momentDate) {
        return momentDate.isAfter(A_WEEK_OLD);
    }

    _renderItem = ({ item, index, separators }) => {
        const d = item.date ? this.calculateDateTime(item.date) : '';
        return (
            <ListRow
                separators={separators}
                title={item.title}
                index={index}
                date={d}
                onPressRename={
                    () => this.props.navigation.navigate('RenameListModal', {
                        renameList: this._renameList,
                        index,
                        title: item.title
                    })
                }
                count={this.countNumberOfItemInList(item.groceries)}
                onSwipeOpen={this._handleSwipeOutActiveIndex}
                activeIndex={this.state.activeIndex}
                handleRemove={this._removeList}
                handleVertScroll={this._handleSwipeoutVertScroll.bind(this)}
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
        const { height, width } = Dimensions.get('window');

        return (
            <View style={ styles.container }>
                <FlatList
                    scrollEnabled={this.state.scrollEnabled}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={{width: width, height: height - 140, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{ width: '72%', fontSize: 27, fontWeight: '300' }}>To create a new shopping list, tap <Image source={create} style={{tintColor: '#000', width: 28, height: 28}} /> at the top and enter a title for your list.</Text>
                        </View>
                    }
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