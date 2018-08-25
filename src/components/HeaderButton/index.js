import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '@theme/styles'


export default class HeaderButton extends Component {

    render() {
        const { onPress, text, icon, size} = this.props;
        return (
            <TouchableOpacity onPress={onPress} style={styles.headerButtonContainer} hitSlop={{ top: 6, bottom: 6, left: 12, right: 12 }}>
                { !!text &&
                    <Text style={styles.headerButton}>{text}</Text>
                }
                { !!icon && !!size &&
                    <Icon style={styles.headerButtonIcon} name={icon} size={size} />
                }
            </TouchableOpacity>
        )
    }
}