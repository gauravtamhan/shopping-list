import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '@theme/styles'


export default class HeaderButton extends Component {

    render() {
        const { onPress, text } = this.props;
        return (
            <TouchableOpacity onPress={onPress} style={styles.headerButtonContainer} hitSlop={{ top: 6, bottom: 6, left: 12, right: 12 }}>
                <Text style={styles.headerButton}>{text}</Text>
            </TouchableOpacity>
        )
    }
}