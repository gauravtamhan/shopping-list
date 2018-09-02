import React, { Component } from 'react';
import { Text, View, Image, Animated, TouchableHighlight } from 'react-native';
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
        const { separators, title, time, date, count, handleRemove, index } = this.props;
        let swipeBtns = [{
            text: 'Delete',
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
        }]
        return (
                <Swipeout
                    right={swipeBtns}
                    autoClose={true}
                    backgroundColor='transparent'
                    buttonWidth={70}
                >
                <Animated.View style={{ flexDirection: 'row', alignItems: 'center', height: this.state.controlHeight, opacity: this.state.controlOpacity, flex: 1 }}>
                <TouchableHighlight style={{flex: 1}} onPress={this._onPress} underlayColor={'rgb(235,235,235)'} onShowUnderlay={separators.highlight} onHideUnderlay={separators.unhighlight}>
                    <View style={styles.listRow}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.rowMainText}>{title}</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={[styles.rowSubText, { fontWeight: '500', color: 'rgb(110,110,115)', marginTop: 5 }]}>{date} </Text>
                                    <Text style={[styles.rowSubText, { marginTop: 5 }]}> {time}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Text style={styles.rowSubText}>{count} Items</Text>
                            <Icon style={styles.rightChevron} name={'ios-arrow-forward'} size={18} />
                        </View>
                    </View>
                </TouchableHighlight>
                </Animated.View>
                </Swipeout>
        )
    }
}