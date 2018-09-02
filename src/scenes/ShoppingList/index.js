import React, { Component } from 'react';
import { Text, View, SectionList } from 'react-native';
import styles from '@theme/styles';
import { HeaderButton, HeaderBar } from '@components/Header/index';
import ListHeader from '@components/ListHeader/index';
// import CheckBox from 'react-native-check-box';
import { CheckBox } from 'native-base';
import { NAV_COLOR } from '@theme/colors';


export default class ShoppingList extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('item').title,
            headerRight: (<HeaderButton text={'Add Item'} onPress={navigation.getParam('createNewItem')} />),
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

    _createSections(x) {
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
        Object.keys(obj).sort().forEach(function (key) {
            ordered[key] = obj[key];
        });
        return ordered;
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
                            <View style={[styles.pill, marked ? styles.pillMarked : null]}>
                                <Text style={styles.pillText}>{amount}</Text>
                            </View>
                        </View>
                    </View>
            </View>
        );
    }

    render() {
        const sections = this._createSections(this.state.item.groceries);

        return (
            <View style={[styles.container]}>

                <SectionList
                    ListHeaderComponent={<View style={{ height: 65 }} />}
                    contentInset={{bottom: 30}}
                    sections={sections}
                    renderSectionHeader={this._renderSectionHeader.bind(this)}
                    ItemSeparatorComponent={({ highlighted }) => <View style={[styles.shortSeparator, highlighted && { marginLeft: 0 }]} />}
                    renderSectionFooter={({ section }) => <View style={{ borderColor: 'rgb(194,193,196)', borderTopWidth: 0.5, marginLeft: 18, marginBottom: 12}} />}
                    renderItem={this._renderRow.bind(this)}
                    keyExtractor={(item, index) => index}
                    stickySectionHeadersEnabled={false}
                />

            </View>
        )
    }
}