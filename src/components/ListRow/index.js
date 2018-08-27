import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '@theme/styles'


export default class ListRow extends Component {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    }

    render() {
        const { separators, title, time, date } = this.props;
        return (
            <TouchableHighlight onPress={this._onPress} underlayColor={'rgb(235,235,235)'} onShowUnderlay={separators.highlight} onHideUnderlay={separators.unhighlight}>
                <View style={styles.listRow}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.rowMainText}>{title}</Text>
                            <Text style={[styles.rowSubText, { marginTop: 5 }]}>{date}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Text style={styles.rowSubText}>{time}</Text>
                        <Icon style={styles.rightChevron} name={'ios-arrow-forward'} size={18} />
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}