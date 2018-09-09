import React, { Component } from 'react';
import { Text, View, SectionList, Dimensions } from 'react-native';
import styles from '@theme/styles';
import { HeaderButton, HeaderBar } from '@components/Header/index';
import { FooterBar } from '@components/FooterBar/index';
import ListHeader from '@components/ListHeader/index';
import { CheckBox } from 'native-base';
import { NAV_COLOR } from '@theme/colors';
import plus from '@theme/imgs/plus.png';


export default class ShoppingList extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('item').title,
            headerRight: (<HeaderButton text={'Add'} onPress={navigation.getParam('createNewItem')} />),
            headerTransparent: true,
            headerBackground: (<HeaderBar />)
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            item: props.navigation.getParam('item'),
        }
        this._createNewItem = this._createNewItem.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({ createNewItem: this._createNewItem });
    }

    _createNewItem() {
        const { navigation } = this.props;
        navigation.navigate('AddItemModal', {
            addItem: this._addItem
        })
    }

    _addItem = (category, data) => {
        const { navigation } = this.props;
        const addGroceriesFunc = navigation.getParam('addGroceries');
        addGroceriesFunc(navigation.getParam('index'), category, data);
        this.forceUpdate();
    }
    
    _toggleCheckForItem = (category, catIndex) => {
        const { navigation } = this.props;
        const checkItemFunc = navigation.getParam('checkItem');
        checkItemFunc(navigation.getParam('index'), category, catIndex);
        this.forceUpdate();
    }

    // _groupBy(objectArray, property) {
    //     return objectArray.reduce(function (acc, obj) {
    //         var key = obj[property];
    //         if (!acc[key]) {
    //             acc[key] = [];
    //         }
    //         acc[key].push(obj);
    //         return acc;
    //     }, {});
    // }

    _createSections(x) {
        // let grouped = this._groupBy(x)
        // let obj = this.sortObjKeysAlphabetically(grouped)
        let obj = this.sortObjKeysAlphabetically(x)
        const resultArray = []
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                resultArray.push({ title: key, data: obj[key] })
            }
        }
        return resultArray;
    }

    sortObjKeysAlphabetically(obj) {
        var ordered = {};
        Object.keys(obj).sort((a,b) => {
            if (a == 'Other') return 1;
            if (b == 'Other') return -1;

            if (a < b) return -1;
            if (a > b ) return 1;
            return 0;
        }).forEach(function (key) {
            ordered[key] = obj[key];
        });
        return ordered;
    }

    countNumberOfItemInList(obj) {
        let count = 0;
        for (key in obj) {
            count += obj[key].length;
        }
        return count;
    }

    countNumberOfMarked(obj) {
        let count = 0;
        for (key in obj) {
            obj[key].forEach((item) => {
                if (item.marked) {
                    count++;
                }
            })
        }
        return count;
    }

    _renderSectionHeader({ section }) {
        const data = section.title;
        return <ListHeader text={data} />;
    }

    _renderRow({item, index, section}) {
        const data = item;
        const itemName = data.item;
        const quantity = data.quant;
        const unit = data.unit;
        const amount = unit ? `${quantity} ${unit}` : quantity
        const marked = data.marked
        return (
            <View key={index} style={styles.itemRow}>
                    <CheckBox
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        style={{ marginRight: 22, marginLeft: -10 }}
                        color={NAV_COLOR}
                        checked={marked}
                        onPress={() => this._toggleCheckForItem(section.title, index) }
                    />
                    <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                        <Text style={[styles.itemName, marked ? styles.itemNameMarked : null]}>{itemName}</Text>
                        <View style={styles.itemRightTextContainer}>
                        {quantity !== '' &&
                            <View style={[styles.pill, marked ? styles.pillMarked : null]}>
                                <Text style={styles.pillText}>{amount}</Text>
                            </View>
                        }
                        </View>
                    </View>
            </View>
        );
    }

    render() {
        const sections = this._createSections(this.state.item.groceries);
        const { height, width } = Dimensions.get('window');
        const total = this.countNumberOfItemInList(this.state.item.groceries);
        const marked = this.countNumberOfMarked(this.state.item.groceries);
        return (
            <View style={[styles.container]}>
                <SectionList
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<View style={{ height: 65 }} />}
                    ListEmptyComponent={
                        <View style={{ width: width, height: height - 140, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ width: '72%', fontSize: 27, fontWeight: '300' }}>To add an item to your list, tap <Text style={{ fontWeight: '600' }}>Add</Text> in the top right corner.</Text>
                        </View>
                    }
                    contentInset={{bottom: 45}}
                    sections={sections}
                    renderSectionHeader={this._renderSectionHeader.bind(this)}
                    ItemSeparatorComponent={({ highlighted }) => <View style={[styles.shortSeparator, highlighted && { marginLeft: 0 }]} />}
                    renderSectionFooter={({ section }) => <View style={{ borderColor: 'rgb(194,193,196)', borderTopWidth: 0.5, marginLeft: 18, marginBottom: 12}} />}
                    renderItem={this._renderRow.bind(this)}
                    keyExtractor={(item, index) => index}
                    stickySectionHeadersEnabled={false}
                />
                <FooterBar>
                    {total !== 0 ? (
                        <Text style={[styles.footerText]}>{marked} of {total} Completed</Text>
                    ) : (
                        <Text style={styles.footerText}>No Items</Text>
                    )}

                    {/* <HeaderButton img={plus} 
                        ctnrStyle={{ position: 'absolute', right: 0 }} 
                        style={{ width: 20, height: 20}}
                        onPress={this.props.navigation.getParam('createNewItem')}
                    /> */}
                </FooterBar>

            </View>
        )
    }
}