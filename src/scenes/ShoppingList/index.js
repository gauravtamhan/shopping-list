import React, { Component } from 'react';
import { Text, View, SectionList } from 'react-native';
import styles from '@theme/styles';
import HeaderButton from '@components/HeaderButton/index';
import ListHeader from '@components/ListHeader/index';
import { BlurView } from 'react-native-blur';
import CheckBox from 'react-native-check-box';


export default class ShoppingList extends Component {
    static navigationOptions = ({ navigation }) => {
        // const item = navigation.getParam('item');
        return {
            title: null,
            headerRight: (<HeaderButton text={'Add Item'} onPress={navigation.getParam('addItem')} />),
            headerStyle: {
                backgroundColor: 'rgba(255,255,255,0.98)',
                borderBottomColor: 'transparent',
            },
            headerTransparent: false,
            // headerBackground: (<BlurView style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 65}} blurType="light" blurAmount={20}/>)
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            item: props.navigation.getParam('item')
        }
        this._addItem = this._addItem.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({ addItem: this._addItem });
    }

    _addItem() {
        const { navigation } = this.props;
        navigation.navigate('AddItemModal')
    }

    _onCheck(data) {
        console.log(data);
    }

    _createSections(obj) {
        const resultArray = []
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                resultArray.push({ title: key, data: obj[key] })
            }
        }
        return resultArray;
    }

    _renderSectionHeader({ section }) {
        const data = section.title;
        return <ListHeader text={data} />;
    }

    _renderRow({item, index, section}) {
        const data = item;
        const itemName = data.item;
        const description = data.desc ? data.desc : '';
        const quantity = data.quant ? data.quant : '';
        const unit = data.unit ? data.unit : '';
        return (
            <View key={index} style={styles.itemRow}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox
                        style={{ paddingRight: 16 }}
                        onClick={() => this._onCheck(data)}
                        isChecked={data.marked}
                    />
                    <View>
                        <Text style={styles.itemName}>{itemName}</Text>
                        <Text style={styles.rowSubText}>{description}</Text>
                    </View>
                </View>
                <View style={styles.itemRightTextContainer}>
                    <Text style={styles.itemRightTextMain}>{quantity}</Text>
                    <Text style={styles.itemRightTextSub}>{unit}</Text>
                </View>
            </View>
        );
    }

    render() {
        const sections = this._createSections(this.state.item.groceries);

        return (
            <View style={styles.container}>

                <SectionList
                    style={{flex: 1}}
                    ListHeaderComponent={<Text style={styles.title}>{this.state.item.title}</Text>}
                    sections={sections}
                    renderSectionHeader={this._renderSectionHeader.bind(this)}
                    renderSectionFooter={({ section }) => <View style={{height: 26}} />}
                    renderItem={this._renderRow.bind(this)}
                    keyExtractor={(item, index) => index}
                    stickySectionHeadersEnabled={true}
                />

            </View>
        )
    }
}