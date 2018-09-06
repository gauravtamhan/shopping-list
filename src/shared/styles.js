import { StyleSheet } from 'react-native'
import { NAV_COLOR, TITLE_COLOR, SUBTEXT_COLOR } from '@theme/colors';

const styles = StyleSheet.create({
    /*=============================================================
                   Components - CSS Styles
    ==============================================================*/
    
    // Header Navigation Button
    headerButtonContainer: {
        marginHorizontal: 16,
    },
    headerButton: {
        fontSize: 17,
        color: NAV_COLOR,
    },
    headerButtonDisabled: {
        fontSize: 17,
        color: 'rgb(170,170,170)'
    },
    headerButtonIcon: {
        color: NAV_COLOR,
        fontWeight: '100'
    },

    // List Header
    listHeaderContainer: {
        flex: 1,
        marginLeft: 18,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,1)',
        borderColor: 'rgb(194,193,196)',
        borderBottomWidth: 0.5,
    },
    listHeader: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000',
    },

    // Main List Row
    listRow: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingVertical: 10,
        backgroundColor: 'transparent',
    },
    rowMainText: {
        fontSize: 17,
        fontWeight: '600',
    },
    rowSubText: {
        fontSize: 14,
        fontWeight: '400',
        color: SUBTEXT_COLOR,
    },
    rightChevron: {
        marginLeft: 10,
        color: SUBTEXT_COLOR,
        opacity: 0.75,
    },
    separator: {
        height: 0.5,
        // backgroundColor: 'rgba(0,0,0,0.15)',
        backgroundColor: 'rgb(194,193,196)', // 231,230,233
        marginLeft: 18,
    },

    // IOS Style Text Input //
    iosTextInputWrapper: {
        marginTop: 35,
        backgroundColor: '#fff',
        borderColor: 'rgb(194,193,196)',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,

    },
    iosTextInput: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        fontSize: 17,
        marginRight: 8,
    },
    iosDescriptorText: { 
        paddingHorizontal: 18,
        fontSize: 13,
        marginBottom: 6,
        marginTop: 33,
        color: 'rgb(126,126,131)'
    },

    // Swipeout Button Component
    swipeBtnContainer: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    swipeBtnText: {
        fontWeight: '500',
        color: 'white'
    },

    /*=============================================================
                   Scenes - Shared CSS Styles
    ==============================================================*/
    
    // Page Container
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    background: {
        backgroundColor: 'rgb(239,239,242)'
    },
    
    /*------------------------
        Shopping List Scene
     ------------------------*/
    shortSeparator: {
        height: 0.5,
        backgroundColor: 'rgb(194,193,196)',
        marginLeft: 54,
    },
    itemRow: {
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingLeft: 18,
        paddingRight: 12,
        paddingVertical: 10,
    },
    itemName: {
        fontSize: 17,
        flex: 2,
    },
    itemNameMarked: {
        color: 'rgba(0,0,0,0.25)',
    },
    itemRightTextContainer: {
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'flex-end', 
    },
    pill: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 5,

        borderWidth: 1,
        borderColor: NAV_COLOR,
        backgroundColor: 'transparent',

        // backgroundColor: 'rgb(242,242,243)',
    },
    pillMarked: {
        opacity: 0.3,
    },
    pillText: {
        fontSize: 13, 
        // color: 'rgba(0,0,0,0.7)',
        color: NAV_COLOR,
        fontWeight: '500'
    },
    pillTextMarked: {
        opacity: 0.3,
    },

    /*------------------------
        Add Item Modal
     ------------------------*/
    headerTitle: {
        fontWeight: '600', 
        color: '#000',
        fontSize: 17,
    },
    textInputWrapper: {
        borderBottomWidth: 0.6,
        borderBottomColor: 'rgba(0,0,0,0.4)',
        marginTop: 30,
        paddingHorizontal: 4,
        marginHorizontal: 18,
    },
    selectInputWrapper: {
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    //  basicInputField: { 
    //     paddingVertical: 5, 
    //     fontSize: 17, 
    // },
    sliderWrapper: { 
        flexDirection: 'row',
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    sliderPill: {
        marginHorizontal: 6,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: 'rgb(248,248,252)'
    },
    sliderPillSelected: {
        backgroundColor: NAV_COLOR,
    },
    sliderPillText: {
        color: NAV_COLOR,
        fontWeight: '600',
        fontSize: 15,
    },
    sliderPillTextSelected: {
        color: '#fff',
    }

})

export default styles