import React, { Component } from 'react';
import { 
    Text, 
    View, 
    TextInput, 
    Keyboard, 
    ScrollView, 
    TouchableWithoutFeedback,
    TouchableHighlight,
    TouchableOpacity,
    PickerIOS,
    Alert
} from 'react-native';
import styles from '@theme/styles'
import {HeaderButton, HeaderBar} from '@components/Header/index';
import DismissKeyboard from '@components/Utilities/dismissKeyboard';
import CustomPicker from './customPicker';

const categories = [
    "Bakery",
    "Beverages",
    "Canned Goods",
    "Dairy",
    "Dry Goods",
    "Frozen Foods",
    "Meat",
    "Produce",
    "Cleaners",
    "Paper Goods",
    "Personal Care",
    "Other"
];

const quantity_data = [
    {
        label: '1/4',
        value: 0.25
    },
    {
        label: '1/2',
        value: 0.5
    },
    {
        label: '1',
        value: 1
    },
    {
        label: '2',
        value: 2
    },
    {
        label: '3',
        value: 3
    },
    {
        label: '4',
        value: 4
    },
    {
        label: '5',
        value: 5
    },
    {
        label: '6',
        value: 6
    },
    {
        label: '7',
        value: 7
    },
    {
        label: '8',
        value: 8
    },
    {
        label: '9',
        value: 9
    },
    {
        label: '10',
        value: 10
    },
    {
        label: '11',
        value: 11
    },
    {
        label: '12',
        value: 12
    },
]

const single_units = [
    {
        label: 'none',
        value: "none"
    },
    {
        label: 'bag',
        value: "bag"
    },
    {
        label: 'bottle',
        value: "bottle"
    },
    {
        label: 'box',
        value: "box"
    },
    {
        label: 'carton',
        value: "carton"
    },
    {
        label: 'can',
        value: "can"
    },
    {
        label: 'dozen',
        value: "dozen"
    },
    {
        label: 'gallon',
        value: "gallon"
    },
    {
        label: 'loaf',
        value: "loaf"
    },
    {
        label: 'pack',
        value: "pack"
    },
    {
        label: 'packet',
        value: "packet"
    },
    {
        label: 'pint',
        value: "pint"
    },
    {
        label: 'pound',
        value: "pound"
    },
    {
        label: '6-pack',
        value: "6-pack"
    },
    {
        label: '12-pack',
        value: "12-pack"
    },
    {
        label: '24-pack',
        value: "24-pack"
    }
]

const multi_units = [
    {
        label: 'none',
        value: "none"
    },
    {
        label: 'bags',
        value: "bags"
    },
    {
        label: 'bottles',
        value: "bottles"
    },
    {
        label: 'boxes',
        value: "boxes"
    },
    {
        label: 'cartons',
        value: "cartons"
    },
    {
        label: 'cans',
        value: "cans"
    },
    {
        label: 'dozen',
        value: "dozen"
    },
    {
        label: 'gallons',
        value: "gallons"
    },
    {
        label: 'loaves',
        value: "loaves"
    },
    {
        label: 'packs',
        value: "packs"
    },
    {
        label: 'packets',
        value: "packets"
    },
    {
        label: 'pints',
        value: "pints"
    },
    {
        label: 'pounds',
        value: "pounds"
    },
    {
        label: '6-packs',
        value: "6-packs"
    },
    {
        label: '12-packs',
        value: "12-packs"
    },
    {
        label: '24-packs',
        value: "24-packs"
    }
];


export default class AddItemModal extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add Item',
            headerTransparent: true,
            headerBackground: (<HeaderBar />),
            headerLeft: (<HeaderButton text={'Cancel'} onPress={navigation.getParam('cancelModal')}  />),
            headerRight: (<HeaderButton text={'Done'} style={{fontWeight: '600'}} onPress={navigation.getParam('handleDone')}  />)
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            selectedCategoryIndex: 0,
            quantity: '',
            unit: 'none',
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ 
            cancelModal: this._cancelModal, 
            handleDone: this._handleDone 
        });
    }

    _cancelModal = () => {
        const { navigation } = this.props;
        Keyboard.dismiss();
        navigation.goBack();
    }

    _handleDone = () => {
        const { selectedCategoryIndex, itemName, quantity, unit } = this.state;
        if (itemName === '') {
            Alert.alert('Item field required.')
        } else {
            const addItemFunc = this.props.navigation.getParam('addItem')
            const category = categories[selectedCategoryIndex];
            let data = {
                item: itemName,
                quant: quantity,
                unit: unit === 'none' ? null : unit,
                marked: false,
            }

            addItemFunc(category, data);
            this._cancelModal();
        }
    }

    render() {
        const { selectedCategoryIndex, itemName, quantity, unit } = this.state;
        return (
            <View style={[styles.container, styles.background]}>
                <ScrollView keyboardDismissMode={'interactive'}>
                    <View style={{height: 65}} />
                    <Text style={styles.iosDescriptorText}>{'choose a category'.toUpperCase()}</Text>
                    <View style={[styles.iosTextInputWrapper, {marginTop: 0}]}>
                        <View style={{height: 50, marginVertical: 10}}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={styles.sliderWrapper}>
                                    {
                                        categories.map((item, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                activeOpacity={0.8}
                                                // underlayColor={selectedCategoryIndex === index ? 'rgb(0,102,235)' : 'rgb(238,238,242)'}
                                                onPress={() => { this.setState({ selectedCategoryIndex: index }) }}
                                                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                                            >
                                                <View style={[styles.sliderPill, selectedCategoryIndex === index ? styles.sliderPillSelected : null]}>
                                                    <Text style={[styles.sliderPillText, selectedCategoryIndex === index ? styles.sliderPillTextSelected : null]}>{item}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    
                    <Text style={styles.iosDescriptorText}>{'enter item details'.toUpperCase()}</Text>
                    <View style={[styles.iosTextInputWrapper, {marginTop: 0}]}>
                        <TextInput 
                            style={styles.iosTextInput}
                            onChangeText={(text) => this.setState({ itemName: text })}
                            clearButtonMode='while-editing'
                            placeholder='Item'
                            placeholderTextColor='rgb(198,198,202)'
                            value={itemName}
                            returnKeyType={'default'}
                            selectionColor='rgb(7,106,219)'
                            enablesReturnKeyAutomatically={false}
                            blurOnSubmit
                        />
                        <View style={styles.separator}></View>
                        <TextInput
                            style={styles.iosTextInput}
                            onChangeText={(n) => this.setState({ quantity: n })}
                            clearButtonMode='while-editing'
                            placeholder='Quantity'
                            keyboardType='numeric'
                            placeholderTextColor='rgb(198,198,202)'
                            value={quantity.toString()}
                            maxLength={3}
                            selectionColor='rgb(7,106,219)'
                        />
                    </View>
                    
                    <View style={styles.iosTextInputWrapper}>
                        {/* <CustomPicker 
                            label={'Quantity'} 
                            labelValue={quantity} 
                            data={quantity_data} 
                            selectedVal={quantity} 
                            onValChange={(itemValue) => { this.setState({ quantity: itemValue }) }} 
                        />
                        <View style={styles.separator} /> */}
                        <CustomPicker 
                            label={'Unit'}
                            labelValue={unit}
                            data={quantity < 2 ? single_units : multi_units}
                            selectedVal={unit}
                            onValChange={(itemValue) => { this.setState({ unit: itemValue }) }}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}