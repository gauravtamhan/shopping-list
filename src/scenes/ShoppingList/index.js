import React, { Component } from 'react';
import { Text, View, SectionList } from 'react-native';
import styles from '@theme/styles';
import HeaderButton from '@components/HeaderButton/index';
import ListHeader from '@components/ListHeader/index';


export default class ShoppingList extends Component {
    static navigationOptions = ({ navigation }) => {
        // const item = navigation.getParam('item');
        return {
            title: null,
            headerRight: (<HeaderButton text={'Add Item'} />),
            headerStyle: {
                backgroundColor: '#fff',
                borderBottomColor: '#fff',
            }
        }
    };

    constructor(props) {
        super(props);
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
                <View>
                    <Text style={styles.itemName}>{itemName}</Text>
                    <Text style={styles.rowSubText}>{description}</Text>
                </View>
                <View style={styles.itemRightTextContainer}>
                    <Text style={styles.itemRightTextMain}>{quantity}</Text>
                    <Text style={styles.itemRightTextSub}>{unit}</Text>
                </View>
            </View>
        );
    }

    render() {
        const item = this.props.navigation.getParam('item');
        const sections = this._createSections(item.groceries);
        return (
            <View style={styles.container}>

                <SectionList
                    style={{flex: 1}}
                    ListHeaderComponent={<Text style={styles.title}>{item.title}</Text>}
                    sections={sections}
                    renderSectionHeader={this._renderSectionHeader.bind(this)}
                    renderItem={this._renderRow.bind(this)}
                    keyExtractor={(item, index) => index}
                    stickySectionHeadersEnabled={true}
                />

            </View>
        )
    }
}