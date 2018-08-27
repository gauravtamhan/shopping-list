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

const categories = [
    "Beverages",
    "Bakery",
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
        label: '(no quantity)',
        value: ''
    },
    {
        label: '1/8',
        value: 0.125
    },
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
]

const single_units = [
    {
        label: '(no unit)',
        value: ""
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
        label: '6 pack',
        value: "6 pack"
    },
    {
        label: '12 pack',
        value: "12 pack"
    },
    {
        label: '24 pack',
        value: "24 pack"
    },
    {
        label: '32 pack',
        value: "32 pack"
    }
]

const multi_units = [
    {
        label: '(no units)',
        value: ""
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
        label: 'dozens',
        value: "dozens"
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
        label: '6 pack',
        value: "6 pack"
    },
    {
        label: '12 pack',
        value: "12 pack"
    },
    {
        label: '24 pack',
        value: "24 pack"
    },
    {
        label: '32 pack',
        value: "32 pack"
    }
]

export default class CreateListModal extends Component {
    static navigationOptions = ({ navigation }) => {
        return {}
    };

    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            itemDescription: '',
            selectedCategoryIndex: 0,
            quantity: '',
            unit: '',
            showQuantPicker: false,
            showUnitPicker: false,
        }
    }

    _cancelModal() {
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
            desc: itemDescription,
            quant: quantity,
            unit: unit,
            marked: false,
        }

        addItemFunc(category, data);
        this._cancelModal();
    }


    render() {
        const { selectedCategoryIndex, quantity, unit, showQuantPicker, showUnitPicker } = this.state;
        return (
            <DismissKeyboard>
            <View style={styles.container}>
                <View style={{ height: 65, paddingTop: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <HeaderButton text={'Cancel'} onPress={() => this._cancelModal()} />
                    <HeaderButton text={'Done'} onPress={this._handleDone} />
                </View>

                <Text style={styles.title}>Add Item</Text>
                
                <View style={{height: 50, marginTop: 10}}>
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
                
                <View style={styles.textInputWrapper}>
                    <TextInput 
                        style={styles.basicInputField}
                        onChangeText={(text) => this.setState({ itemName: text })}
                        clearButtonMode='while-editing'
                        placeholder='Name'
                        placeholderTextColor='rgb(198,198,202)'
                        value={this.state.itemName}
                        returnKeyType={'default'}
                        selectionColor='rgb(7,106,219)'
                        enablesReturnKeyAutomatically={false}
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        blurOnSubmit={false}
                    />
                </View>
                
                <View style={styles.textInputWrapper}>
                    <TextInput
                        ref={(input) => { this.secondTextInput = input; }}
                        style={styles.basicInputField}
                        onChangeText={(text) => this.setState({ itemDescription: text })}
                        clearButtonMode='while-editing'
                        placeholder='Description (optional)'
                        placeholderTextColor='rgb(198,198,202)'
                        value={this.state.itemDescription}
                        returnKeyType={'default'}
                        selectionColor='rgb(7,106,219)'
                        enablesReturnKeyAutomatically={false}
                        blurOnSubmit
                    />
                </View>


                <TouchableHighlight 
                    style={[styles.selectInputWrapper, { marginTop: 60 }]}
                    underlayColor={'rgb(235,235,235)'}
                    onPress={() => { this.setState({ showQuantPicker: !showQuantPicker }) }}
                    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}>
                        <Text style={{ fontSize: 17, color: 'rgba(0,0,0,0.65)' }}>Quantity</Text>
                        <Text style={{ fontSize: 17, fontWeight: '600' }}>{quantity}</Text>
                    </View>
                </TouchableHighlight>
                { showQuantPicker &&
                    <CustomPicker data={quantity_data} selectedVal={quantity} onValChange={(itemValue) => { this.setState({ quantity: itemValue }) }} />
                }

                <TouchableHighlight
                    style={styles.selectInputWrapper}
                    underlayColor={'rgb(235,235,235)'}
                    onPress={() => { this.setState({ showUnitPicker: !showUnitPicker }) }}
                    hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 }}>
                        <Text style={{ fontSize: 17, color: 'rgba(0,0,0,0.65)' }}>Unit</Text>
                        <Text style={{ fontSize: 17, fontWeight: '600' }}>{unit}</Text>
                    </View>
                </TouchableHighlight>
                { showUnitPicker &&
                    <CustomPicker data={quantity < 2 || quantity === "" ? single_units : multi_units} selectedVal={unit} onValChange={(itemValue) => { this.setState({ unit: itemValue }) }} />
                }

            </View>
            </DismissKeyboard>
        )
    }
}