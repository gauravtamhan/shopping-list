import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Icon } from 'native-base'
import styles from '@theme/styles'
import { NAV_COLOR } from '@theme/colors'


export default class HeaderButton extends Component {

    render() {
        const { onPress, text, style, icon, type, img, ctnrStyle} = this.props;
        return (
            <TouchableOpacity onPress={onPress} style={[styles.headerButtonContainer, ctnrStyle]} hitSlop={{ top: 6, bottom: 6, left: 12, right: 12 }}>
                {!!text &&
                    <Text style={[styles.headerButton, style]}>{text}</Text>
                }
                {!!icon && !!type &&
                    <Icon style={styles.headerButtonIcon} name={icon} type={type} />
                }
                {!!img &&
                    <Image source={img} style={[{width: 25, height: 25, tintColor: NAV_COLOR}, style]} />
                }
            </TouchableOpacity>
        )
    }
}

