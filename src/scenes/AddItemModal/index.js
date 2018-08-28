import React, { Component } from 'react';
import { 
    Text, 
    View, 
    TextInput, 
    Keyboard, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Picker, 
    TouchableHighlight 
} from 'react-native';
import styles from '@theme/styles'
import HeaderButton from '@components/HeaderButton/index';
import DismissKeyboard from '@components/Utilities/dismissKeyboard';
import CustomPicker from './customPicker';
import { NAV_COLOR } from '@theme/colors';

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
            headerStyle: {
                backgroundColor: 'rgb(250,250,250)',
                borderBottomColor: 'rgb(100,100,100)',
            },
            headerLeft: (<HeaderButton text={'Cancel'} onPress={navigation.getParam('cancelModal')}  />),
            headerRight: (<HeaderButton text={'Done'} style={{fontWeight: '600'}} onPress={navigation.getParam('handleDone')}  />)
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            itemDescription: '',
            selectedCategoryIndex: 0,
            quantity: 1,
            unit: 'none',
            showQuantPicker: false,
            showUnitPicker: false,
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
        const { selectedCategoryIndex, itemName, itemDescription, quantity, unit } = this.state;
        const addItemFunc = this.props.navigation.getParam('addItem')
        const category = categories[selectedCategoryIndex];
        let data = {
            item: itemName,
            desc: itemDescription === '' ? null : itemDescription,
            quant: quantity,
            unit: unit === 'none' ? null : unit,
            marked: false,
        }

        addItemFunc(category, data);
        this._cancelModal();
    }


    render() {
        const { selectedCategoryIndex, itemName, itemDescription, quantity, unit, showQuantPicker, showUnitPicker } = this.state;
        return (
                <View style={[styles.container, { backgroundColor: 'rgb(242,242,243)' }]}>
                    <ScrollView>
                    <Text style={styles.iosDescriptorText}>{'choose a category'.toUpperCase()}</Text>
                    <View style={[styles.iosTextInputWrapper, {marginTop: 0}]}>
                        <View style={{height: 50, marginVertical: 10}}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={styles.sliderWrapper}>
                                    {
                                        categories.map((item, index) => (
                                            <TouchableWithoutFeedback
                                                key={index} 
                                                // underlayColor={selectedCategoryIndex === index ? 'rgb(0,102,235)' : 'rgb(238,238,242)'}
                                                onPress={() => { this.setState({ selectedCategoryIndex: index }) }}
                                                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                                            >
                                                <View style={[styles.sliderPill, selectedCategoryIndex === index ? styles.sliderPillSelected : null]}>
                                                    <Text style={[styles.sliderPillText, selectedCategoryIndex === index ? styles.sliderPillTextSelected : null]}>{item}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
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
                            placeholder='Name'
                            placeholderTextColor='rgb(198,198,202)'
                            value={itemName}
                            returnKeyType={'default'}
                            selectionColor='rgb(7,106,219)'
                            enablesReturnKeyAutomatically={false}
                            // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            blurOnSubmit
                        />
                        <View style={styles.separator} />
                        <TextInput
                            // ref={(input) => { this.secondTextInput = input; }}
                            style={styles.iosTextInput}
                            onChangeText={(text) => this.setState({ itemDescription: text })}
                            clearButtonMode='while-editing'
                            placeholder='Description (optional)'
                            placeholderTextColor='rgb(198,198,202)'
                            value={itemDescription}
                            returnKeyType={'default'}
                            selectionColor='rgb(7,106,219)'
                            enablesReturnKeyAutomatically={false}
                            blurOnSubmit
                        />
                    </View>
                    
                    <View style={styles.iosTextInputWrapper}>
                        <TouchableHighlight 
                            style={styles.selectInputWrapper}
                            underlayColor={'rgb(235,235,235)'}
                            onPress={() => { this.setState({ showQuantPicker: !showQuantPicker }) }}
                            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text style={{ fontSize: 17 }}>Quantity</Text>
                                <Text style={{ fontSize: 17, color: NAV_COLOR }}>{quantity}</Text>
                            </View>
                        </TouchableHighlight>
                    
                    { showQuantPicker &&
                        <CustomPicker data={quantity_data} selectedVal={quantity} onValChange={(itemValue) => { this.setState({ quantity: itemValue }) }} />
                    }
                    <View style={styles.separator} />
                    <TouchableHighlight
                        style={styles.selectInputWrapper}
                        underlayColor={'rgb(235,235,235)'}
                        onPress={() => { this.setState({ showUnitPicker: !showUnitPicker }) }}
                        hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 17 }}>Unit</Text>
                            <Text style={{ fontSize: 17, color: NAV_COLOR }}>{unit}</Text>
                        </View>
                    </TouchableHighlight>
                    { showUnitPicker &&
                        <CustomPicker data={quantity < 2 ? single_units : multi_units} selectedVal={unit} onValChange={(itemValue) => { this.setState({ unit: itemValue }) }} />
                    }
                    </View>
                    </ScrollView>
                </View>
        )
    }
}