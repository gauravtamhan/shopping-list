import React, { Component } from 'react';
import { Text, View, Animated, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';
import styles from '@theme/styles'


export default class ListRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            controlOpacity: new Animated.Value(1),
            controlHeight: new Animated.Value(62),
        }
    }

    _onPress = () => {
        this.props.onPressItem(this.props.id);
    }

    render() {
        const { separators, title, date, count, handleRemove, index, onPressRename, 
            activeIndex, onSwipeOpen, handleVertScroll } = this.props;
        let swipeBtns = [
            {
                component: (
                    <View style={styles.swipeBtnContainer}>
                        <Text style={styles.swipeBtnText}>Edit</Text>
                    </View>
                ),
                backgroundColor: 'rgb(88, 86, 214)',
                underlayColor: 'rgb(78, 76, 204)',
                onPress: onPressRename
            },
            {
                component: (
                    <View style={styles.swipeBtnContainer}>
                        <Text style={styles.swipeBtnText}>Delete</Text>
                    </View>
                ),
                type: 'delete',
                backgroundColor: 'rgb(255, 59, 48)',
                underlayColor: 'rgb(227, 55, 51)',
                onPress: () => {
                    Animated.sequence([
                        Animated.parallel([
                            Animated.timing(this.state.controlOpacity, { toValue: 0, duration: 200 }),
                            Animated.timing(this.state.controlHeight, { toValue: 0, duration: 200 })
                        ])
                    ]).start(() => {
                        handleRemove(index)
                    });
                }
            }
        ];
        return (
                <Swipeout
                    right={swipeBtns}
                    autoClose={true}
                    scroll={(canScroll) => { handleVertScroll(canScroll) }}
                    // sensitivity={50}
                    backgroundColor='transparent'
                    buttonWidth={62} // 70
                    close={activeIndex !== index}
                    onOpen={() => onSwipeOpen(index)}
                >
                <Animated.View style={{ flexDirection: 'row', alignItems: 'center', height: this.state.controlHeight, opacity: this.state.controlOpacity, flex: 1 }}>
                <TouchableHighlight style={{flex: 1}} onPress={this._onPress} underlayColor={'rgb(235,235,235)'} onShowUnderlay={separators.highlight} onHideUnderlay={separators.unhighlight}>
                    <View style={styles.listRow}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.rowMainText}>{title}</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={[styles.rowSubText, { marginTop: 5 }]}>{date} </Text>
                                </View>
                            </View>
                        </View>
                        {
                            title !== '' &&
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Text style={styles.rowSubText}>{count} {count === 1 ? 'Item' : 'Items'}</Text>
                                    <Icon style={styles.rightChevron} name={'ios-arrow-forward'} size={18} />
                                </View>
                        }
                    </View>
                </TouchableHighlight>
                </Animated.View>
                </Swipeout>
        )
    }
}