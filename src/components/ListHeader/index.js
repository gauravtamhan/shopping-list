import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '@theme/styles'


export default class ListHeader extends Component {

    render() {
        const { text } = this.props;
        return (
            <View style={styles.listHeaderContainer}>
                <Text style={styles.listHeader}>{text}</Text>
            </View>
        )
    }
}